import { Link, createSearchParams, useSearchParams } from 'react-router-dom';
import { ButtonChangePage } from '../button-change-page/button-change-page';
import { AppRoute, ButtonName, DEFAULT_UNIT, PAGES_PER_SET} from '../../src-const';
import { getUrlParams } from '../../utils/utils-grt-url';

type PaginationMainPageComponentProps = {
  offersPerPages: number;
  totalOffers: number;
  currentPage: number;
};

function PaginationMainPageComponent({offersPerPages, totalOffers, currentPage}: PaginationMainPageComponentProps) {
  const quantityPages = Math.ceil(totalOffers / offersPerPages);
  const pageNumbers = Array.from({ length: quantityPages }, (_, i) => i + DEFAULT_UNIT);
  const pagesPerSet = PAGES_PER_SET;
  const currentPageSet = Math.ceil(currentPage / pagesPerSet);
  const startPage = (currentPageSet - DEFAULT_UNIT) * pagesPerSet + DEFAULT_UNIT;
  const endPage = Math.min(currentPageSet * pagesPerSet, quantityPages);
  const [urlParam] = useSearchParams();


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
                  [AppRoute.Page]: number.toString(),
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
