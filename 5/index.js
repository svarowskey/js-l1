"use strict";

let sum = [];
let n = 0;
let maxArray = [];
let max = 0;
let resultArray = [];
let min = 0;

const arr = [
    [2, 4, 6],
    [1, 5, 10],
    [7, 4, 1]
];

//Цикл считает сумму чисел в массивах
for (let j = 0; arr.length > j; j++) {
    n = 0;
    for (let i = 0; arr[j].length > i; i++) {
        n += arr[j][i];
    }
    sum[j] = n;
}

//Вычисляем элемент массива с наибольшей суммой
max = sum[0];
for (let z = 0; sum.length > z; z++) {
    if (max > sum[z]) continue;
    max = sum[z];
}

//Ищем индексы элементов массива с наибольшей суммой
for (let y = 0; sum.length > y; y++) {
    if (sum[y] === max) {
        maxArray.push(y);
    }
}

console.log(sum);

//Ищем и получаем необходимый массив по индексу
//Выводим в консоль индекс элемента массива с максимальной суммой
arr.forEach(function (item, index){
    for (let j = 0; maxArray.length >= j; j++) {
        if (index === maxArray[j]) {
            resultArray.push(item);
            console.log("Индекс элемента массива с максимальной суммой = " + maxArray);
        }
    }
});

//Ищем элемент массива с минимальным значением и выводим его в консоль
min = max;
for (let j = 0; resultArray.length > j; j++) {
    for (let i = 0; resultArray[j].length > i; i++) {
        if (min < resultArray[j][i]) continue;
        min = resultArray[j][i];
    }
}
console.log(min);