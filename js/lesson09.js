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
    init: function() {
        console.log(this.init)
        
        this.addTilte();
        calculationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.checkValue.bind(this);
        });
        plus.addEventListener('click', this.addScreenBlock.bind(this));
        totalInputRollback.addEventListener('input', this.rollbackInput.bind(this));
        rollback.addEventListener('input', this.rollbackInput.bind(this)); 
        console.log(this);
    },

    addTilte: () => {
        document.title = title.textContent;
    },
    start: () => {
        this.addScreens.apply(this);
        this.addServices.apply(this);
        this.addPrices.apply(this);
        this.logger.apply(this);
        this.showResult.apply(this);
    },

    showResult:  () => {
        totalInputDev.value = this.screensPrice;
        totalInputService.value = this.servicePricesPercent + this.servicePricesNumber;
        totalInputPrice.value = this.fullPrice;
        totalInputRollback.value = this.servicePercentPrice;
        totalInputScreen.value = this.screensCount; 
       
    },

    addScreens: () => {
        
        screenMain.forEach((screens, index) => {
            const select = screens.querySelector('select');
            const input = screens.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            

            this.screens.push({
                id:index, 
                name:selectName, 
                money: +select.value * +input.value,
                count: +input.value
            });
            
        });
        
    },

    addServices:() => {
        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }  

        });

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }

        });
 
    },

    rollbackInput: () => {

        span.textContent = rollback.value + '%';
        this.rollback = parseInt(span.textContent);
        
    },

    addScreenBlock: () => {
        
        const cloneScreen = screenMain[0].cloneNode(true);
        screenMain[screenMain.length - 1].after(cloneScreen);
       
        
        let mainInput = cloneScreen.querySelector('.screen input');
        console.log(mainInput);
        mainInput.value = '';

        screenMain = document.querySelectorAll('.screen');
        console.log(screenMain);

    },

    addPrices: () => {

        
        for(let screen of this.screens) {
            this.screensPrice += +screen.money;
        }
        for(let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        for(let key in this.servicesPercent) {
            this.servicePricesPercent += this.screensPrice * (this.servicesPercent[key]/100);
        }
        for (let screen of this.screens) {
            this.screensCount += screen.count;
        }


        this.fullPrice = +this.screensPrice + this.servicePricesPercent + this.servicePricesNumber; 

       this.servicePercentPrice =  this.fullPrice - (+this.fullPrice * (this.rollback/100));
        
    },
    
    checkValue: () => {
        
        this.isError = false;
        screenMain.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if (select.value === '' || input.value === '') {
                this.isError = true;
            }
        });

        if(!this.isError) {
            this.start();
        } else {
            alert('Заполните поле');
        }
    },

     logger: () => {
     }  
};

appData.init();
