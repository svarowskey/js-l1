"use strict";

function task1() {
    let temp_Cels = parseInt(prompt("Введите температуру в градусах по Цельсию: "));
    if (!isNaN(temp_Cels)){
    let temp_Far = ((9 / 5) * temp_Cels + 32);
    alert("Температура по Фаренгейту равна: " + temp_Far);
    } else {
        alert("Введите корректное значение!")
    }
}

function task3() {
    let admin;
    let name = "Василий";
    admin = name;
    alert("admin - " + admin);
}

function task4() {
    alert('1000 + "108" = ' + (1000 + "108"));
}