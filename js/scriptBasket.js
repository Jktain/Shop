class Basket {
  constructor() {
    this.basketRecord = [];
    this.totalCost = 0;
    this.totalQuantity = 0;
  }

  RecalculateTotal(table, quantity) {
    table.lastElementChild.firstElementChild.children[2].textContent = this.totalCost;
    table.lastElementChild.firstElementChild.children[3].textContent = this.totalQuantity;
  }

  AddProduct(link) {
    link = +link;

    let name = productList[link].head;
    let price = productList[link].price;
    let count = 1;

    this.totalCost += price;
    this.totalQuantity++;

    document.getElementById('basketInformation').textContent =
      'В кошику: ' + this.totalQuantity + ' товарів';

    for (let i = 0; i < this.basketRecord.length; i++) {
      if (
        this.basketRecord[i].name == name &&
        this.basketRecord[i].price == price
      ) {
        this.basketRecord[i].count++;
        let table = document.querySelector('.myTable');
        table.children[2].children[
          i
        ].children[3].textContent = this.basketRecord[i].count;
        this.RecalculateTotal(table);
        return;
      }
    }
    this.basketRecord.push({ name, price, count });

    let basketDiv = document.getElementById('basketTable');
    if (basketDiv.children.length == 1) {
      let newTable = document.createElement('table');
      newTable.setAttribute('class', 'myTable');
      newTable.innerHTML =
        "<caption>Вміст кошика</caption><thead><tr><th width='5%'>&nbsp;</th><th width='42%'>Товар</th><th width='18%'>Вартість</th><th width='17%'>&nbsp;</th></tr></thead>";

      let newTbody = document.createElement('tbody');
      newTbody.innerHTML =
        '<tr><td>1.</td><td>' +
        name +
        '</td><td>' +
        price +
        "</td><td> </td><td><button class='mybtn2' onclick=basket.MinusOne(0)>видалити</button></td></tr>";
      newTable.appendChild(newTbody);

      let newTfoot = document.createElement('tfoot');
      newTfoot.innerHTML =
        '<tr><td></td><td>Всього:</td><td>' +
        this.totalCost +
        '</td><td>1</td><td></td></tr>';
      newTable.appendChild(newTfoot);

      basketDiv.replaceChild(newTable, basketDiv.children[0]);

      let newP = document.createElement('p');
      newP.innerHTML =
        "<button class='mybtn2'>Купити</button><button class='mybtn2' onclick=basket.Clear()>Очистити кошик</button>";
      basketDiv.appendChild(newP);
    } else {
      let table = document.querySelector('.myTable');

      let newTr = document.createElement('tr');
      newTr.innerHTML =
        '<td>' +
        (table.children[2].children.length + 1) +
        '.</td><td>' +
        name +
        '</td><td>' +
        price +
        "</td><td> </td><td></button><button class='mybtn2' onclick=basket.MinusOne(" +
        (this.basketRecord.length - 1) +
        ')>видалити</button></td>';

      table.children[2].appendChild(newTr); //insertBefore(newTr, table.lastElementChild);
      this.RecalculateTotal(table);
    }
  }
  
  //Удалить один товар
  MinusOne(i) {
    this.basketRecord[i].count--;
    this.totalCost -= this.basketRecord[i].price;
    this.totalQuantity--;
    document.getElementById('basketInformation').textContent =
      'В кошику: ' + this.totalQuantity + ' товарів';
    if (this.basketRecord.length == 1 && this.basketRecord[i].count == 0)
      this.Clear();
    else {
      let table = document.querySelector('.myTable');

      if (this.basketRecord[i].count > 0)
        table.children[2].children[
          i
        ].children[3].textContent = this.basketRecord[i].count;
      else {
        this.basketRecord.splice(i, 1);
        table.children[2].removeChild(table.children[2].children[i]);
        for (let j = i; j < table.children[2].children.length; j++) {
          table.children[2].children[j].children[0].textContent = j + 1 + '.';
          table.children[2].children[
            j
          ].children[4].firstElementChild.setAttribute(
            'onclick',
            'basket.PlusOne(' + j + ')'
          );
          table.children[2].children[
            j
          ].children[4].lastElementChild.setAttribute(
            'onclick',
            'basket.MinusOne(' + j + ')'
          );
        }
      }

      this.RecalculateTotal(table);
    }
  }

  //Очистить корзину
  Clear() {
    this.basketRecord = [];
    this.totalCost = 0;
    this.totalQuantity = 0;
    document.getElementById('basketInformation').textContent =
      'В кошику: 0 товарів';

    let basketDiv = document.getElementById('basketTable');
    while (basketDiv.firstChild) {
      basketDiv.removeChild(basketDiv.firstChild);
    }
    let basketHeading = document.createElement('h1');
    basketHeading.textContent = 'Кошик пустий.';
    basketDiv.appendChild(basketHeading);
  }
}

const basket = new Basket();

//Перейти на Main
function ShowMain() {
  document.getElementById('mainD').style.display = 'flex';
  document.getElementById('basketD').style.display = 'none';
}

//Перейти на Basket
function ShowBasket() {
  document.getElementById('mainD').style.display = 'none';
  document.getElementById('basketD').style.display = 'flex';
}

document.addEventListener('keydown', function (event) {
  switch (event.code) {
    case 'KeyQ':
      ShowMain();
      break;
    case 'KeyW':
      ShowBasket();
      break;
    case 'Digit1':
      ToStart();
      break;
    case 'Digit2':
      if (--selectedPage < 0) selectedPage = 0;
      Recalculate();
      break;
    case 'Digit3':
      if (++selectedPage > lastPage) selectedPage = lastPage;
      Recalculate();
      break;
    case 'Digit4':
      ToEnd();
      break;
  }
});
