"use strict";

let snake = {

};

let renderer = {
    cells: {},

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


};

let food = {

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

        // this.snake.init()
    },

    play() {

    },

    stop() {

    },

    finish() {

    }
};


window.onload = () => game.init({speed: 2});