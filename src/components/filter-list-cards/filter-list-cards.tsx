import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUrlParams } from '../../utils/utils-grt-url';

function FilterListCardsComponent () {
  const ParamFilter = {
    PhotoCamera: 'photocamera',
    VideoCamera: 'videocamera',
    Digital: 'digital',
    Film: 'film',
    SnapShot: 'snapshot',
    Collection: 'collection',
    Zero :'zero',
    NonProfessional :'non-professional',
    Professional: 'professional'
  } as const;

  const [urlParam, setUrlParam] = useSearchParams();


  function getValidFilter (filter: string) {
    const isValidFilter = urlParam.get(filter);

    return isValidFilter !== null;
  }


  function handleChangeCheckbox (event: ChangeEvent<HTMLInputElement>) {
    const actualUrl = getUrlParams(urlParam);
    const nameFilter = event.target.name;

    switch (event.target.name) {
      case(ParamFilter.PhotoCamera): {
        actualUrl[nameFilter] = ParamFilter.PhotoCamera;
        break;
      }
      case(ParamFilter.VideoCamera): {
        actualUrl[nameFilter] = ParamFilter.VideoCamera;
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

    setUrlParam(actualUrl);
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
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder="до"
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
            type="reset"
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export{FilterListCardsComponent};
