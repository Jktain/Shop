//Класс товары
class Product {
  constructor(head, image, price, presence, text, type) {
    this.head = head;
    this.image = image;
    this.price = price;
    this.presence = presence;
    this.text = text;
    this.type = type;
  }

  Init(i) {
    let newImage = document.createElement('img');
    newImage.setAttribute('class', 'image');
    newImage.src = this.image;
    newImage.alt = this.head;

    let newCardImage = document.createElement('div');
    newCardImage.setAttribute('class', 'card-image');
    newCardImage.appendChild(newImage);

    let newCardHead = document.createElement('h2');
    newCardHead.setAttribute('class', 'card-head');
    newCardHead.textContent = this.head;

    let newCardPrice = document.createElement('p');
    newCardPrice.setAttribute('class', 'card-price');
    newCardPrice.setAttribute('data-price', this.price);
    newCardPrice.textContent = this.price + '$';

    let newCardPresence = document.createElement('p');
    if (this.presence > 0) {
      newCardPresence.setAttribute('class', 'card-presence well');
      newCardPresence.textContent = '                                        ';
    } else {
      newCardPresence.setAttribute('class', 'card-presence badly');
      newCardPresence.textContent = '                                       ';
    }

    let newCardText = document.createElement('p');
    newCardText.setAttribute('class', 'card-text');
    newCardText.textContent = this.text;

    let newCardButton = document.createElement('button');
    newCardButton.setAttribute('class', 'mybtn1');
    newCardButton.setAttribute('onclick', 'basket.AddProduct(this.id)');
    newCardButton.textContent = 'Додати в кошик';
    newCardButton.id = i;

    let newCard = document.createElement('div');
    newCard.setAttribute('class', 'card');

    newCard.appendChild(newCardImage);
    newCard.appendChild(newCardHead);
    newCard.appendChild(newCardPrice);
    newCard.appendChild(newCardPresence);
    newCard.appendChild(newCardText);
    newCard.appendChild(newCardButton);

    return newCard;
  }

  toString() {
    return (
      this.head +
      ' ' +
      this.image +
      ' ' +
      this.price +
      ' ' +
      this.presence +
      ' ' +
      this.text +
      ' ' +
      this.type
    );
  }
}
