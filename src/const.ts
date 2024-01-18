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
 // OffersFavorite = '/favorite',
  //Comments = '/comments',
  //Login = '/login',
 // Logout = '/logout'
 }


enum TitleDescription {
  MainPage = 'Camera Shop',
  ProductPage = 'Camera Shop: product',
  BasketPage = 'Camera Shop: basket',
  ErrorPage = '6 cities: error'
}

export{URL_SERVER, REQUEST_TIMEOUT, AppRoute, ApiRoute, TitleDescription};
