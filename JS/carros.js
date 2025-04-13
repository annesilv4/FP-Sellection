import { cars } from './script.js';

const iconMenu = document.getElementById('icon-menu'); // PEGANDO O ID DO ICON MENU
const menu = document.querySelector('nav'); // PEGANDO A CLASS DO MENU

document.addEventListener('DOMContentLoaded', () => {
    if (iconMenu && menu) {
        iconMenu.addEventListener('click', () => {
            menu.classList.toggle('open-menu');
        });
    }

    // ADICIONANDO O EVENTO CLICK NO BOTÃO PARA ABRIR O MODAL DE OPÇÕES E FECHAR
    const buttonOption = document.querySelector('.button-option');
    const modal = document.querySelector('.modal');
    const closedModal = document.querySelector('.closed-modal');
    const overlay = document.querySelector('.overlay');

    // ABRIR O MODAL QUANDO CLICAR NO BOTÃO DE OPÇÕES
    buttonOption.addEventListener('click', () => {
        modal.classList.toggle('active');
        overlay.style.display = modal.classList.contains('active') ? 'block' : 'none';
    });

    // FECHAR O MODAL QUANDO CLICAR NO X DENTRO DO MODAL
    closedModal.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.style.display = 'none';
    });

    // E FECHAR QUANDO CLICAR FORA DO MODAL
    document.addEventListener('click', (event) => {
        if (modal.classList.contains('active') && !modal.contains(event.target) && !buttonOption.contains(event.target)) {
            modal.classList.remove('active');
            overlay.style.display = 'none';
        }
    });
});

// -------------------------------------------------------------

// ADICIONANDO UM SELETOR DE COR INTERATIVO
const colorPaint = document.querySelector('.color-paint');
const colorInput = document.getElementById('colorInput');
const colorText = document.getElementById('colorText');
const icon = document.getElementById('icon');

colorPaint.addEventListener('click', () => {
    colorInput.click();
});

colorInput.addEventListener('input', () => {
    let selectedColor = colorInput.value;
    icon.style.color = selectedColor;
    colorText.textContent = selectedColor;
});

// -------------------------------------------------------------

// ADICIONANDO A ABERTURA DO INPUT DENTRO DO BOTÃO 'OUTRAS MARCAS'

// -------------------------------------------------------------

// FILTRANDO OS VEÍCULOS
document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
    addToVehicles(cars);
});

// OBJETO PARA ARMAZENAR OS FILTROS
const filters = {
    colors: new Set(),
    marks: new Set(),
    years: new Set(),
    categories: new Set(),
};

// FUNÇÃO PARA ATUALIZAR A LISTA DE VEÍCULOS COM BASE NOS FILTROS
function applyFilters() {
    console.log("applyFilters() foi chamada!");

    let filteredCars = cars.filter(car => {
        return (
            (filters.colors.size === 0 || filters.colors.has(car.colorHEX.toLowerCase())) &&
            (filters.marks.size === 0 || filters.marks.has(car.mark.trim().toLowerCase())) &&
            (filters.years.size === 0 || filters.years.has(car.years)) &&
            (filters.categories.size === 0 || filters.categories.has(car.category.toLowerCase()))
        );
    });

    console.log("Filtros ativos:", filters);

    const cardCars = document.querySelector('.card-cars');
    if (cardCars) {
        cardCars.innerHTML = '';
        addToVehicles(filteredCars);
    }
}

