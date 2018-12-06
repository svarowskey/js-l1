"use strict";

let snake = {
    body: null,
    direction: null,

    init(startPoint, direction) {
        // this.body = [
        //     {x: 5, y: 5},  это голова
        //     {x: 6, y: 5},
        //     {x: 7, y: 5}
        // ];
        this.body = [startPoint];
        this.direction = direction;
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

    render(snakePointArray, foodPoint) {
        for (let key of Object.getOwnPropertyNames(this.cells)) {
            this.cells[key].className = 'cell';
        }

        snakePointArray.forEach((point, idx) => {
            this.cells[`x${point.x}_y${point.y}`].classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
        });

        this.cells[`x${foodPoint.x}_y${foodPoint.y}`].classList.add('food');
    }
};

let food = {
    x: null,
    y: null,

    setFoodCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    getFoodCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    }
};

let status = {

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
            console.error('Неверные настройки, значение rowCount должно быть в диапазоне [10, 30]')
            return false;
        }

        if (this.colsCount < 10 || this.colsCount > 30) {
            console.error('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30]')
            return false;
        }

        if (this.speed < 1 || this.speed > 10) {
            console.error('Неверные настройки, значение speed должно быть в диапазоне [1, 10]')
            return false;
        }

        if (this.winLength < 5 || this.winLength > 50) {
            console.error('Неверные настройки, значение winLength должно быть в диапазоне [5, 50]')
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



    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);
        if (!this.settings.validate()) {
            return;
        }

        this.renderer.renderMap(this.settings.rowCount, this.settings.colsCount);

        this.setEventHandlers();

        this.reset();
    },

    setEventHandlers() {
        //TODO сделать метод обработчиков событий

    },

    reset() {
        this.stop();

        this.snake.init(this.getStartSnakePoint(), 'up');

        this.food.setFoodCoordinates(this.getRandomCoordinates());

        this.renderer.render(this.snake.body, this.food.getFoodCoordinates());
    },

    play() {

    },

    stop() {

    },

    finish() {

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

    getRandomCoordinates() {
        let exclude = [this.food.getFoodCoordinates(), ...this.snake.body];
        console.log(exclude);

        while (true) {
            // Случайная точка в пределах игрового поля
            let rndPoint = {
                x: Math.floor(Math.random() * this.settings.colsCount),
                y: Math.floor(Math.random() * this.settings.rowCount),
            };

            // проверяем не содержится ли в массиве exclude нашей случайной точки
            let excludeContainsRndPoint =   exclude.some(function (exPoint) {
                return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
            });


            if (!excludeContainsRndPoint) {
                console.log(rndPoint);
                return rndPoint;
            }
        }
    },
};


window.onload = () => game.init({speed: 2});