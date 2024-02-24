import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useRef } from 'react';
import { ParamSort, SortId, SortName } from '../../src-const';
import { getUrlParams } from '../../utils/utils-grt-url';

function SortListCardsComponent () {
  const [urlParam, setUrlParam] = useSearchParams();
  const sortType = urlParam.get(ParamSort.Sort);
  const sortIcoType = urlParam.get(ParamSort.Rotation);
  const inputRefPrice = useRef<HTMLInputElement>(null);
  const inputRefPopular = useRef<HTMLInputElement>(null);
  const inputRefUp = useRef<HTMLInputElement>(null);
  const inputRefDown = useRef<HTMLInputElement>(null);

  function setUrlSort (name: string, id: string) {
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

  function handleClickSort (event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const id = event.target.id;

    setUrlSort(name, id);
  }

  function deleteFocusInput (id: string) {
    if(inputRefDown.current && inputRefPopular.current && inputRefPrice.current && inputRefUp.current){
      switch(id) {
        case (inputRefDown.current.id): {
          inputRefDown.current.blur();
          break;
        }
        case (inputRefPopular.current.id): {
          inputRefPopular.current.blur();
          break;
        }
        case (inputRefPrice.current.id): {
          inputRefPrice.current.blur();
          break;
        }
        case (inputRefUp.current.id): {
          inputRefUp.current.blur();
        }
      }
    }
  }

  function handleKeyDownSort (event: React.KeyboardEvent<HTMLInputElement>) {
    const id = event.currentTarget.id;

    if(event.key === 'Enter') {
      event.preventDefault();

      deleteFocusInput(id);
    }
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
                onKeyDown={handleKeyDownSort}
                ref={inputRefPrice}
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
                onKeyDown={handleKeyDownSort}
                ref={inputRefPopular}
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
                onKeyDown={handleKeyDownSort}
                ref={inputRefDown}
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
                onKeyDown={handleKeyDownSort}
                ref={inputRefUp}
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
