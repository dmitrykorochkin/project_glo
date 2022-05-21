'use strict';

//переменные
let title;
let screens;
let screensPrice;
let rollback = 60;
let adaptive;
let service1;
let service2;
let fullPrice; //= (screensPrice + servicePrice1 + servicePrice2);
let servicePercentPrice; //= Math.ceil(fullPrice -(fullPrice * (rollback/100))); 
let allServicePrices;

const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}



const asking = function() {
    title  = prompt("Как называется наш проект?", "калькулятор верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые сложные");
    

    do  {
        screensPrice = prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(screensPrice));

    adaptive = confirm("Нужен ли адаптив на сайте?"); 
};
 

const getAllServicePrices = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?");
        }
        //  sum += +prompt("Сколько это будет стоить?");

        sum +=(() => {
            let n = 0;
            do {
                n = prompt("Сколько это будет стоить?");
            } while (!isNumber(n));
            return +n;
        })();

    }      
        
    return sum;
}; 
    
const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
    };

//function declaration,
function getFullPrice() {
   return screensPrice + allServicePrices; 

};

const getServicePercentPrices = function() {
    return fullPrice - (fullPrice * (rollback/100));
};

const getTitle = function() {
    return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
};




  

asking()
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();


showTypeOf(title);
showTypeOf(screensPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(typeof fullPrice);
console.log(typeof title);
console.log(typeof adaptive);
console.log(screens.length);
console.log(screens.toLowerCase().split(', '));
console.log("Стоимость верстки экранов " + screensPrice + " руб и Стоимость разработки сайта " + fullPrice + " руб");

switch(true) {
    case (fullPrice >= 30000):
        console.log("Даем скидку в 10%");
        break;
    case ( 15000 < fullPrice && fullPrice < 30000 ): 
        console.log("Даем скидку в 5%");
        break;
    case  (0 < fullPrice && fullPrice <= 15000):
        console.log("Скидка не предусмотрена");
        break;
    default:
        console.log('Что то пошло не так');
        break;
}   