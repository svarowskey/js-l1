"use strict";

let snake = {
    body: null,
    direction: null,
    lastStepDirection: null,

    init(startPoint, direction) {
        this.body = [startPoint];
        this.lastStepDirection = direction;
        this.direction = direction;
    },

    getNextStepHeadPoint() {
        let firstPoint = this.body[0];

        switch (this.direction) {
            case 'up':
                return {x: firstPoint.x, y: firstPoint.y !== 0 ? firstPoint.y - 1 : settings.rowCount - 1};
            case 'down':
                return {x: firstPoint.x, y: firstPoint.y !== settings.rowCount - 1 ? firstPoint.y + 1 : 0};
            case 'right':
                return {x: firstPoint.x !== settings.colsCount -1 ? firstPoint.x + 1 : 0, y: firstPoint.y};
            case 'left':
                return {x: firstPoint.x !== 0 ? firstPoint.x - 1 : settings.colsCount - 1, y: firstPoint.y};
        }
    },

    /**
     * Проверка является ли точка телом змейки
     * @param point
     * @returns {boolean}
     */
    isBodyPoint(point) {
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint());
        this.body.pop();
    },

    /**
     * Метод устанавливает направление для змейки по принятым данным
     * @param direction
     */
    setDirection(direction) {
        this.direction = direction;
    },

    incrementBody() {
        let lastBodyIdx = this.body.length - 1;
        let lastBodyPoint = this.body[lastBodyIdx];
        let lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.body.push(lastBodyPointClone);
    },
};

let score = {
    count: 0,
    countEl: null,

    init() {
       this.countEl = document.getElementById('score');
       this.drop();
    },

    increment() {
        this.count++;
        this.render();
    },

    drop() {
        this.count = 0;
        this.render();
    },

    render() {
        this.countEl.textContent = this.count;
    }
};

let renderer = {
    cells: {},

    /**
     * Метод рисует карту
     * @param rowsCount
     * @param colsCount
     */
    renderMap(rowsCount, colsCount) {
        let table = document.getElementById('game');
        table.innerHTML = '';
        for (let row = 0; row < rowsCount; row++) {
            let tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);
            for (let col = 0; col < colsCount; col++) {
                let td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);
                this.cells[`x${col}_y${row}`] = td;
            }
        }
    },

    /**
     * Метод рисует змейку и еду на карте
     * @param snakePointArray
     * @param foodPoint
     */
    render(snakePointArray, foodPoint) {
        for (let key of Object.getOwnPropertyNames(this.cells)) {
            this.cells[key].className = 'cell';
        }

        snakePointArray.forEach((point, idx) => {
            this.cells[`x${point.x}_y${point.y}`].classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
        });

        this.cells[`x${foodPoint.x}_y${foodPoint.y}`].classList.add('food');
    },
};

let food = {
    x: null,
    y: null,

    /**
     * Метод устанавливает координаты еды
     * @param point
     */
    setFoodCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    /**
     * Метод возвращает координаты еды
     * @returns {{x: *, y: *}}
     */
    getFoodCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    },

    /**
     * Проверка является ли проверяемая координата точкой с едой
     * @param point
     * @returns {boolean}
     */
    isFoodPoint(point) {
        return this.x === point.x && this.y === point.y;
    }
};

let status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

let settings = {
    rowCount: 21,
    colsCount: 21,
    speed: 2,
    winLength: 50,

    /**
     * Проверка на корректность настроек
     * @returns {boolean}
     */
    validate() {
        if (this.rowCount < 10 || this.rowCount > 30) {
            console.error('Неверные настройки, значение rowCount должно быть в диапазоне [10, 30]');
            return false;
        }

        if (this.colsCount < 10 || this.colsCount > 30) {
            console.error('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30]');
            return false;
        }

        if (this.speed < 1 || this.speed > 10) {
            console.error('Неверные настройки, значение speed должно быть в диапазоне [1, 10]');
            return false;
        }

        if (this.winLength < 5 || this.winLength > 50) {
            console.error('Неверные настройки, значение winLength должно быть в диапазоне [5, 50]');
            return false;
        }

        return true;

    },
};

