const URL_SERVER = 'https://camera-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;

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

export{URL_SERVER, REQUEST_TIMEOUT, AppRoute, ApiRoute, TitleDescription};
