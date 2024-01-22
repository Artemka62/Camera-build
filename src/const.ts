const URL_SERVER = 'https://camera-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;
const DEFAULT_UNIT = 1;
const DEFAULT_NULL = 0;
const PAGES_PER_SET = 3;
const MAX_LENGTH_CARDS = 9;
const DELAY_FOR_BANNER = 3000;
const START_NUMBER_REVIEWS = 3;
const DELAY_FOCUS = 300;

const OPTIONS = [
  {label: 'Отлично', value: 5},
  {label: 'Хорошо', value: 4},
  {label: 'Нормально', value: 3},
  {label: 'Плохо', value: 2},
  {label: 'Ужасно', value: 1},
];


enum AppRoute {
  Main = '/',
  Product = '/product',
  Basket = '/basket',
  Error = '/error'
}

enum ApiRoute {
  Offers = '/cameras',
  OffersPromo = '/promo',
  ReviewsProduct = '/reviews'
 }


enum TitleDescription {
  MainPage = 'Каталог - Фотошоп',
  ProductPage = 'Продукт - Фотошоп',
  BasketPage = 'Корзина - Фотошоп',
  ErrorPage = 'Camera Shop: error'
}

export{
  URL_SERVER,
  REQUEST_TIMEOUT,
  DEFAULT_UNIT,
  DEFAULT_NULL,
  PAGES_PER_SET,
  MAX_LENGTH_CARDS,
  DELAY_FOR_BANNER,
  START_NUMBER_REVIEWS,
  OPTIONS,
  DELAY_FOCUS,
  AppRoute,
  ApiRoute,
  TitleDescription
};