// FUNÇÃO PARA ADICIONAR FILTROS AOS BOTÕES
function setupFilters() {
    const filterButtons = [
        { selector: '.color-black', filterKey: 'colors', value: '#000000' },
        { selector: '.color-white', filterKey: 'colors', value: '#FFFFFF' },
        { selector: '.color-gray', filterKey: 'colors', value: '#808080' },
        { selector: '.mark-bmw', filterKey: 'marks', value: 'BMW' },
        { selector: '.mark-audi', filterKey: 'marks', value: 'Audi' },
        { selector: '.mark-yamaha', filterKey: 'marks', value: 'Yamaha' },
        { selector: '.mark-lamborghini', filterKey: 'marks', value: 'Lamborghini' },
        { selector: '.year-2025', filterKey: 'years', value: '2025' },
        { selector: '.year-2024', filterKey: 'years', value: '2024' },
        { selector: '.year-2023', filterKey: 'years', value: '2023' },
        { selector: '.type-car', filterKey: 'categories', value: 'cars' },
        { selector: '.type-motorcycle', filterKey: 'categories', value: 'motorcycles' },
    ];

    filterButtons.forEach(({ selector, filterKey, value }) => {
        const button = document.querySelector(selector);
        if (button) {
            button.addEventListener('click', () => {
                if (filters[filterKey].has(value)) {
                    filters[filterKey].delete(value);
                    button.classList.remove('active'); // Remove a classe ativa
                } else {
                    filters[filterKey].add(value);
                    button.classList.add('active'); // Adiciona a classe ativa
                }
                applyFilters();
            });
        }
    });

    // FILTRO DINÂMICO POR COR (INPUT)
    const colorInput = document.getElementById('colorInput');
    if (colorInput) {
        colorInput.addEventListener('input', () => {
            const selectedColor = colorInput.value.trim().toLowerCase(); // Remove espaços e normaliza

            filters.colors.clear();
            filters.colors.add(selectedColor);

            applyFilters();
        });
    }
}

// FUNÇÃO PARA ADICIONAR OS VEÍCULOS AO HTML
function addToVehicles(filteredCars) {
    const cardCars = document.querySelector('.card-cars');
    if (!cardCars) return;

    cardCars.innerHTML = ''; // Evita duplicação

    filteredCars.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.classList.add('card');

        vehicleCard.innerHTML = `
            <img src="${vehicle.image}">
            <h2>${vehicle.name}</h2>
        `;

        cardCars.appendChild(vehicleCard);
    });
}

// -------------------------------------------------------------

// CRIANDO UM SELECT PERSONALIZADO PARA O ANO
const yearSelect = document.querySelector('.year-select');
const yearOther = document.querySelector('.year-other');
const selected = document.querySelector('.selected');
const optionsContainer = document.getElementById('optionsContainer');
const anoInicial = 2022;
const anoFinal = 1999;

// TEXTO PADRÃO DO ANO
const textPadrao = '<i class="fa-solid fa-plus"></i> <span>ano</span>';

for (let ano = anoInicial; ano >= anoFinal; ano--) {
    const option = document.createElement('div');
    option.classList.add('option');
    option.innerHTML = `${ano}`;
    option.addEventListener('click', () => {
        const selectedYear = `${ano}`
        selected.innerHTML = selectedYear;

        yearSelect.innerHTML = '';
        filters.years.clear();

        const yearButton = document.createElement('button');
        yearButton.classList.add('btn-year');
        yearButton.textContent = selectedYear;

        const iconClose = document.createElement('i');
        iconClose.classList.add('fa-solid', 'fa-xmark');
        iconClose.addEventListener('click', (event) => {
            event.stopPropagation();
            yearButton.remove();
            filters.years.clear();
            selected.innerHTML = textPadrao;
            applyFilters();
        });

        yearButton.appendChild(iconClose);
        yearSelect.appendChild(yearButton);
        filters.years.add(selectedYear);
        applyFilters();
    });

    optionsContainer.appendChild(option);
}

yearOther.addEventListener('click', () => {
    optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.year-other')) {
        optionsContainer.style.display = 'none';
    }
});

// -------------------------------------------------------------

// CRIANDO UM SELECT PERSONALIZADO PARA A MARCA
const markSelect = document.querySelector('.mark-select');
const markOther = document.querySelector('.mark-other');
const selectedMark = document.querySelector('.selectedMarks');
const optionsMark = document.getElementById('optionsMarks');

