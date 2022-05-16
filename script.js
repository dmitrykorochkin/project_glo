const title = 'glo-academy';
const screens = "Простые, Сложные, Интерактивные";
const screensPrice = 400;
const rollback = 60;
const fullPrice = 15000;
const adaptive = true; 


console.log(typeof fullPrice);
console.log(typeof title);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screensPrice + " руб");
console.log("Стоимость разработки сайта " + fullPrice + " руб");

console.log(screens.toLowerCase().split(', '));



console.log("Процент отката посреднику за работу " + (fullPrice * (rollback/100)) + " руб");

