"use strict"

let symbols = "1234567890!@#$%^&*()-_=+;:][}{/?.,qwertyuioplkjhgfsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
let password = "";

/**
 * Функция возвращает случайное целое число между min (включительно) и max (не включая max)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Функция генерирует пароль указанной длины passLength
 * @param {number} passLength
 */
function generate(passLength) {
    let symbolPosition = getRandomInt(0, symbols.length);
    password +=symbols.charAt(symbolPosition);
    passLength--;
    if (passLength != 0) {
        generate(passLength);
    }
}

/**
 * Функция спрашивает у пользователя длину пароля
 * @returns {number}
 */
function askPasslength() {
    return parseInt(prompt("Введите длину пароля"));
}

generate(askPasslength());
alert(`Ваш пароль: ${password}`);