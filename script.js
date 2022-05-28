'use strict';


const appData = {
    title: '',
    screens:'',
    screensPrice: 0,
    rollback:60,
    adaptive:true,
    service1:'',
    service2:'',
    fullPrice:0,
    servicePercentPrice:0,
    allServicePrices:0,
    start: function() {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();

        appData.logger();

    },
    

    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    asking: function() {
        appData.title  = prompt("Как называется наш проект?", "калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые сложные");
        
    
        do  {
            appData.screensPrice = +prompt("Сколько будет стоить данная работа?");
        } while (!appData.isNumber(appData.screensPrice));
    
        appData.adaptive = confirm("Нужен ли адаптив на сайте?"); 

    },

    getAllServicePrices:function () {
        let sum = 0;
         
    
        for (let i = 0; i < 2; i++) {
    
            let money = 0;
    
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
                
                
            } else if (i === 1) {
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
               
            }
    
                do {
                    money = +prompt("Сколько это будет стоить?");
                    
              } while (!appData.isNumber(money));
              
              sum += +money;
              
        }  
     return sum;
        
    },

    getFullPrice() {
        return appData.screensPrice + appData.allServicePrices; 
     
     },
     
     getServicePercentPrices:function() {
         return appData.fullPrice - (appData.fullPrice * (appData.rollback/100));
     },
     
     getTitle:function() {
         return appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
     },

     getRollbackMessage:function(fullPrice) {
        switch(true) {
            case (appData.fullPrice > 30000):
                console.log("Даем скидку в 10%");
                break;
            case ( appData.fullPrice > 15000): 
                console.log("Даем скидку в 5%");
                break;
            case  ( appData.fullPrice > 0):
                console.log("Скидка не предусмотрена");
                break;
            default:
                console.log('Что то пошло не так');
                
        }
     },


     logger:function() {
         for(let key in appData) {
             console.log("ключ:" + key + ": " + appData[key]);
         }
     }




    
};

 



appData.start();
















 