import { useNavigate } from 'react-router-dom';
import { ButtonChangePage } from '../button-change-page/button-change-page';
import { useEffect } from 'react';
import { AppRoute, ButtonName, DEFAULT_NULL, DEFAULT_UNIT, MAX_LENGTH_CARDS, PAGES_PER_SET } from '../../src-const';
import { useAppSelector } from '../../hooks/hook-use-store';

type PaginationMainPageComponentProps = {
  offersPerPages: number;
  totalOffers: number;
  onPaginationButtonClick: (number: number) => void;
  currentPage: number;
};

function PaginationMainPageComponent({offersPerPages, totalOffers, onPaginationButtonClick, currentPage}: PaginationMainPageComponentProps) {
  const navigate = useNavigate();
  const quantityPages = Math.ceil(totalOffers / offersPerPages);
  const pageNumbers = Array.from({ length: quantityPages }, (_, i) => i + DEFAULT_UNIT);
  const pagesPerSet = PAGES_PER_SET;
  const currentPageSet = Math.ceil(currentPage / pagesPerSet);
  const startPage = (currentPageSet - DEFAULT_UNIT) * pagesPerSet + DEFAULT_UNIT;
  const endPage = Math.min(currentPageSet * pagesPerSet, quantityPages);
  const stateOffers = useAppSelector((state) => state.offers.offers);
  const isPageReel = currentPage > DEFAULT_NULL && currentPage <= Math.ceil(stateOffers.length / MAX_LENGTH_CARDS);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      navigate(`${AppRoute.Page}${currentPage}`);
    }

    if(!isPageReel && isMounted) {
      navigate(AppRoute.Error);
    }

    return () => {
      isMounted = false;
    };
  },[currentPage]);

  function handleClickButton(numberPage: number) {
    onPaginationButtonClick(numberPage);
  }

  return (
    <div className="pagination" data-testid='pagination-main-page'>
      <ul className="pagination__list">
        {currentPageSet > DEFAULT_UNIT && (
          <ButtonChangePage
            onPaginationButtonClick={() => handleClickButton(startPage - DEFAULT_UNIT)}
            currentPage={currentPage}
            nameButton={ButtonName.BackEn}
          />
        )}
        {pageNumbers.slice(startPage - DEFAULT_UNIT, endPage).map((number) => (
          <li key={number} className="pagination__item" onClick={() => handleClickButton(number)}>
            <a className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}>
              {number}
            </a>
          </li>
        ))}
        {currentPageSet * pagesPerSet < quantityPages && (
          <ButtonChangePage
            onPaginationButtonClick={() => handleClickButton(endPage + DEFAULT_UNIT)}
            currentPage={currentPage}
            nameButton={ButtonName.NextEn}
          />
        )}
      </ul>
    </div>
  );
}

export { PaginationMainPageComponent };
