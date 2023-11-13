let currentSort = 0;
let selectedPage = 0;
let lastPage = 0;
let quantityPerPage = 8;
let mainProductList = [
  new Clothing(
    'Анімація виразу обличчя',
    'http://s9.pikabu.ru/post_img/big/2020/09/18/0/160037880811576124.png',
    40,
    1,
    'Лицьова анімація включає в себе не тільки вираз емоцій персонажа, але і артикуляцію',
    '3D анімації',
    '3D'
  ),
  new Clothing(
    '3D модель дракона',
    'https://cdn.pixabay.com/photo/2019/10/09/23/36/dragon-4538368_1280.png',
    30,
    1,
    'Ідеально підходить для фентезійних, рольових і підземельних ігор',
    '3D персонажі',
    '3D'
  ),
  new Clothing(
    'Баггі з гри PUBG',
    'http://scythgames.com/media/fb/uploads/2018/02/25/karol-miklas-1-3_NGNYcxg.jpg',
    100,
    1,
    'Модель баггі, створена Карлом Мікласом спеціально для гри PUBG',
    'Транспортні засоби',
    '3D'
  ),
  new Clothing(
    '2D моделі дівчини і хлопця',
    'https://content.freelancehunt.com/projectsnippet/bb130/01fd8/243928/pose.png',
    15,
    1,
    '2D персонажі для мобільного додатку',
    '2D персонажі',
    '2D'
  ),
  new Clothing(
    'Pixel Art Fonts',
    'https://assetstorev1-prd-cdn.unity3d.com/key-image/70283398-3cc9-4f6c-942c-9200c7a95632.webp',
    20,
    1,
    'Колекція з 8 унікальних шрифтів ручної роботи',
    '2D шрифти',
    '2D'
  ),
  new Clothing(
    '2D локація для інді гри',
    'https://i.pinimg.com/736x/00/4c/64/004c640a5a65821de948b29026a76aab.jpg',
    15,
    1,
    'Невеличка 2D локація для створення простої гри',
    '2D локації',
    '2D'
  ),
  new Clothing(
    'Проста система дорожнього руху',
    'https://springboard-cdn.appadvice.com/generated-app-plays/1104870991/231412736-half-thumb/00001.jpg',
    30,
    1,
    'Дозволяє швидко створювати маршрути, засновані на шляхових точках з допомогою ШІ',
    'Штучний інтелект',
    'Інструменти'
  ),
  new Clothing(
    'Інтерфейс магазину костюмів',
    'https://habrastorage.org/webt/rd/b5/w2/rdb5w2shpfimf08kbhfen-l_lqa.jpeg',
    60,
    1,
    'Створений для RPG інтерфейс магазину костюмів',
    'Інтерфейс',
    'Інструменти'
  ),
  new Clothing(
    'Фізика транспортних засобів',
    'https://i.ytimg.com/vi/7-9JZNzmkDM/maxresdefault.jpg',
    60,
    1,
    'Створений для ігрового процесу, простоти використання та реалістичної поведінки',
    'Фізика',
    'Інструменти'
  ),
];

let productList = mainProductList;
let groupingObject = { size: 'All', max: null, min: null };

let selectedTypes = [];

const AllSize = ['3D', '2D', 'Аудіо', 'Інструменти'];
