const URL_SERVER = 'https://camera-shop.accelerator.htmlacademy.pro/';
const REQUEST_TIMEOUT = 5000;
const DEFAULT_UNIT = 1;
const DEFAULT_NULL = 0;
const PAGES_PER_SET = 3;
const MAX_LENGTH_CARDS = 9;
const DELAY_FOR_BANNER = 3000;
const START_NUMBER_REVIEWS = 3;
const DELAY_FOCUS = 300;
const SLIDE_COUNT = 3;
const CHANGE_PAGE = 'POP';
const COUNT_SEARCH = 3;
const DELAY_NOTIFY = 400;
const KEY_LOCAL_STORAGE = 'myBasketProduct';

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
  Error = '/error',
  Characteristic = '/characteristic',
  Description = '/description',
  Page = 'page'
}

enum ApiRoute {
  Offers = '/cameras',
  OffersPromo = '/promo',
  ReviewsProduct = '/reviews',
  Similar = '/similar',
  Coupon = 'coupons'
 }

enum TitleDescription {
  MainPage = 'Каталог - Фотошоп',
  ProductPage = 'Продукт - Фотошоп',
  BasketPage = 'Корзина - Фотошоп',
  ErrorPage = 'Camera Shop: error'
}

const SettingTab = {
  Description: 'description',
  Characteristic: 'characteristic'
} as const;

const SettingValidation = {
  RatingMin: 1,
  RatingMax: 5,
  RatingMessage: 'Минимальное значение 1, максимальное 5',
  UserNameMin: 2,
  UserNameMax: 15,
  UserMessageValidation: 'От 2 до 15 символов',
  UserMessageRequired: 'Нужно указать имя',
  UserTextMin: 10,
  UserTextMax: 160,
  UserTextMessage: 'От 10 до 160 символов',
  UserTextPlus: 'Нужно указать достоинства',
  UserTextMinus: 'Нужно указать недостатки',
  UserComment: 'Нужно добавить комментарий',
  ErrorMessage: 'Ошибка'
} as const;

const ServerAnswer = {
  Error: 400,
  Created: 201,
  Ok: 200
} as const;

const SortName = {
  PriceRating: 'sort',
  UpDown: 'sort-icon'
} as const;

const SortId = {
  Price: 'sortPrice',
  Popular: 'sortPopular',
  Up: 'up',
  Down:'down'
} as const;

const ParamFilter = {
  PhotoCamera: 'photocamera',
  VideoCamera: 'videocamera',
  Digital: 'digital',
  Film: 'film',
  SnapShot: 'snapshot',
  Collection: 'collection',
  Zero :'zero',
  NonProfessional :'non-professional',
  Professional: 'professional',
  PriceMin: 'priceMin',
  PriceMax: 'priceMax'
} as const;

const ParamFilterRu = {
  PhotoCamera: 'Фотоаппарат',
  VideoCamera: 'Видеокамера',
  Digital: 'Цифровая',
  Film: 'Плёночная',
  SnapShot: 'Моментальная',
  Collection: 'Коллекционная',
  Zero :'Нулевой',
  NonProfessional :'Любительский',
  Professional: 'Профессиональный',
} as const;

const ParamSort = {
  Sort: 'sort',
  Rotation: 'rotation'
} as const;

const ButtonName = {
  NextEn: 'next',
  NextRu: 'Далее',
  BackEn:'back',
  BackRu:'Назад'
} as const;

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
  SLIDE_COUNT,
  CHANGE_PAGE,
  COUNT_SEARCH,
  DELAY_NOTIFY,
  KEY_LOCAL_STORAGE ,
  AppRoute,
  ApiRoute,
  TitleDescription,
  SettingTab,
  SettingValidation,
  ServerAnswer,
  SortName,
  SortId,
  ParamFilter,
  ParamFilterRu,
  ParamSort,
  ButtonName
};
