import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUrlParams } from '../../utils/utils-grt-url';
import { ParamFilter } from '../../src-const';
import { OfferCard } from '../../types/types-store';

type FilterListCardsProps = {
  offers: OfferCard[] | [];
  dataPriceMinMax: OfferCard[];
}

function FilterListCardsComponent ({offers, dataPriceMinMax}: FilterListCardsProps) {
  const [urlParam, setUrlParam] = useSearchParams();
  const isDisabledFilter = urlParam.get(ParamFilter.VideoCamera) !== null;
  const actualUrl = getUrlParams(urlParam);
  const refInputMin = useRef<HTMLInputElement>(null);
  const refInputMax = useRef<HTMLInputElement>(null);
  const isMaxPrice = urlParam.get('priceMax') === null;
  const isMinPrice = urlParam.get('priceMin') === null;
  const urlMinPrice = urlParam.get('priceMin');
  const urlMAxPrice = urlParam.get('priceMax');
  const minPriceOffers = dataPriceMinMax.reduce((min, offer) => offer.price < min ? offer.price : min, dataPriceMinMax[0]?.price) || '';
  const maxPriceOffers = dataPriceMinMax.reduce((max, offer) => offer.price > max ? offer.price : max, dataPriceMinMax[0]?.price) || '';
  const [minPrice, setMinPrice] = useState(minPriceOffers);
  const [maxPrice, setMaxPrice] = useState(maxPriceOffers);

  useEffect(() => {
    setMinPrice(minPriceOffers);
    setMaxPrice(maxPriceOffers);
  }, [offers]);

  useEffect(() => {
    if(refInputMin.current && refInputMax.current) {
      refInputMin.current.value = urlMinPrice || '';
      refInputMax.current.value = urlMAxPrice || '';
    }
  }, []);

  useEffect(() => {
    if(isMaxPrice && isMinPrice && refInputMin.current && refInputMax.current) {
      refInputMin.current.value = '';
      refInputMax.current.value = '';
    }
  },[isMaxPrice , isMinPrice]);


  function getValidFilter (filter: string) {
    const isValidFilter = urlParam.get(filter);

    return isValidFilter !== null;
  }

  function handleChangeCheckbox (event: ChangeEvent<HTMLInputElement>) {
    const nameFilter = event.target.name;

    switch (nameFilter) {
      case(ParamFilter.PhotoCamera): {
        actualUrl[nameFilter] = ParamFilter.PhotoCamera;
        delete actualUrl[ParamFilter.VideoCamera];

        break;
      }
      case(ParamFilter.VideoCamera): {
        actualUrl[nameFilter] = ParamFilter.VideoCamera;
        delete actualUrl[ParamFilter.PhotoCamera];
        delete actualUrl[ParamFilter.SnapShot];
        delete actualUrl[ParamFilter.Film];

        break;
      }
      case(ParamFilter.Digital): {
        actualUrl[nameFilter] = ParamFilter.Digital;
        break;
      }
      case(ParamFilter.Film): {
        actualUrl[nameFilter] = ParamFilter.Film;
        break;
      }
      case(ParamFilter.SnapShot): {
        actualUrl[nameFilter] = ParamFilter.SnapShot;
        break;
      }
      case(ParamFilter.Collection): {
        actualUrl[nameFilter] = ParamFilter.Collection;
        break;
      }
      case(ParamFilter.Zero): {
        actualUrl[nameFilter] = ParamFilter.Zero;
        break;
      }
      case(ParamFilter.NonProfessional): {
        actualUrl[nameFilter] = ParamFilter.NonProfessional;
        break;
      }
      case(ParamFilter.Professional): {
        actualUrl[nameFilter] = ParamFilter.Professional;
        break;
      }
    }

    if(urlParam.get(nameFilter) !== null){
      delete actualUrl[nameFilter];
    }

    if(refInputMin.current && refInputMax.current){
      refInputMin.current.value = '';
      refInputMax.current.value = '';

      delete actualUrl['priceMin'];
      delete actualUrl['priceMax'];
    }

    actualUrl['page'] = '1';

    setUrlParam(actualUrl);
  }

  function handleClickResetFilter () {
    delete actualUrl[ParamFilter.VideoCamera];
    delete actualUrl[ParamFilter.PhotoCamera];
    delete actualUrl[ParamFilter.SnapShot];
    delete actualUrl[ParamFilter.Film];
    delete actualUrl[ParamFilter.Digital];
    delete actualUrl[ParamFilter.NonProfessional];
    delete actualUrl[ParamFilter.Professional];
    delete actualUrl[ParamFilter.Zero];
    delete actualUrl[ParamFilter.Collection];
    delete actualUrl['priceMin'];
    delete actualUrl['priceMax'];

    if(refInputMin.current && refInputMax.current){
      refInputMin.current.value = '';
      refInputMax.current.value = '';
    }

    setUrlParam(actualUrl);
  }

  function setMaxPriceValidation (name: string) {
    actualUrl[name] = maxPrice.toString();
    if(refInputMin.current && refInputMax.current){
      refInputMax.current.value = maxPrice.toString();
      setUrlParam(actualUrl);
    }
  }

  function setMinPriceValidation (name: string) {
    actualUrl[name] = minPrice.toString();

    if(refInputMin.current && refInputMax.current) {
      refInputMin.current.value = minPrice.toString();
    }

    setUrlParam(actualUrl);
  }

  function setUrlAndInput (price: string, name: string) {
    if(refInputMin.current && refInputMax.current) {

      if(name === 'priceMax' && +price < +refInputMin.current.value && refInputMax.current.value !== '') {
        setMaxPriceValidation(name);

        return;
      }

      if(name === 'priceMin' && +price > +refInputMax.current.value && refInputMax.current.value !== '') {
        setMinPriceValidation(name);

        return;
      }

      if(name === 'priceMin' && price === ''){
        delete actualUrl['priceMin'];
        setUrlParam(actualUrl);

        return;
      }

      if(name === 'priceMin' && +price < 0) {
        setMinPriceValidation(name);

        return;
      }

      if(name === 'priceMin' && +price < +minPrice) {
        setMinPriceValidation(name);

        return;
      }

      if(name === 'priceMin' && +price === 0) {
        setMinPriceValidation(name);

        return;
      }

      if(name === 'priceMin' && +price > +maxPrice) {
        setMinPriceValidation(name);

        return;
      }

      if(name === 'priceMin' && +price <= +maxPrice) {
        actualUrl[name] = refInputMin.current.value;
        setUrlParam(actualUrl);

        return;
      }

      if(name === 'priceMax' && price === ''){
        delete actualUrl['priceMax'];
        setUrlParam(actualUrl);

        return;
      }

      if(name === 'priceMax' && +price < 0) {
        setMaxPriceValidation(name);

        return;
      }

      if(name === 'priceMax' && +price > +maxPrice) {
        setMaxPriceValidation(name);

        return;
      }

      if(name === 'priceMax' && +price === 0) {
        setMaxPriceValidation(name);

        return;
      }

      if(name === 'priceMax' && +price < +minPrice) {
        setMaxPriceValidation(name);

        return;
      }

      if(name === 'priceMax' && +price <= +maxPrice) {
        actualUrl[name] = refInputMax.current.value;
        setUrlParam(actualUrl);
      }
    }
  }

  function handleInputBlur (event: React.ChangeEvent<HTMLInputElement>) {
    const nameInput = event.target.name;
    const valueInput = event.target.value;

    setUrlAndInput(valueInput, nameInput);
  }

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    ref={refInputMin}
                    type="number"
                    name="priceMin"
                    placeholder={`${minPrice}`}
                    onBlur={handleInputBlur}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    ref={refInputMax}
                    type="number"
                    name="priceMax"
                    placeholder={`${maxPrice}`}
                    onBlur={handleInputBlur}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="photocamera"
                  onChange={handleChangeCheckbox}
                  checked={getValidFilter(ParamFilter.PhotoCamera)}

                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Фотокамера
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="videocamera"
                  onChange={handleChangeCheckbox}
                  checked={getValidFilter(ParamFilter.VideoCamera)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Видеокамера
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="digital"
                  onChange={handleChangeCheckbox}
                  checked={getValidFilter(ParamFilter.Digital)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="film"
                  onChange={handleChangeCheckbox}
                  checked={getValidFilter(ParamFilter.Film)}
                  disabled={isDisabledFilter}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Плёночная
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="snapshot"
                  onChange={handleChangeCheckbox}
                  checked={getValidFilter(ParamFilter.SnapShot)}
                  disabled={isDisabledFilter}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Моментальная
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="collection"
                  onChange={handleChangeCheckbox}
                  checked={getValidFilter(ParamFilter.Collection)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Коллекционная
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="zero"
                  onChange={handleChangeCheckbox}
                  checked={getValidFilter(ParamFilter.Zero)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="non-professional"
                  onChange={handleChangeCheckbox}
                  checked={getValidFilter(ParamFilter.NonProfessional)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Любительский
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="professional"

                  onChange={handleChangeCheckbox}
                  checked={getValidFilter(ParamFilter.Professional)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Профессиональный
                </span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="button"
            onClick={handleClickResetFilter}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export{FilterListCardsComponent};
