const URL_SERVER = 'https://camera-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;
const DEFAULT_UNIT = 1;
const DEFAULT_NULL = 0;
const PAGES_PER_SET = 3;
const MAX_LENGTH_CARDS = 9;
const DELAY_FOR_BANNER = 3000;

enum AppRoute {
  Main = '/',
  Product = '/product',
  Basket = '/basket',
  Error = '/error'
}

enum ApiRoute {
  Offers = '/cameras',
  OffersPromo = '/promo',
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
  AppRoute,
  ApiRoute,
  TitleDescription
};
