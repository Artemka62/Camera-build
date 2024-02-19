import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ButtonChangePage } from '../button-change-page/button-change-page';
import { useEffect } from 'react';
import { AppRoute, ButtonName, DEFAULT_NULL, DEFAULT_UNIT, MAX_LENGTH_CARDS, PAGES_PER_SET} from '../../src-const';
import { useAppSelector } from '../../hooks/hook-use-store';

import { getUrlParams } from '../../utils/utils-grt-url';

type PaginationMainPageComponentProps = {
  offersPerPages: number;
  totalOffers: number;
  currentPage: number;
};

function PaginationMainPageComponent({offersPerPages, totalOffers, currentPage}: PaginationMainPageComponentProps) {
  const navigate = useNavigate();
  const quantityPages = Math.ceil(totalOffers / offersPerPages);
  const pageNumbers = Array.from({ length: quantityPages }, (_, i) => i + DEFAULT_UNIT);
  const pagesPerSet = PAGES_PER_SET;
  const currentPageSet = Math.ceil(currentPage / pagesPerSet);
  const startPage = (currentPageSet - DEFAULT_UNIT) * pagesPerSet + DEFAULT_UNIT;
  const endPage = Math.min(currentPageSet * pagesPerSet, quantityPages);
  const stateOffers = useAppSelector((state) => state.offers.offers);
  const isPageReel = currentPage > DEFAULT_NULL && currentPage <= Math.ceil(stateOffers.length / MAX_LENGTH_CARDS);
  const [urlParam] = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {

      if(!isPageReel && isMounted) {
        return navigate(AppRoute.Error);
      }
    }

    return () => {
      isMounted = false;
    };
  },[currentPage, endPage]);

  return (
    <div className="pagination" data-testid='pagination-main-page'>
      <ul className="pagination__list">
        {currentPageSet > DEFAULT_UNIT && (
          <ButtonChangePage
            nameButton={ButtonName.BackEn}
            lastPage={startPage}
          />
        )}
        {pageNumbers.slice(startPage - DEFAULT_UNIT, endPage).map((number) => (
          <li key={number} className="pagination__item" >
            <Link
              to={{
                search: createSearchParams({
                  ...getUrlParams(urlParam),
                  ['page']: number.toString(),
                }).toString(),
              }}
              className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}
            >
              {number}
            </Link >
          </li>
        ))}
        {currentPageSet * pagesPerSet < quantityPages && (
          <ButtonChangePage
            nameButton={ButtonName.NextEn}
            lastPage={endPage}
          />
        )}
      </ul>
    </div>
  );
}

export { PaginationMainPageComponent };
