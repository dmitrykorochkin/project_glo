'use strict';
//Получить заголовок "Калькулятор верстки" через метод getElementsByTagName. (тэг h1, получить именно элемент, а не коллекцию)
const title = document.getElementsByTagName('h1')[0];
const calculationBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plus = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
const rollback = document.querySelector('.rollback input');
const span = document.querySelector('.rollback span'); 
const totalInputDev = document.getElementsByClassName('total-input')[0];
const totalInputScreen = document.getElementsByClassName('total-input')[1];
const totalInputService = document.getElementsByClassName('total-input')[2];
const totalInputPrice = document.getElementsByClassName('total-input')[3];
let totalInputRollback = document.getElementsByClassName('total-input')[4];


let screenMain = document.querySelectorAll('.screen');


const appData = {
    title: '',
    screens:[],
    screensPrice: 0,
    screensCount: 0,
    rollback:0,
    adaptive:true,
    servicesPercent:{},
    servicesNumber:{},
    fullPrice:0,
    servicePercentPrice:0,
    servicePricesPercent:0,
    servicePricesNumber:0,
    isError: false,
    init: function () {
        appData.addTilte();
        calculationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            appData.checkValue();
        });
        plus.addEventListener('click', appData.addScreenBlock);
        totalInputRollback.addEventListener('input', appData.rollbackInput);
        rollback.addEventListener('input', appData.rollbackInput);
       
        
        
    },
    addTilte: function () {
        document.title = title.textContent;
    },
    start: function() {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();

        // appData.logger();
        // console.log(appData);
        appData.showResult();
    },

    showResult: function () {
        totalInputDev.value = appData.screensPrice;
        totalInputService.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalInputPrice.value = appData.fullPrice;
        totalInputRollback.value = appData.servicePercentPrice;
        totalInputScreen.value = appData.screensCount; 
       
    },

    addScreens: function() {
        // screenMain = document.querySelectorAll('.screen');
        

        screenMain.forEach(function(screens, index) {
            const select = screens.querySelector('select');
            const input = screens.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            

            appData.screens.push({
                id:index, 
                name:selectName, 
                money: +select.value * +input.value,
                count: +input.value
            });

            // screenMain = document.querySelectorAll('.screen');
            
    
        });
        
        
    },


   
    addServices:function() {
        percent.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }  

        });

        number.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }

        });
 
    },

    rollbackInput: function() {

        span.textContent = rollback.value + '%';
        appData.rollback = parseInt(span.textContent);
        
    },

    addScreenBlock: function() {
        

        const cloneScreen = screenMain[0].cloneNode(true);
        screenMain[screenMain.length - 1].after(cloneScreen);
       
        
        let mainInput = cloneScreen.querySelector('.screen input')
        console.log(mainInput)
        mainInput.value = '';

        screenMain = document.querySelectorAll('.screen');
        console.log(screenMain)

    },

    

    addPrices: function() {

        
        for(let screen of appData.screens) {
            appData.screensPrice += +screen.money;
        }
        for(let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }
        for(let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screensPrice * (appData.servicesPercent[key]/100);
        }
        for (let screen of appData.screens) {
            appData.screensCount += screen.count;
        }


        appData.fullPrice = +appData.screensPrice + appData.servicePricesPercent + appData.servicePricesNumber; 

       appData.servicePercentPrice =  appData.fullPrice - (+appData.fullPrice * (appData.rollback/100));
        
    },


    
    checkValue: function() {
        
        appData.isError = false;
        screenMain.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if (select.value === '' || input.value === '') {
                appData.isError = true;
            }
        });

        if(!appData.isError) {
            appData.start();
        } else {
            alert('Заполните поле');
        }
    },


     logger:function() {
        //  console.log(appData.screens);
     }  
};
appData.init();
