let game = {
    run() {
        console.log("Игра началась");
    },
    init() {
        console.log("Ваше положение на поле в виде о");
        renderer.render();
        console.log("Чтобы начать игру наберите game.run() и нажмите Enter.");
    }
};

game.init();