import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { ParamSort, SortId, SortName } from '../../src-const';
import { getUrlParams } from '../../utils/utils-grt-url';

function SortListCardsComponent () {
  const [urlParam, setUrlParam] = useSearchParams();
  const sortType = urlParam.get(ParamSort.Sort);
  const sortIcoType = urlParam.get(ParamSort.Rotation);

  function handleClickSort (event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const id = event.target.id;
    const actualUrl = getUrlParams(urlParam);

    switch(name) {
      case (SortName.PriceRating): {
        actualUrl[ParamSort.Sort] = id;
        actualUrl[ParamSort.Rotation] = sortIcoType || SortId.Up;

        break;
      }
      case (SortName.UpDown): {
        actualUrl[ParamSort.Sort] = sortType || SortId.Price;
        actualUrl[ParamSort.Rotation] = id;

        break;
      }
    }

    setUrlParam(actualUrl);
  }

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortType === SortId.Price}
                onChange={handleClickSort}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                checked={sortType === SortId.Popular}
                name="sort"
                onChange={handleClickSort}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                checked={sortIcoType === SortId.Up}
                aria-label="По возрастанию"
                onChange={handleClickSort}
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={sortIcoType === SortId.Down}
                onChange={handleClickSort}
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export {SortListCardsComponent};
