import { useNavigate } from 'react-router-dom';

type PaginationMainPageComponentProps ={
  offersPerPages: number;
  totalOffers: number;
  callbackPaginate: (number: number) => void;
  currentPage: number;
}

function PaginationMainPageComponent ({offersPerPages, totalOffers, callbackPaginate, currentPage}: PaginationMainPageComponentProps) {
  const pageNumbers = [];
  const navigate = useNavigate();

  function handleClick (numberPage: number) {
    callbackPaginate(numberPage);
    navigate(`/?page=${numberPage}`);
  }

  for (let page = 1; page <= Math.ceil(totalOffers / offersPerPages); page++) {
    pageNumbers.push(page);
  }

  if(totalOffers <= 9){
    return <> </>;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          pageNumbers.map((number) => (
            <li className="pagination__item" key={number} onClick={() => handleClick(number)}>
              <a
                className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}
              >
                {number}
              </a>
            </li>
          ))
        }
      </ul>
    </div>

  );

}

export {PaginationMainPageComponent};
