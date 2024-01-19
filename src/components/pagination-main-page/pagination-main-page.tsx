import { useNavigate } from 'react-router-dom';
import { ButtonChangePage } from '../button-change-page/button-change-page';

type PaginationMainPageComponentProps ={
  offersPerPages: number;
  totalOffers: number;
  callbackPaginate: (number: number) => void;
  currentPage: number;
}

function PaginationMainPageComponent ({offersPerPages, totalOffers, callbackPaginate, currentPage}: PaginationMainPageComponentProps) {
  const pageNumbers = [];
  const navigate = useNavigate();
  const quantityPage = Math.ceil(totalOffers / offersPerPages);

  function handleClickButton (numberPage: number) {
    callbackPaginate(numberPage);
    navigate(`/?page=${numberPage}`);
  }

  for (let page = 1; page <= quantityPage; page++) {
    pageNumbers.push(page);
  }

  if(totalOffers <= 9){
    return <> </>;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPage >= 2 ? <ButtonChangePage callbackPaginate={callbackPaginate} currentPage={currentPage} nameButton={'back'} /> : ''
        }
        {
          pageNumbers.map((number) => (
            <li className="pagination__item" key={number} onClick={() => handleClickButton(number)}>
              <a
                className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}
              >
                {number}
              </a>
            </li>
          ))
        }
        {
          currentPage !== quantityPage ? <ButtonChangePage callbackPaginate={callbackPaginate} currentPage={currentPage} nameButton={'next'}/> : ''
        }
      </ul>
    </div>

  );

}

export {PaginationMainPageComponent};