const marcas = [
    {
        icon: 'https://logospng.org/download/toyota/logo-toyota-256.png',
        name: 'Toyota',
    },
    {
        icon: 'https://logospng.org/download/honda/logo-honda-256.png',
        name: 'Honda',
    },
    {
        icon: 'https://logospng.org/download/ford/logo-ford-256.png',
        name: 'Ford',
    },
    {
        icon: 'https://logospng.org/download/chevrolet/chevrolet-256.png',
        name: 'Chevrolet',
    },
    {
        icon: 'https://logospng.org/download/nissan/logo-nissan-antigo-256.png',
        name: 'Nissan',
    },
    {
        icon: 'https://logospng.org/download/volkswagen/logo-volkswagen-256.png',
        name: 'Volkswagen',
    },
    {
        icon: './img/logos/mercedes-benz.png',
        name: 'Mercedes-Benz',
    },
    {
        icon: 'https://logospng.org/download/fiat/logo-fiat-256.png',
        name: 'Fiat',
    },
    {
        icon: 'https://logospng.org/download/jeep/logo-jeep-256.png',
        name: 'Jeep',
    },
    {
        icon: 'https://logospng.org/download/hyundai/logo-hyundai-escudo-256.png',
        name: 'Hyundai',
    },
    {
        icon: 'https://logospng.org/download/kia-motors/kia-256.png',
        name: 'Kia',
    },
    {
        icon: 'https://logospng.org/download/peugeot/logo-peugeot-256.png',
        name: 'Peugeot',
    },
    {
        icon: 'https://logospng.org/download/renault/logo-renault-256.png',
        name: 'Renault',
    },
    {
        icon: 'https://logospng.org/download/subaru/subaru-256.png',
        name: 'Subaru',
    },
    {
        icon: 'https://logospng.org/download/mitsubishi/logo-mitsubishi-256.png',
        name: 'Mitsubishi',
    },
    {
        icon: 'https://logospng.org/download/volvo/volvo-256.png',
        name: 'Volvo',
    },
    {
        icon: 'https://logospng.org/download/suzuki/logo-suzuki-256.png',
        name: 'Suzuki',
    },
    {
        icon: 'https://logospng.org/download/citroen/citroen-256.png',
        name: 'Citroën',
    },
    {
        icon: './img/logos/maserati.png',
        name: 'Maserati',
    },
    {
        icon: 'https://logospng.org/download/tesla/logo-tesla-256.png',
        name: 'Tesla',
    },
    {
        icon: 'https://logospng.org/download/porsche/logo-porsche-256.png',
        name: 'Porsche',
    },
    {
        icon: './img/logos/land-rover.png',
        name: 'Land Rover',
    },
    {
        icon: 'https://logospng.org/download/jaguar/logo-jaguar-256.png',
        name: 'Jaguar',
    },
    {
        icon: './img/logos/lexus.png',
        name: 'Lexus',
    },
    {
        icon: './img/logos/infiniti.png',
        name: 'Infiniti',
    },
    {
        icon: './img/logos/acura.png',
        name: 'Acura',
    },
    {
        icon: './img/logos/alfa-romeo.png',
        name: 'Alfa Romeo',
    },
    {
        icon: './img/logos/aston-martin.png',
        name: 'Aston Martin',
    },
    {
        icon: './img/logos/bentley.png',
        name: 'Bentley',
    },
    {
        icon: './img/logos/bugatti.png',
        name: 'Bugatti',
    },
    {
        icon: 'https://logospng.org/download/ferrari/logo-ferrari-256.png',
        name: 'Ferrari',
    },
    {
        icon: './img/logos/rolls-royce.png',
        name: 'Rolls Royce',
    }
];

const textPadraoMarca = '<span>Outras marcas</span>';

// Ordenar as marcas por nome
marcas.sort((a, b) => a.name.localeCompare(b.name));

marcas.forEach(marca => {
    const option = document.createElement('div');
    option.classList.add('option');
    option.innerHTML = `<img src="${marca.icon}" alt="Logo da marca ${marca.name}"> ${marca.name}`;

    option.addEventListener('click', () => {
        const selectedMarca = marca.name;

        // Atualiza o elemento que mostra a marca selecionada
        selectedMark.innerHTML = `${selectedMarca}`;

        // Limpa marcações anteriores
        markSelect.innerHTML = '';
        filters.marks.clear();

        // Cria botão com o nome da marca selecionada
        const markButton = document.createElement('button');
        markButton.classList.add('btn-mark');
        markButton.textContent = selectedMarca;

        // Ícone de fechar/remover filtro
        const iconClose = document.createElement('i');
        iconClose.classList.add('fa-solid', 'fa-xmark');

        // Evita que o clique no "X" também acione o clique da marca
        iconClose.addEventListener('click', (event) => {
            event.stopPropagation();
            markButton.remove();
            filters.marks.clear();
            selectedMark.innerHTML = textPadraoMarca;
            applyFilters();
        });

        // Adiciona o ícone de fechar dentro do botão
        markButton.appendChild(iconClose);

        // Exibe o botão no local destinado
        markSelect.appendChild(markButton);

        // Adiciona a marca selecionada ao filtro
        filters.marks.add(selectedMarca);

        // Aplica os filtros atualizados
        applyFilters();
    });

    optionsMark.appendChild(option);
});

