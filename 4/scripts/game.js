
renderer.renderBoard();
//обрабатываем событие если польтзователь отпускает клавишу
window.addEventListener('keydown', function (event) {
    mover.makeStep(event);
});