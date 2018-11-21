"use strict"

//Объявляем массив
let pyramide = [];

//Рисуем пирамиду, добавляя символ в конец массива с каждой итерацией и выводим на экран массив в виде строки
for (let i = 0; i <= 20; i++) {
    pyramide[i] = "x";
    console.log(String(pyramide));
}