let title = 'glo-academy';
let screens = "Простые, Сложные, Интерактивные";
let screensPrice = 400;
let rollback = 60;
let fullPrice = 15000;
let adaptive = true; 


console.log('title', 'fullPrice', 'adaptive');
console.log(screens.length);
console.log("Стоимость верстки экранов " + screensPrice + " руб");
console.log("Стоимость разработки сайта " + fullPrice + " руб");
console.log(screens.toLowerCase());
console.log(screens.split(","));
console.log(fullPrice/(rollback/100));