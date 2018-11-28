let mover = {
    //Метод получения следующей позиции игрока
    getDirection() {
        const availableDirections = [1, 2, 3, 4, 6, 7, 8, 9];
        while (true) {
            let direction = parseInt(prompt("Введите число (1, 2, 3, 4, 6, 7, 8, 9), куда вы хотите переместиться. И отмена для выхода"));
            if (isNaN(direction)) {
                return null;
            }
            if (!availableDirections.includes(direction)) {
                alert("Для перемещения необходимо ввести одно из чисел 1, 2, 3, 4, 6, 7, 8, 9.");
                continue;
            }
            return direction;
        }
    },
    //Метод обработки следующей позиции игрока
    getNextPosition(direction) {
        const nextPosition = {
            x: player.x,
            y: player.y
        };
        const prevPosition = {
            x: player.x,
            y: player.y
        };
        switch (direction) {
            case 1:
                nextPosition.x--;
                nextPosition.y++;
                break;
            case 2:
                nextPosition.y++;
                break;
            case 3:
                nextPosition.x++;
                nextPosition.y++;
                break;
            case 4:
                nextPosition.x--;
                break;
            case 6:
                nextPosition.x++;
                break;
            case 7:
                nextPosition.x--;
                nextPosition.y--;
                break;
            case 8:
                nextPosition.y--;
                break;
            case 9:
                nextPosition.x++;
                nextPosition.y--;
                break;
        }
        if (this.checkNextPosition(nextPosition)) {
            return nextPosition;
        }
        return prevPosition;
    },
    //Метод проверки следующей позиции игрока, чтобы та не выходила за границы карты
    checkNextPosition(nextPosition) {
        if (nextPosition.x < config.colsCount && nextPosition.x >= 0 && nextPosition.y < config.rowCount && nextPosition.y >= 0) return true;
        return false;
    }
};