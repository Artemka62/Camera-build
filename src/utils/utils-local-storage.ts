//import { KEY_LOCAL_STORAGE } from '../src-const';
import { OfferCard, OfferLocalStorage } from '../types/types-store';

function getLocalStorage <T>(key: string): T | undefined {
  const myStorage = localStorage.getItem(key);

  if(!myStorage) {
    return undefined;
  }

  return JSON.parse(myStorage) as T;
}


function setLocalStorage (key: string , data: OfferLocalStorage[]) {
  return localStorage.setItem(key, JSON.stringify(data));
}


function addProductToBasket (key: string, offerBasket: OfferCard) {
  const myLocalStorage = getLocalStorage(key) as OfferLocalStorage[];

  if(offerBasket){
    const offerProductBasket: OfferLocalStorage = {
      count: 1,
      id: offerBasket.id,
      offer: offerBasket
    };

    myLocalStorage.push(offerProductBasket);
    setLocalStorage(key, myLocalStorage);
  }

  //localStorage.removeItem(KEY_LOCAL_STORAGE);
}

export {getLocalStorage, setLocalStorage, addProductToBasket};