// Toggle do menu de marcas
markOther.addEventListener('click', () => {
    optionsMark.style.display = optionsMark.style.display === 'block' ? 'none' : 'block';
});

// Fechar ao clicar fora
document.addEventListener('click', (event) => {
    if (!event.target.closest('.mark-other')) {
        optionsMark.style.display = 'none';
    }
});

// -------------------------------------------------------------

const buttonsColors = document.querySelectorAll('.button-colors button');
const colorSelect = document.querySelector('.color-select');

buttonsColors.forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que o clique feche o modal

        // PEGANDO O TEXTO DO BOTÃO CLICADO
        const buttonText = button.querySelector('span').textContent;

        // VERIFICANDO SE O BOTÃO JÁ ESTÁ SELECIONADO
        const isActive = button.classList.contains('active');

        // SE A COR JÁ ESTÁ SELECIONADA
        if (isActive) {
            // REMOVE A COR SELECIONADA E RESTAURA TODOS OS VEÍCULOS
            button.classList.remove('active');
            colorSelect.innerHTML = ''; // Remove o botão visual
            filters.colors.delete(buttonText); // Remove a cor do filtro
            applyFilters(); // Exibe todos os veículos novamente
        } else {
            // SE NÃO ESTIVER ATIVO, LIMPA A SELEÇÃO ANTERIOR E APLICA O NOVO FILTRO
            buttonsColors.forEach(btn => btn.classList.remove('active'));
            colorSelect.innerHTML = ''; // Remove qualquer botão de seleção anterior
            filters.colors.clear(); // Limpa qualquer filtro antigo
            applyFilters(); // Exibe todos os veículos antes de aplicar um novo filtro

            // ATIVAR A NOVA COR SELECIONADA
            button.classList.add('active');

            // Criar botão para exibir a cor selecionada
            const colorButton = document.createElement('button');
            colorButton.classList.add('btn-color');
            colorButton.textContent = buttonText;

            // Criar ícone de fechar
            const iconClose = document.createElement('i');
            iconClose.id = 'icon-close';
            iconClose.classList.add('fa-solid', 'fa-xmark');

            iconClose.addEventListener('click', (event) => {
                event.stopPropagation(); // Evita o fechamento do modal ao clicar no "X"

                colorButton.remove(); // Remove o botão de exibição da cor
                button.classList.remove('active'); // Desativa a cor selecionada
                filters.colors.delete(buttonText); // Remove o filtro
                filters.colors.clear();
                applyFilters(); // Exibe todos os veículos
            });

            // Adicionando botão ao container
            colorButton.appendChild(iconClose);
            colorSelect.appendChild(colorButton);

            // Aplicando o novo filtro
            filters.colors.clear();
            filters.colors.add(buttonText);
            applyFilters();
        }
    });
});

// PELA MARCA
const buttonMark = document.querySelectorAll('.button-mark button');

buttonMark.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.stopPropagation();

        const span = btn.querySelector('span');
        if (!span) return;

        const markText = span.textContent.trim().toLowerCase();
        const isActive = btn.classList.contains('active');

        if (isActive) {
            btn.classList.remove('active');
            filters.marks.delete(markText);
            markSelect.innerHTML = '';
            applyFilters();
        } else {
            // Limpando os outros botões, menos o clicado
            buttonMark.forEach(button => {
                if (button !== btn) button.classList.remove('active');
            });

            markSelect.innerHTML = '';
            filters.marks.clear();

            // Só depois adiciona a classe active no botão clicado
            btn.classList.add('active');

            const markButton = document.createElement('button');
            markButton.classList.add('btn-mark');
            markButton.textContent = markText;

            const iconClose = document.createElement('i');
            iconClose.classList.add('fa-solid', 'fa-xmark');

            iconClose.addEventListener('click', (event) => {
                event.stopPropagation();
                markButton.remove();
                btn.classList.remove('active');
                filters.marks.clear();
                applyFilters();
            });

            markButton.appendChild(iconClose);
            markSelect.appendChild(markButton);

            filters.marks.add(markText);
            applyFilters();
        }
    });
});

