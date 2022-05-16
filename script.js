'use strict';

//переменные
const title  = prompt("Как называется наш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screensPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 60;
const adaptive = confirm("Нужен ли адаптив на сайте?"); 
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
const fullPrice = (screensPrice + servicePrice1 + servicePrice2);
const servicePercentPrice = Math.ceil(fullPrice -(fullPrice * (rollback/100)));



// вывод console.log 
console.log(typeof fullPrice);
console.log(typeof title);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screensPrice + " руб");
console.log("Стоимость разработки сайта " + fullPrice + " руб");
console.log(screens.toLowerCase().split(', '));
console.log("Процент отката посреднику за работу " + (fullPrice * (rollback/100)) + " руб");

// *****************************************


 
// console.log(title);
// console.log(adaptive);
// console.log(screensPrice);
// console.log(fullPrice);
console.log("итоговая стоимость за вычетом отката посреднику " + servicePercentPrice + " руб");


if (fullPrice > 30000) {
    console.log("Даем скидку в 10%");
    
    } else if (fullPrice > 15000 && fullPrice < 30000) {
        console.log("Даем скидку в 5%");
    } else if (fullPrice < 15000 && fullPrice > 0) {
        console.log("Скидка не предусмотрена");
    } else if(fullPrice < 0) {
        console.log("Что то пошло не так");
    } else {

    }
        

    
