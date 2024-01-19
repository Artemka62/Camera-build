import { useNavigate } from 'react-router-dom';
import { ButtonChangePage } from '../button-change-page/button-change-page';
import { useEffect } from 'react';

type PaginationMainPageComponentProps = {
  offersPerPages: number;
  totalOffers: number;
  callbackPaginate: (number: number) => void;
  currentPage: number;
};

function PaginationMainPageComponent({offersPerPages, totalOffers, callbackPaginate, currentPage}: PaginationMainPageComponentProps) {
  const navigate = useNavigate();
  const quantityPages = Math.ceil(totalOffers / offersPerPages);
  const pageNumbers = Array.from({ length: quantityPages }, (_, i) => i + 1);
  const pagesPerSet = 3;
  const currentPageSet = Math.ceil(currentPage / pagesPerSet);
  const startPage = (currentPageSet - 1) * pagesPerSet + 1;
  const endPage = Math.min(currentPageSet * pagesPerSet, quantityPages);

  useEffect(() => {
    navigate(`/?page=${currentPage}`);
  },[currentPage]);

  function handleClickButton(numberPage: number) {
    callbackPaginate(numberPage);
    //navigate(`/?page=${numberPage}`);
  }

  if (totalOffers <= 9) {
    return <> </>;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPageSet > 1 && (
          <ButtonChangePage
            callbackPaginate={() => handleClickButton(startPage - 1)}
            currentPage={currentPage}
            nameButton={'back'}
          />
        )}
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <li key={number} className="pagination__item" onClick={() => handleClickButton(number)}>
            <a className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}>
              {number}
            </a>
          </li>
        ))}
        {currentPageSet * pagesPerSet < quantityPages && (
          <ButtonChangePage
            callbackPaginate={() => handleClickButton(endPage + 1)}
            currentPage={currentPage}
            nameButton={'next'}
          />
        )}
      </ul>
    </div>
  );
}

export { PaginationMainPageComponent };