// ---------------------------------------------------

// PELO ANO
const buttonYear = document.querySelectorAll('.button-year button');

buttonYear.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.stopPropagation();

        const span = btn.querySelector('span');

        const yearText = parseInt(span.textContent.trim());
        const isActive = btn.classList.contains('active');
        if (isActive) {
            btn.classList.remove('active');
            filters.years.delete(yearText);
            yearSelect.innerHTML = '';
            applyFilters();
        } else {
            buttonYear.forEach(button => {
                if (button !== btn) button.classList.remove('active');
            });

            yearSelect.innerHTML = '';
            filters.years.clear();

            btn.classList.add('active');

            const yearButton = document.createElement('button');
            yearButton.classList.add('btn-year');
            yearButton.textContent = yearText;

            const iconClose = document.createElement('i');
            iconClose.classList.add('fa-solid', 'fa-xmark', '.btn-year');
            iconClose.addEventListener('click', (event) => {
                event.stopPropagation();
                yearButton.remove();
                btn.classList.remove('active');
                filters.years.clear();
                applyFilters();
            });

            yearButton.appendChild(iconClose);
            yearSelect.appendChild(yearButton);

            filters.years.add(yearText);
            applyFilters();
        }
    });
});

// ---------------------------------------------------

// PELO TIPO
const buttonType = document.querySelectorAll('.button-type button');
const typeSelect = document.querySelector('.type-select');

buttonType.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.stopPropagation();

        const text = btn.querySelector('span')?.textContent || btn.textContent;
        const isActive = btn.classList.contains('active');

        if (isActive) {
            btn.classList.remove('active');
            filters.categories.delete(text.toLowerCase());
            typeSelect.innerHTML = '';
            applyFilters();
        } else {
            buttonType.forEach(button => {
                if (button !== btn) button.classList.remove('active');
            });

            typeSelect.innerHTML = '';
            filters.categories.clear();

            btn.classList.add('active');

            const typeButton = document.createElement('button');
            typeButton.classList.add('btn-type');
            typeButton.textContent = text;

            const iconClose = document.createElement('i');
            iconClose.classList.add('fa-solid', 'fa-xmark');

            iconClose.addEventListener('click', (event) => {
                event.stopPropagation();
                typeButton.remove();
                btn.classList.remove('active');
                filters.categories.clear();
                applyFilters();
            });

            typeButton.appendChild(iconClose);
            typeSelect.appendChild(typeButton);

            filters.categories.add(text);
            applyFilters();
        }
    });
});

// ---------------------------------------------------

// ADICIONANDO O EVENTO DE CLICK NO BOTÃO DE LIMPAR FILTROS
const clearOptions = document.querySelector('.demarcate-option');

clearOptions.addEventListener('click', () => {
    filters.colors.clear();
    filters.marks.clear();
    filters.years.clear();
    filters.categories.clear();

    // LIMPANDO TODOS OS ACTIVES
    buttonsColors.forEach(button => button.classList.remove('active'));
    buttonMark.forEach(button => button.classList.remove('active'));
    buttonYear.forEach(button => button.classList.remove('active'));
    buttonType.forEach(button => button.classList.remove('active'));

    // LIMPANDO OS BOTÕES DE FILTRO
    colorSelect.innerHTML = '';
    markSelect.innerHTML = '';
    yearSelect.innerHTML = '';
    typeSelect.innerHTML = '';

    // CHAMANDO A FUNÇÃO DE APLICAR FILTROS
    applyFilters();
});

// -----------------------------------------------------

// FIM DO SCRIPT DA PÁGINA DE CARROS