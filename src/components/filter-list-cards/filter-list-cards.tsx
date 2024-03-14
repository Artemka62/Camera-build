import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUrlParams } from '../../utils';
import { AppRoute, DEFAULT_NULL, DEFAULT_UNIT, ParamFilter } from '../../src-const';
import { OfferCard } from '../../type/type-store';

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
  const isMaxPrice = urlParam.get(ParamFilter.PriceMax) === null;
  const isMinPrice = urlParam.get(ParamFilter.PriceMin) === null;
  const urlMinPrice = urlParam.get(ParamFilter.PriceMin);
  const urlMaxPrice = urlParam.get(ParamFilter.PriceMax);
  const minPriceOffers = dataPriceMinMax.reduce((min, offer) => offer.price < min ? offer.price : min, dataPriceMinMax[DEFAULT_NULL]?.price) || '';
  const maxPriceOffers = dataPriceMinMax.reduce((max, offer) => offer.price > max ? offer.price : max, dataPriceMinMax[DEFAULT_NULL]?.price) || '';
  const [minPrice, setMinPrice] = useState(minPriceOffers);
  const [maxPrice, setMaxPrice] = useState(maxPriceOffers);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setMinPrice(minPriceOffers);
      setMaxPrice(maxPriceOffers);
    }

    return () => {
      isMounted = false;
    };
  }, [offers]);

  useEffect(() => {
    let isMounted = true;

    if(refInputMin.current && refInputMax.current && isMounted) {
      refInputMin.current.value = urlMinPrice || '';
      refInputMax.current.value = urlMaxPrice || '';
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if(isMaxPrice && isMinPrice && refInputMin.current && refInputMax.current && isMounted) {
      refInputMin.current.value = '';
      refInputMax.current.value = '';
    }

    return () => {
      isMounted = false;
    };
  },[isMaxPrice , isMinPrice]);

  function getValidFilter (filter: string) {
    const isValidFilter = urlParam.get(filter);

    return isValidFilter !== null;
  }

  function setActualUrlAndCheckBox (nameFilter: string) {
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

      delete actualUrl[ParamFilter.PriceMin];
      delete actualUrl[ParamFilter.PriceMax];
    }

    actualUrl[AppRoute.Page] = DEFAULT_UNIT.toString();
    setUrlParam(actualUrl);
  }

  function handleChangeCheckbox (event: ChangeEvent<HTMLInputElement>) {
    const nameFilter = event.target.name;

    setActualUrlAndCheckBox(nameFilter);
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
    delete actualUrl[ParamFilter.PriceMin];
    delete actualUrl[ParamFilter.PriceMax];

    if(refInputMin.current && refInputMax.current){
      refInputMin.current.value = '';
      refInputMax.current.value = '';
    }

    actualUrl[AppRoute.Page] = DEFAULT_UNIT.toString();
    setUrlParam(actualUrl);
  }

  function setMaxPriceValidation (name: string) {
    actualUrl[name] = maxPrice.toString();

    if(refInputMax.current){
      refInputMax.current.value = maxPrice.toString();
    }

    setUrlParam(actualUrl);
  }

  function setMinPriceValidation (name: string) {
    actualUrl[name] = minPrice.toString();

    if(refInputMin.current) {
      refInputMin.current.value = minPrice.toString();
    }

    setUrlParam(actualUrl);
  }

  function setUrlAndInput (price: string, name: string) {
    if(refInputMin.current && refInputMax.current) {
      if(name === ParamFilter.PriceMax && +price < +refInputMin.current.value && refInputMax.current.value !== '') {
        actualUrl[name] = refInputMin.current.value;
        refInputMax.current.value = refInputMin.current.value ;
        setUrlParam(actualUrl);

        return;
      }

      if(name === ParamFilter.PriceMin && +price > +refInputMax.current.value && refInputMax.current.value !== '') {
        setMinPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMin && price === ''){
        setMinPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMin && +price < DEFAULT_NULL) {
        setMinPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMin && +price < +minPrice) {
        setMinPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMin && +price === DEFAULT_NULL) {
        setMinPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMin && +price > +maxPrice) {
        setMinPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMin && +price <= +maxPrice) {
        actualUrl[name] = refInputMin.current.value;
        setUrlParam(actualUrl);

        return;
      }

      if(name === ParamFilter.PriceMax && price === ''){
        setMaxPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMax && +price < DEFAULT_NULL) {
        setMaxPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMax && +price > +maxPrice) {
        setMaxPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMax && +price === DEFAULT_NULL) {
        setMaxPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMax && +price < +minPrice) {
        setMaxPriceValidation(name);

        return;
      }

      if(name === ParamFilter.PriceMax && +price <= +maxPrice) {
        actualUrl[name] = refInputMax.current.value;
        setUrlParam(actualUrl);
      }
    }
  }

  function handleClickInputBlur (event: React.ChangeEvent<HTMLInputElement>) {
    const nameInput = event.target.name;
    const valueInput = event.target.value;

    setUrlAndInput(valueInput, nameInput);
  }

  function handlePressKeyDown (event: React.KeyboardEvent<HTMLInputElement>) {
    if(event.key === 'Enter') {
      event.preventDefault();

      const nameInput = event.currentTarget.name;
      const valueInput = event.currentTarget.value;

      setUrlAndInput(valueInput, nameInput);
    }

    if(event.currentTarget.type === 'checkbox' && event.key === 'Enter'){
      setActualUrlAndCheckBox(event.currentTarget.name);
    }
  }

  function checkButtonResetDisabled () {
    const values = Object.values(ParamFilter);
    let isDisabled = true;

    values.forEach((value: string) => {
      if (urlParam.get(value) !== null) {
        isDisabled = false;
      }
    });

    return isDisabled;
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
                    onBlur={handleClickInputBlur}
                    onKeyDown={handlePressKeyDown}
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
                    onBlur={handleClickInputBlur}
                    onKeyDown={handlePressKeyDown}
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
                  onKeyDown={handlePressKeyDown}
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
                  onKeyDown={handlePressKeyDown}
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
                  onKeyDown={handlePressKeyDown}
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
                  onKeyDown={handlePressKeyDown}
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
                  onKeyDown={handlePressKeyDown}
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
                  onKeyDown={handlePressKeyDown}
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
                  onKeyDown={handlePressKeyDown}
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
                  onKeyDown={handlePressKeyDown}
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
                  onKeyDown={handlePressKeyDown}
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
            disabled={checkButtonResetDisabled()}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export{FilterListCardsComponent};
