"use strict";

let result = "";
let simpleInt = 0;
let yourNumber = prompt("Введите число, до которого будет произведен поиск простых чисел");

/**
 * Функция проверяет является ли полученное значение простым числом.
 * Возвращает простое число либо пустое значение.
 * @param {number} n
 * @returns {*}
 */
function findSimple(n) {
    if (n < 2) return "";
    for (let i = 2; i <= n / 2; i++) {
        if ( (n%i) === 0) return "";
    }
    return n;
}

//Цикл находит простые числа
for (let x = 0; x <= yourNumber; x++) {
    simpleInt = findSimple(x);
    if (simpleInt === "") {
        continue;
    }
    result += " " + String(simpleInt);
}
//Выводим в консоль результат
console.log(result);