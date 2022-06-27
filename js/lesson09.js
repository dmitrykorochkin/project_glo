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
    init() {
        
        this.addTilte();
        calculationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.checkValue.apply(this);
        });
        plus.addEventListener('click', this.addScreenBlock.bind(this));
        
        totalInputRollback.addEventListener('input', this.rollbackInput.bind(this));
        rollback.addEventListener('input', this.rollbackInput.bind(this)); 
        resetBtn.addEventListener('click', this.reset.bind(this));
    },

    addTilte: function() {
        document.title = title.textContent;
    },
    start: function() {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.logger();
        this.showResult();
    },
    reset: function() {
        this.resetScreens();
        this.resetBtn();
        this.resetRollBack();
        this.resetServices();
        this.resetTotalInputs();
    },
    resetTotalInputs: function() {
        totalInputDev.value = 0;
        totalInputScreen.value = 0;
        totalInputService.value = 0;
        totalInputPrice.value = 0;
        totalInputRollback.value = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.screensPrice = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.screensCount = 0;
        this.servicePricesNumber = 0;
        this.servicePricesPercent  = 0;

    },
    resetScreens: function () {
       
        screenMain.forEach((item, index) => {
            const select = item.querySelector('select');
            const input = item.querySelector('input');
            if (index >= 1) {
                screenMain[index].remove();
            }
            input.value = '';
            input.disabled = false;
            select.value = '';
            select.disabled = false;
        });
        this.screens = [];
        screenMain = document.querySelectorAll('.screen');
    },
    resetBtn: function() {
        calculationBtn.style = "display";
        resetBtn.style = "display: none";
        plus.disabled = false;

    },
    resetRollBack: function() {
        rollback.disabled = false;
        rollback.value = 0;
        span.textContent = 0;
    },
    resetServices: function() {
        percent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            if (check.checked) {
                check.checked = !check.checked; 
            }
            check.disabled = false;
        });

        number.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            if (check.checked) {
                check.checked = !check.checked;
            }
            check.disabled = false;
        });
    },

    showResult:  function() {
        totalInputDev.value = this.screensPrice;
        totalInputService.value = this.servicePricesPercent + this.servicePricesNumber;
        totalInputPrice.value = this.fullPrice;
        totalInputRollback.value = this.servicePercentPrice;
        totalInputScreen.value = this.screensCount;
        calculationBtn.style = "display: none";
        resetBtn.style = "display";
        plus.disabled = true;
        screenMain.disabled = true;
        rollback.disabled = true;
    },

    addScreens: function() {
        
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

            select.disabled = true;
            input.disabled = true;
            
        });
        
    },

    addServices:function() {
        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }  
            check.disabled = true;
            input.disabled = true;

        });

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
            check.disabled = true;
            input.disabled = true;

        });
 
    },

    rollbackInput: function() {

        span.textContent = rollback.value + '%';
        this.rollback = parseInt(span.textContent);     
    },

    addScreenBlock: function() {

        const cloneScreen = screenMain[0].cloneNode(true);
        screenMain[screenMain.length - 1].after(cloneScreen);

        let mainInput = cloneScreen.querySelector('.screen input');
        mainInput.value = '';
    
        screenMain = document.querySelectorAll('.screen');
    },

    addPrices: function() {

        
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
    
    checkValue: function(){
        
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

     logger: function() {
     }  
};

appData.init();
