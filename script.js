'use strict';

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
















 