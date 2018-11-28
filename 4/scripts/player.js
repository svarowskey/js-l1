let player = {
    x: 0,
    y: 0,

    /**
     * Метод задает пользователю новое расположение.
     * @param {{x: number, y: number}} nextPoint координаты куда ставим пользователя.
     */
    changePosition(nextPoint) {
        this.x = nextPoint.x;
        this.y = nextPoint.y;
    },
};