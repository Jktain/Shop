// Создаь карточки из массива продукотов
function CreateCards() {
  let pag = document.querySelector('.pagination');
  for (let i = 0; i < productList.length; i++) {
    pag.before(productList[i].Init(i));
  }
}

//Функция сортировки
function MySort(func) {
  let items = document.querySelector('.content').children;
  let itemsArr = [];
  for (let elem in items) {
    if (items[elem].nodeType == 1) {
      itemsArr.push(items[elem]);
    }
  }
  itemsArr.sort(func);

  for (let i = 0; i < itemsArr.length; ++i) {
    document.querySelector('.content').appendChild(itemsArr[i]);
  }
}

//Отсортировать по имени А-Я
function SortNameAZ() {
  MySort(function (a, b) {
    if (
      a.getAttribute('class') == 'pagination' ||
      b.getAttribute('class') == 'pagination'
    )
      return 0;
    if (a.children[1].textContent > b.children[1].textContent) {
      return 1;
    }
    if (a.children[1].textContent < b.children[1].textContent) {
      return -1;
    }
    return 0;
  });
}

//Отсортировать по имени Я-А
function SortNameZA() {
  MySort(function (a, b) {
    if (
      a.getAttribute('class') == 'pagination' ||
      b.getAttribute('class') == 'pagination'
    )
      return 0;
    if (a.children[1].textContent > b.children[1].textContent) {
      return -1;
    }
    if (a.children[1].textContent < b.children[1].textContent) {
      return 1;
    }
    return 0;
  });
}

//Сортування по ціні
function SortPriceAZ() {
  MySort(function (a, b) {
    if (
      a.getAttribute('class') == 'pagination' ||
      b.getAttribute('class') == 'pagination'
    )
      return 0;
    if (
      +a.children[2].getAttribute('data-price') >
      +b.children[2].getAttribute('data-price')
    ) {
      return 1;
    }
    if (
      +a.children[2].getAttribute('data-price') <
      +b.children[2].getAttribute('data-price')
    ) {
      return -1;
    }
    return 0;
  });
}

function SortPriceZA() {
  MySort(function (a, b) {
    if (
      +a.getAttribute('class') == 'pagination' ||
      +b.getAttribute('class') == 'pagination'
    )
      return 0;
    if (
      +a.children[2].getAttribute('data-price') >
      +b.children[2].getAttribute('data-price')
    ) {
      return -1;
    }
    if (
      +a.children[2].getAttribute('data-price') <
      +b.children[2].getAttribute('data-price')
    ) {
      return 1;
    }
    return 0;
  });
}

// Сортировка
function Sort() {
  switch (currentSort) {
    case 0:
      SortNameAZ();
      break;
    case 1:
      SortNameZA();
      break;
    case 2:
      SortPriceAZ();
      break;
    case 3:
      SortPriceZA();
      break;
  }
}

//Выбор сортировки
function SetSort(selectObject) {
  currentSort = +selectObject.value;
  Sort();
}

//Выбор отображения
function SetQuantity(selectObject) {
  quantityPerPage = +selectObject.value;
  RecalcButtons();
  Recalculate();
}

//На первую страницу
function ToStart() {
  selectedPage = 0;
  Recalculate();
}

//На последнюю страницу
function ToEnd() {
  selectedPage = lastPage;
  Recalculate();
}

//Перети на страницу
function ToPage(page) {
  selectedPage = +page.textContent - 1;
  Recalculate();
}

//Пересоздание кнопок навигации
function RecalcButtons() {
  let items = document.querySelector('.content').children;
  let pags = document.querySelector('.content').children[
    document.querySelector('.content').children.length - 1
  ];
  let sel;

  if (selectedTypes.length == 0) {
    sel = Math.floor((items.length - 1) / quantityPerPage);
  } else {
    let kol = 0;
    for (let i = 0; i < items.length - 1; i++) {
      if (selectedTypes.includes(productList[items[i].children[5].id].type)) {
        kol++;
      }
    }
    sel = Math.floor(kol / quantityPerPage);
  }
  lastPage = sel;

  //Если количество страниц в пагинации неправильное, то пересоздаём пагинацию
  if (pags.children.length != sel + 3) {
    for (let i = 0; i < pags.children.length; i++) {
      if (pags.children[i].getAttribute('class') == 'pagination-page') {
        pags.children[i].remove();
        i--;
      }
    }
    for (let i = 0; i <= sel; i++) {
      let newPage = document.createElement('a');
      newPage.href = '#';
      newPage.setAttribute('class', 'pagination-page');
      newPage.textContent = i + 1;
      newPage.setAttribute('onclick', 'ToPage(this)');
      pags.insertBefore(newPage, pags.lastElementChild);
    }
    selectedPage = 0;
  }
}

