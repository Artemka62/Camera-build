import { useSearchParams } from 'react-router-dom';

import { ChangeEvent } from 'react';

function SortListCardsComponent () {

  const [urlParam, setUrlParam] = useSearchParams();
  const currentPage = urlParam.get('page');
  const sortType = urlParam.get('sort');
  const sortIcoType = urlParam.get('rotation');


  function setUrl (name: string, value: string) {

    switch(name) {
      case 'sort': return `page=${currentPage || 1}&sort=${value}&rotation=${sortIcoType || ''}`;
      case 'sort-icon': return `page=${currentPage || 1}&sort=${sortType || ''}&rotation=${value}`;
    }
  }

  function handleClickSort (event: ChangeEvent<HTMLInputElement>) {

    //console.log(event.target.id);


    setUrlParam(setUrl(event.target.name, event.target.id));


    //console.log(urlParam.get('page'));
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
                defaultChecked
                onChange={handleClickSort}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
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
                defaultChecked
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
