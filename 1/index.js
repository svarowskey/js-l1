while (true) {
    let answer = parseInt(prompt("Введите число в диапазоне [0, 999]"));
    
    if (answer >= 0 && answer <= 999) {
        console.log(transform(answer));
        break;
    }

    if (isNaN(answer)) {
        break;
    }
}

/**
 * Функция преобразует число в объект, в котором раскладывает вводимое число по разрядам и выдает в консоль
 * @param {number} ourNumber
 * @returns {array} {{firstDigit: number, secondDigit: number, thirdDigit: number}}
 */
function transform(ourNumber) {
    let splitNumber = String(ourNumber).split("");
    let transformNumber = {};

    while (splitNumber.length < 3) {
        splitNumber.unshift("0");
    }
    transformNumber.firstDigit  = isNaN(parseInt(splitNumber[2])) ? 0 : parseInt(splitNumber[2]);
    transformNumber.secondDigit = isNaN(parseInt(splitNumber[1])) ? 0 : parseInt(splitNumber[1]);
    transformNumber.thirdDigit  = isNaN(parseInt(splitNumber[0])) ? 0 : parseInt(splitNumber[0]);

    return transformNumber;
}