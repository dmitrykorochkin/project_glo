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
let fullPrice = (screensPrice + servicePrice1 + servicePrice2);
let servicePercentPrice = Math.ceil(fullPrice -(fullPrice * (rollback/100)));



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
console.log('fullPrice ' + fullPrice);
console.log("итоговая стоимость за вычетом отката посреднику " + servicePercentPrice + " руб");


    
    switch(true) {
        case (fullPrice > 30000):
            console.log("Даем скидку в 10%");
            break;
        case ( 15000 < fullPrice && fullPrice <= 30000 ): 
            console.log("Даем скидку в 5%");
            break;
        case  (0 < fullPrice && fullPrice <= 15000):
            console.log("Скидка не предусмотрена");
            break;
        default:
            console.log('Что то пошло не так');
            break;
    }
        
//Function Expression
const getAllServicePrices = function() {
        return(servicePrice1 + servicePrice2);
    };        

getAllServicePrices();
const allServicePrices = getAllServicePrices();
console.log(allServicePrices);

//function declaration
function getFullPrice() {
   return screensPrice + allServicePrices; 

};

getFullPrice();
fullPrice = getFullPrice();
console.log(fullPrice);


const getTitle = str => {
   if (str);
   return str.charAt(0).toUpperCase() + str.slice(1);

}

getTitle(title);
console.log(title);




const getServicePercentPrices = function() {
    return fullPrice - servicePercentPrice;
}

getServicePercentPrices();
servicePercentPrice = getServicePercentPrices();
console.log(servicePercentPrice);
