let game = {
    run() {
        while (true) {
            let direction = mover.getDirection();

            if (direction === null) {
                console.log("Игра окончена");
                return;
            }

            let nextPoint = mover.getNextPosition(direction);
            renderer.clear();
            leader.move(nextPoint);
            renderer.render();
        }
    },
    init() {
        console.log("Ваше положение на поле в виде о");
        renderer.render();
        console.log("Чтобы начать игру наберите game.run() и нажмите Enter.");
    }
};

game.init();