let game = {
    settings,
    status,
    renderer,
    food,
    snake,
    tickInterval: null,

    init(userSettings = {}) {
        score.init();
        Object.assign(this.settings, userSettings);
        if (!this.settings.validate()) {
            return;
        }

        this.renderer.renderMap(this.settings.rowCount, this.settings.colsCount);

        this.setEventHandlers();

        this.reset();
    },

    /**
     * Метод устанавливает слушателей событий
     */
    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => this.playClickHandler());
        document.getElementById('newGameButton').addEventListener('click', () => this.newGameClickHandler());
        document.addEventListener('keydown', () => this.keyDownHandler(event));
    },

    /**
     * Обработка события при нажатии на кнопку "Старт"
     */
    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    /**
     * Обработка события кнопки "Новая игра"
     */
    newGameClickHandler() {
        this.reset();
    },

    /**
     * Обработка событий при нажатии клавиш
     * @param event
     */
    keyDownHandler(event) {
        if (!this.status.isPlaying()) {
            return;
        }

        let direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    /**
     * Проверка установки направления змейки
     * @param direction
     * @returns {boolean}
     */
    canSetDirection(direction) {
        return direction === 'up' && this.snake.lastStepDirection !== 'down' ||
            direction === 'right' && this.snake.lastStepDirection !== 'left' ||
            direction === 'down' && this.snake.lastStepDirection !== 'up' ||
            direction === 'left' && this.snake.lastStepDirection !== 'right';
    },

    /**
     * Получаем направление змейки по нажатию клавиши
     * @param code
     * @returns {string}
     */
    getDirectionByCode(code) {
        switch (code) {
            case 'keyW':
            case 'ArrowUp':
                return 'up';
            case 'keyD':
            case 'ArrowRight':
                return 'right';
            case 'keyS':
            case 'ArrowDown':
                return 'down';
            case 'keyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakePoint(), 'up');
        this.food.setFoodCoordinates(this.getRandomCoordinates());
        this.render();
        score.drop();
    },

    /**
     * Метод рисует змейку и еду на карте
     */
    render() {
        this.renderer.render(this.snake.body, this.food.getFoodCoordinates());
    },

    play() {
        // Ставим статус игры в "играем"
        this.status.setPlaying();
        // Запускаем шаги змейки
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.settings.speed);
        // Меняем кнопку игры на стоп
        this.changePlayButton('Стоп');
    },

    stop() {
        // Ставим статус игры в "остановлена"
        this.status.setStopped();
        // Останавливаем шаги змейки
        clearInterval(this.tickInterval);
        // Меняем кнопку игры на старт
        this.changePlayButton('Старт');
    },

    finish() {
        // Ставим статус в "финиш"
        this.status.setFinished();
        // Останавливаем шаги змейки
        clearInterval(this.tickInterval);
        // Меняем кнопку игры, сделаем серой и напишем игра закончена
        this.changePlayButton('Игра закончена', true);
    },

    /**
     * Метод меняет текст кнопки Старт на Стоп
     * @param textContent
     * @param isDisabled
     */
    changePlayButton(textContent, isDisabled = false) {
        let playButton = document.getElementById('playButton');
        playButton.textContent = textContent;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    /**
     * Метод отрабатывает каждый шаг змейки
     */
    tickHandler() {
        if (!this.canSnakeMakeStep()) {
            this.finish();
            return;
        }

        if (this.food.isFoodPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.incrementBody();
            this.food.setFoodCoordinates(this.getRandomCoordinates());
            score.increment();
            if (this.isGameWon()) {
                this.finish();
            }
        }

        this.snake.makeStep();
        this.render();
    },

    /**
     * Проверяем, если тело змейки больше указанного в настройках значения, то возвращаем true
     * @returns {boolean}
     */
    isGameWon() {
        return this.snake.body.length > this.settings.winLength;
    },

    /**
     * Метод определяет может ли змейка сделать следующий шаг
     * @returns {boolean}
     */
    canSnakeMakeStep() {
        let nextHeadPoint = this.snake.getNextStepHeadPoint();
        return !this.snake.isBodyPoint(nextHeadPoint);
    },

    /**
     * Метод находит середину поля
     * @returns {{x: number, y: number}} Возвращает координаты середины поля
     */
    getStartSnakePoint() {
        return {
            x: Math.floor(this.settings.colsCount / 2),
            y: Math.floor(this.settings.rowCount / 2)
        }
    },

    /**
     * Метод возвращает случайные координаты
     * @returns {{x: number, y: number}}
     */
    getRandomCoordinates() {
        let exclude = [this.food.getFoodCoordinates(), ...this.snake.body];

        while (true) {
            // Случайная точка в пределах игрового поля
            let rndPoint = {
                x: Math.floor(Math.random() * this.settings.colsCount),
                y: Math.floor(Math.random() * this.settings.rowCount),
            };

            // проверяем не содержится ли в массиве exclude нашей случайной точки
            let excludeContainsRndPoint = exclude.some(function (exPoint) {
                return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
            });

            if (!excludeContainsRndPoint) {
                return rndPoint;
            }
        }
    },
};


window.onload = () => game.init({speed: 5});