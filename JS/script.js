// SCRIPT DA HOME PEGE

// List of all the cars
export const cars = [
    {
        item: '1',
        name: 'BMW I8',
        image: './img/bmw.png',
        description: 'O BMW i8 é um dos modelos mais icônicos da montadora alemã, representando a fusão perfeita entre tecnologia e design. Lançado em 2014, o i8 rapidamente se tornou um símbolo de inovação no setor automotivo, destacando-se por sua motorização híbrida e estética futurista.',
        category: 'cars'
    },
    {
        item: '2',
        name: 'Audi R8',
        image: './img/audi.png',
        description: 'O Audi R8 é um dos supercarros mais desejados do mundo, destacando-se por sua potência, design e tecnologia. Lançado em 2006, o R8 foi o primeiro modelo de produção da Audi a contar com motor central-traseiro, o que lhe confere uma dirigibilidade excepcional.',
        category: 'cars'
    },
    {
        item: '3',
        name: 'Lamborghini',
        image: './img/lamborghini.png',
        description: 'A Lamborghini é uma das marcas de carros esportivos mais icônicas do mundo, conhecida por seus modelos de alto desempenho e design arrojado. Fundada em 1963, a montadora italiana produz alguns dos supercarros mais desejados do mercado, como o Aventador, Huracán e Urus.',
        category: 'cars'
    },
    {
        item: '4',
        name: 'YAMAHA FAZER',
        image: './img/yamaha-fazer.png',
        description: 'A Yamaha FZ16 é uma motocicleta padrão fabricada pela Yamaha desde 2008. A FZ16 é baseada na FZ1 e é vendida em vários mercados, incluindo a Índia, Indonésia, Colômbia, Argentina e Malásia.',
        category: 'motorcycles'
    },
    {
        item: '5',
        name: 'BMW RR',
        image: './img/bmw-rr.png',
        description: 'A BMW S 1000 RR é uma superesportiva que se destaca pela sua tecnologia, desempenho e design. A moto foi lançada em 2009 e desde então tem sido aperfeiçoada.',
        category: 'motorcycles'
    },
    {
        item: '6',
        name: 'YAMAHA YZF R6',
        image: './img/yamaha-yzf-r6.png',
        description: 'A Yamaha R6 é uma motocicleta esportiva com um motor de alto desempenho. A versão R6 Race foi desenvolvida exclusivamente para uso em pista.',
        category: 'motorcycles'
    }
];


// --------------------------------------------------------------


let container = document.querySelector('.container');
const iconMenu = document.getElementById('icon-menu'); // PEGANDO O ID DO ICON MENU
const menu = document.querySelector('nav'); // PEGANDO A CLASS DO MENU


let active = 0;
let firstPosition = 0;
let lastPosition = 0;  // Atualize o lastPosition após a renderização dos itens
let items = [];

// Function to set the slider
function setSlider() {
    if (!container) return;

    items = container.querySelectorAll('.list .item');  // Atualize items após a renderização
    lastPosition = items.length - 1;  // Atualize a última posição após a renderização
    const selectOptions = document.getElementById('opcoes').value;

    if (!items.length) return;

    // Remove a classe 'active' de todos os itens
    items.forEach(item => item.classList.remove('active'));

    // Apenas o primeiro item recebe a classe 'active'
    if (items[active]) {
        items[active].classList.add('active');
    }

    // Atualiza os indicadores (se existirem)
    const indicator = document.querySelector('.indicators');
    if (indicator) {
        const dots = indicator.querySelectorAll('ul li');
        let dotsOld = document.querySelector('.indicators ul li.active');
        if (dotsOld) dotsOld.classList.remove('active');
        if (dots.length > 0) dots[active].classList.add('active');
    }

    const numberIndicator = document.querySelector('.indicators .number');
    if (numberIndicator) {
        numberIndicator.innerHTML = '0' + (active + 1);
    }
}



// Function to show cars
function addToCars() {
    const listCars = document.querySelector('.list');
    const selectOptions = document.getElementById('opcoes').value;
    const section = document.querySelector('section');

    if (!listCars) return;

    listCars.innerHTML = ''; // Limpa o conteúdo do elemento
    let filterCars;

    if (selectOptions === 'all') {
        filterCars = cars;
    } else {
        filterCars = cars.filter(car => car.category === selectOptions);
    }

    filterCars.forEach((car, index) => {
        const divItem = document.createElement('div');
        divItem.classList.add('item');
        if (index === 0) {
            divItem.classList.add('active');
            active = 0;
        }

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
        button.type = 'submit';

        divContent.appendChild(h2);
        divContent.appendChild(p);
        divContent.appendChild(button);

        listCars.appendChild(divItem);
        divItem.appendChild(divImage);
        divItem.appendChild(divContent);
    });

    // Verifica se a div de indicadores já existe
    let indicatorsContainer = document.querySelector('.indicators');
    if (!indicatorsContainer) {
        // Se não existe, cria a div .indicators
        indicatorsContainer = document.createElement('div');
        indicatorsContainer.classList.add('indicators');
        section.appendChild(indicatorsContainer);

        // Adiciona o número de indicadores
        const numberIndicator = document.createElement('div');
        numberIndicator.classList.add('number');
        numberIndicator.textContent = filterCars.length > 0 ? '01' : '00'; // Atualiza o número de acordo com a quantidade de carros
        indicatorsContainer.appendChild(numberIndicator);
    } else {
        // Se a div já existe, apenas atualiza o número
        const numberIndicator = indicatorsContainer.querySelector('.number');
        if (numberIndicator) {
            numberIndicator.textContent = filterCars.length > 0 ? '01' : '00'; // Atualiza o número de acordo com a quantidade de carros
        }
    }

    // Se a categoria for "all", cria os indicadores (ul li)
    const ul = indicatorsContainer.querySelector('ul');
    if (selectOptions === "all") {
        // Cria a lista de indicadores apenas para "all"
        if (!ul) {
            const newUl = document.createElement('ul');
            filterCars.forEach((_, index) => {
                const li = document.createElement('li');
                if (index === 0) li.classList.add('active'); // O primeiro começa ativo
                newUl.appendChild(li);
            });
            indicatorsContainer.appendChild(newUl);
        }
    } else {
        // Se não for "all", remove os indicadores (ul li)
        if (ul) {
            indicatorsContainer.removeChild(ul);
        }
    }

    if (selectOptions === "all") {
        const indicatorUl = document.querySelector('.indicators ul');
        const liCount = indicatorUl.querySelectorAll('li').length;
        if (liCount > 6) {
            const br = document.createElement('br');
            indicatorUl.appendChild(br);
        }
    }

    setSlider();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("opcoes").addEventListener("change", addToCars);

    window.onload = () => {
        document.getElementById('opcoes').value = "all";
        addToCars();
    };

    let nextButton = document.getElementById('next');
    if (nextButton) {
        nextButton.onclick = function () {
            let list = container.querySelector('.list');
            list.style.setProperty('--calculation', 1);
            active = active + 1 > lastPosition ? 0 : active + 1;
            setSlider();
        };
    }

    let prevButton = document.getElementById('prev');
    if (prevButton) {
        prevButton.onclick = function () {
            let list = container.querySelector('.list');
            list.style.setProperty('--calculation', -1);
            active = active - 1 < firstPosition ? lastPosition : active - 1;
            setSlider();
        };
    }

    if (iconMenu && menu) {
        iconMenu.onclick = function () {
            menu.classList.toggle('open-menu');
        };
    }
});
// FIM DO SCRIPT DA HOME PAGE