//Пересчитать видимость в зависимости от пагинации и группировки
function Recalculate() {
  let items = document.querySelector('.content').children;
  if (selectedTypes.length != 0) {
    let j = 0;
    for (let i = 0; i < items.length - 1; i++) {
      if (selectedTypes.includes(productList[items[i].children[5].id].type)) {
        if (
          j >= quantityPerPage * selectedPage &&
          j < quantityPerPage * (selectedPage + 1)
        ) {
          items[i].hidden = false;
        } else {
          items[i].hidden = true;
        }
        j++;
      } else items[i].hidden = true;
    }
  } else {
    for (let i = 0; i < items.length - 1; i++) {
      if (
        i >= quantityPerPage * selectedPage &&
        i < quantityPerPage * (selectedPage + 1)
      ) {
        items[i].hidden = false;
      } else {
        items[i].hidden = true;
      }
    }
  }
}
//___________________

function Grouping() {
  selectedTypes = [];
  let group = document.querySelector('.grouping');
  for (let i = 0; i < group.children.length; i++) {
    if (group.children[i].firstElementChild.checked == true) {
      selectedTypes.push(group.children[i].firstElementChild.value);
    }
  }
  RecalcButtons();
  Recalculate();
}

const createSizeOption = () => {
  AllSize.forEach(item => {
    let sizeSelect = document.querySelector('#size-select');
    let newOption = document.createElement('option');
    newOption.setAttribute('class', 'create-option');
    newOption.value = item;
    newOption.textContent = item;
    sizeSelect.appendChild(newOption);
  });
};

const init = () => {
  createSizeOption();
};

//Инициализировать документ
function render() {
  CreateCards();

  let types = new Set();
  for (let i = 0; i < productList.length; i++) {
    types.add(productList[i].type);
  }

  let group = document.querySelector('.grouping');
  for (let t of types) {
    let newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.id = t;
    newCheckbox.value = t;
    newCheckbox.setAttribute('onclick', 'Grouping()');

    let newLabel = document.createElement('label');
    newLabel.setAttribute('for', t);
    newLabel.textContent = ' ' + t;

    let newP = document.createElement('p');
    newP.setAttribute('class', 'groupingCheckbox');
    newP.appendChild(newCheckbox);
    newP.appendChild(newLabel);

    group.appendChild(newP);
  }
  Sort();
  RecalcButtons();
  Recalculate();
}

const clearPage = () => {
  document.querySelectorAll('.card').forEach(e => e.remove());
  document.querySelectorAll('.groupingCheckbox').forEach(e => e.remove());
};

const refreshCards = () => {
  let gropingByPrice;
  console.log(typeof groupingObject.max);

  if (
    typeof groupingObject.max !== 'number' &&
    typeof groupingObject.min !== 'number'
  ) {
    gropingByPrice = mainProductList;
  } else if (typeof groupingObject.max == 'number') {
    gropingByPrice = mainProductList.filter(
      item => item.price <= groupingObject.max
    );
  } else if (typeof groupingObject.min == 'number') {
    gropingByPrice = mainProductList.filter(
      item => item.price >= groupingObject.min
    );
  } else {
    gropingByPrice = mainProductList.filter(
      item =>
        item.price >= groupingObject.min && item.price <= groupingObject.max
    );
  }

  if (groupingObject.size === 'All') {
    productList = gropingByPrice;
  } else {
    productList = gropingByPrice.filter(
      item => item.size === groupingObject.size
    );
  }

  clearPage();
  render();
  RecalcButtons();
  Recalculate();
};

//Сбросить фильтры
function ResetFilters() {
  let group = document.querySelector('.grouping');
  for (let i = 0; i < group.children.length; i++) {
    group.children[i].firstElementChild.checked = false;
  }

  document.querySelector('#to').value = '';
  document.querySelector('#from').value = '';
  document.querySelector('#defoult-select').selected = true;

  groupingObject = { size: 'All', max: null, min: null };

  Grouping();
  refreshCards();
}
