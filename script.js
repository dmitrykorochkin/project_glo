const books = document.querySelectorAll('.books');
const book = document.querySelectorAll('.book');

console.log(books);
console.log(book);

//Восстановить порядок книг.

book[5].after(book[4]);
book[0].before(book[1]);
book[2].before(book[4]);
book[3].after(book[2]);
book[2].before(book[5]);


//Заменить картинку заднего фона на другую из папки image 
const image = document.querySelector('body')
image.style.backgroundImage = "url('image/you-dont-know-js.jpg')";


//Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")


const firstTitle = document.querySelector('.book')[2];
console.log(firstTitle);


const firstParagraph = document.getElementsByTagName("a")[2];
firstParagraph.innerHTML = ('"Книга 3. this и Прототипы Объектов"');


const adv = document.querySelector('.adv')
adv.remove();

let bookLi = document.createElement('li');
bookLi.innerText = 'Глава 8: За пределами ES6';
books[0].children[5].querySelector('ul').appendChild(bookLi);


// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы 
// элементов, поможет dev tools)

const sortChapter = collection => {
    const sortElements = arr => {
        const arrInd = Object.keys(arr).sort((prev, next) => {
            if (arr[prev].textContent > arr[next].textContent) {
                return 1; }
            if (arr[prev].textContent < arr[next].textContent) { 
                return -1; }
            });
        let arrNew = [];
        for (let i = 0; i < arrInd.length; i++){
            arrNew.push(arr[arrInd[i]]);
        }
        return arrNew;
    };

    const elem = collection.querySelectorAll('li');
    let arrChapter = [],
        arrApp = [];
    elem.forEach(el => {
        if (el.textContent.indexOf('Введение') > -1) {
            collection.insertBefore(el, elem[0]);
        }
        if (el.textContent.indexOf('Предисловие') > -1) {
            collection.insertBefore(el, elem[1]);
        }
        if (el.textContent.indexOf('Глава') > -1) { arrChapter.push(el); }
        if (el.textContent.indexOf('Приложение') > -1) { arrApp.push(el); }
    });
    arrChapter = sortElements(arrChapter);
    arrChapter.forEach(el => { collection.appendChild(el); });
    arrApp = sortElements(arrApp);
    arrApp.forEach(el => { collection.appendChild(el); });
};

sortChapter(books[0].children[1].querySelector('ul'));
sortChapter(books[0].children[4].querySelector('ul'));

