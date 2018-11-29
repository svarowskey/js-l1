let renderer = {
    /**
     * Метод рисует и выводит шахматную доску
     */
    renderBoard() {
        let myBoard = document.getElementById('myBoard');
        if (this.checkBoard(myBoard)){
            this.removeBoard();
        }
        let buttonRemove = document.getElementById('buttonRemove');
        let generatedBoard = this.generateBoard();
        buttonRemove.insertAdjacentHTML("afterend", generatedBoard);
    },

    /**
     * Метод создает таблицу html разметки по заданным настройкам в конфиге
     * @returns {string} таблица html разметки
     */
    generateBoard() {
        let board = "";
        for (let y = 0; y < config.rowsCount; y++) {
            board += "<tr>";
            for (let x = 0; x < config.colsCount; x++) {
                board += `<td data-x="${x}" data-y="${y}" class="${this.getClassBoard(x, y)}">${this.getSignature(x, y) + this.getFigure(x, y)}</td>`;
            }
            board += "</td>";
        }
        return `<table id="myBoard"><tbody>${board}</tbody></table>`;
    },

    /**
     * Метод добавляет класс заданной по координатам ячейке
     * @param {number} x координата по иксу
     * @param {number} y координата по игрику
     * @returns {string} определенный класс с цветом ячейки
     */
    getClassBoard(x, y) {
        if ((y === 0) || (y === 9) || ((x === 0) && (y <= 9)) || ((x === 9) && (y <= 9))) {
            return "";
        }

        if ((x + y) % 2 === 0) {
            return "white";
        } else {
            return "black";
        }
    },

    /**
     * Метод добавляет подпись к столбцам и строкам
     * @param {number} x коордитана по иксу
     * @param {number} y координата по игрику
     * @returns {string} подпись столбца либо строки
     */
    getSignature(x ,y) {
        if ((x === 0) && (y < 9) && (y > 0)) {
            return `${9 - y}`;
        } else  if ((x === 9) && (y < 9) && (y > 0)) {
            return `${y}`;
        } else if ((y === 0) && (x < 9) && (x > 0)) {
            return `${String.fromCharCode(65 + x - 1)}`;
        } else if ((y === 9) && (x < 9) && (x > 0)) {
            return `${String.fromCharCode(65 + x - 1)}`;
        } else {
            return "";
        }
    },

    /**
     * Метод возвращает фигуру в соответствии с координатами ячейки
     * @param {number} x координата по иксу
     * @param {number} y координата по игрику
     * @returns {string} шахматная фигура в соответствии с координатами ячейки
     */
    getFigure(x, y) {
        let xString = String(x);
        let yString = String(y);
        switch (parseInt(xString + yString)) {
            //белый король
            case 58:
                return "&#9812;";
            //белый ферзь
            case 48:
                return "&#9813;";
            //белая ладья
            case 88:
            case 18:
                return "&#9814;";
            //белый офицер
            case 38:
            case 68:
                return "&#9815;";
            //белый конь
            case 28:
            case 78:
                return "&#9816;";
            //черный король
            case 51:
                return "&#9818;";
            //черный ферзь
            case 41:
                return "&#9819;";
            //черная ладья
            case 11:
            case 81:
                return "&#9820;";
            //черный офицер
            case 31:
            case 61:
                return "&#9821;";
            //черный конь
            case 21:
            case 71:
                return "&#9822;";
            default:
                if (((x > 0) && (x < 9)) && y === 7) {
                    return "&#9817;"; //белые пешки
                } else if (((x > 0) && (x < 9)) && y === 2) {
                    return "&#9823;"; //черные пешки
                } else {
                    return ""; //пустота
                }
        }
    },

    /**
     * Метод удаляет шахматную доску со страницы, если доска есть
     */
    removeBoard() {
        let myBoard = document.getElementById('myBoard');
        if (this.checkBoard(myBoard)){
        myBoard.parentNode.removeChild(myBoard);
        }
    },

    /**
     * Метод проверяет сгенерирована ли шахматная доска
     * @param {table} myBoard тег таблицы html
     * @returns {boolean} если сгенерирована, то true, иначе false
     */
    checkBoard(myBoard) {
        if (myBoard == null) {
            return false;
        } else {
            return true;
        }
    },
};