// List of all the cars
const cars = [
    {
        id: '1',
        name: 'BMW I8',
        image: './img/bmw.png',
        description: 'O BMW i8 é um dos modelos mais icônicos da montadora alemã, representando a fusão perfeita entre tecnologia e design. Lançado em 2014, o i8 rapidamente se tornou um símbolo de inovação no setor automotivo, destacando-se por sua motorização híbrida e estética futurista.'
    },
    {
        id: '2',
        name: 'Audi R8',
        image: './img/audi.png',
        description: 'O Audi R8 é um dos supercarros mais desejados do mundo, destacando-se por sua potência, design e tecnologia. Lançado em 2006, o R8 foi o primeiro modelo de produção da Audi a contar com motor central-traseiro, o que lhe confere uma dirigibilidade excepcional.'
    },
    {
        id: '3',
        name: 'Lamborghini',
        image: './img/lamborghini.png',
        description: 'A Lamborghini é uma das marcas de carros esportivos mais icônicas do mundo, conhecida por seus modelos de alto desempenho e design arrojado. Fundada em 1963, a montadora italiana produz alguns dos supercarros mais desejados do mercado, como o Aventador, Huracán e Urus.'
    },
];

// Place where you will receive the cars
const listCars = document.querySelector('.list');

// Function to show cars
function addToCars() {
    listCars.innerHTML = '';

    cars.forEach((car, index) => {
        const divItem = document.createElement('div');
        divItem.classList.add('item', 'active');
        if (index === 0) divItem.classList.add('active');

        const divImage = document.createElement('div');
        divImage.classList.add('car-img');
        const image = document.createElement('img');
        image.src = car.image;
        image.alt = `${car.name} de lado`;
        divImage.appendChild(image);

        const divContent = document.createElement('div');
        divContent.classList.add('content');
        const h2 = document.createElement('h2');
        h2.classList.add('car-information');
        h2.textContent = car.name;
        const p = document.createElement('p');
        p.classList.add('description');
        p.textContent = car.description;

        const button = document.createElement('button');
        button.classList.add('information');
        button.textContent = 'Saiba Mais!';

        divContent.appendChild(h2);
        divContent.appendChild(p);
        divContent.appendChild(button);

        listCars.appendChild(divItem);
        divItem.appendChild(divImage);
        divItem.appendChild(divContent);
    });
}

addToCars();


// --------------------------------------------------------------


let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let container = document.querySelector('.container');
let items = container.querySelectorAll('.list .item');
let indicator = document.querySelector('.indicators');
let dots = indicator.querySelectorAll('ul li');
let list = container.querySelector('.list');
const iconMenu = document.getElementById('icon-menu'); // PEGANDO O ID DO ICON MENU
const menu = document.querySelector('nav'); // PEGANDO A CLASS DO MENU

let active = 0
let firstPosition = 0
let lastPosition = items.length - 1

// Function to set the slider
function setSlider() {
    if (!items.length) return;

    let itemOld = document.querySelector('.list .item.active');
    if (itemOld) itemOld.classList.remove('active');

    items[active].classList.add('active');

    if (dots.length) {
        let dotsOld = document.querySelector('.indicators ul li.active');
        if (dotsOld) dotsOld.classList.remove('active');
        dots[active].classList.add('active');
    }

    let numberIndicator = document.querySelector('.indicators .number');
    if (numberIndicator) {
        numberIndicator.innerHTML = '0' + (active + 1);
    }
}

nextButton.onclick = () => {
    list.style.setProperty('--calculation', 1)
    active = active + 1 > lastPosition ? 0 : active + 1
    setSlider()
    items[active].classList.add('active');
}

prevButton.onclick = () => {
    list.style.setProperty('--calculation', -1)
    active = active - 1 < firstPosition ? lastPosition : active - 1
    setSlider()
    items[active].classList.add('active');
}

iconMenu.addEventListener('click', () => {
    menu.classList.toggle('open-menu');
});