import { OfferLocalStorage, StateCouponLocalStorage } from '../types/types-store';

function getLocalStorage <T>(key: string): T | undefined {
  const myStorage = localStorage.getItem(key);

  if(!myStorage) {
    return undefined;
  }

  return JSON.parse(myStorage) as T;
}


function setLocalStorage (key: string , data: OfferLocalStorage[] | StateCouponLocalStorage) {
  return localStorage.setItem(key, JSON.stringify(data));
}

export {getLocalStorage, setLocalStorage};
