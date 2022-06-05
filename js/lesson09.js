'use strict';
//Получить заголовок "Калькулятор верстки" через метод getElementsByTagName. (тэг h1, получить именно элемент, а не коллекцию)
const title = document.getElementsByTagName('h1')[0];
console.log(title);


//Получить кнопки "Рассчитать" и "Сброс" через метод getElementsByClassName. (класс handler_btn)
const calculationBtn = document.getElementsByClassName('handler_btn')[0];
console.log(calculationBtn);


const resetBtn = document.getElementsByClassName('handler_btn')[1];
console.log(resetBtn);

//Получить кнопку "+" под выпадающим списком через метод querySelector. (класс screen-btn)
const plus = document.querySelector('.screen-btn');
console.log(plus);


//Получить все элементы с классом other-items в две разные переменные. В первую элементы у которых так же присутствует класс percent, во вторую элементы у которых так же присутствует класс number через метод querySelectorAll.
const percent = document.querySelectorAll('.percent');
console.log(percent);

const number = document.querySelectorAll('.number');
console.log(number);


//Получить input type=range через его родителя с классом rollback одним запросом через метод querySelector.
const rollback = document.querySelector('.rollback input');
console.log(rollback);

//Получить span с классом range-value через его родителя с классом rollback одним запросом через метод querySelector.
const span = document.querySelector('.rollback span');            //children[0].childNodes[3];
console.log(span);


//Получить все инпуты с классом total-input справа через метод getElementsByClassName. (класс total-input, получить именно элементы, а не коллекции)
const totalInputDev = document.getElementsByClassName('total-input')[0];
console.log(totalInputDev);

const totalInputScreen = document.getElementsByClassName('total-input')[1];
console.log(totalInputScreen);

const totalInputService = document.getElementsByClassName('total-input')[2];
console.log(totalInputService);

const totalInputPrice = document.getElementsByClassName('total-input')[3];
console.log(totalInputPrice);

const totalInputRollback = document.getElementsByClassName('total-input')[4];
console.log(totalInputRollback);


//Получить все блоки с классом screen в изменяемую переменную ( let ) через метод querySelectorAll (далее мы будем переопределять ее значение)
let screenMain = document.querySelectorAll('.screen');
console.log(screenMain);


const appData = {
    title: '',
    screens:[],
    screensPrice: 0,
    rollback:60,
    adaptive:true,
    services:{},
    fullPrice:0,
    servicePercentPrice:0,
    allServicePrices:0,
    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();

        appData.logger();

    },

    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    isString: function(str) {
        return isNaN(str);
    },


   asking: function() {
        
        do {
            appData.title  = prompt("Как называется наш проект?");
        } while (!appData.isString(appData.title));

        for (let i = 0; i < 2; i++) {
         
            let name = '';
            let money = 0;

            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while (!appData.isString(name));

            do  {
                money = +prompt("Сколько будет стоить данная работа?");
            } while (!appData.isNumber(money));

        appData.screens.push({id:i, name:name, money:money});

        } 

        appData.adaptive = confirm("Нужен ли адаптив на сайте?"); 

        for (let i = 0; i < 2; i++) {
            let name = '';
            let money = 0;

            do {
                name = prompt("Какой дополнительный тип услуги нужен?");
            }   while (!appData.isString(name));
    
                do {
                    money = +prompt("Сколько это будет стоить?");
                    
              } while (!appData.isNumber(money)); 

              appData.services[name] = +money;
              
        } 
    },

    addPrices: function() {
        for(let screen of appData.screens) {
            appData.screensPrice += +screen.money;
        }
        for(let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },


    getFullPrice() {
        appData.fullPrice = appData.screensPrice + appData.allServicePrices; 
     
     },
     
     getServicePercentPrices:function() {
        appData.servicePercentPrice =  appData.fullPrice - (appData.fullPrice * (appData.rollback/100));
     },
     
     getTitle:function() {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
     },

     getRollbackMessage:function(fullPrice) {
        switch(true) {
            case (appData.fullPrice > 30000):
                return("Даем скидку в 10%");
            case ( appData.fullPrice > 15000): 
                return("Даем скидку в 5%");
            case  ( appData.fullPrice > 0):
                return("Скидка не предусмотрена");
            default:
                return('Что то пошло не так');
                
        }
     },

     logger:function() {
         console.log(appData.screens);
     }  
};
appData.start();
















 