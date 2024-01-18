type PaginationMainPageComponentProps ={
  offersPerPages: number;
  totalOffers: number;
  callbackPaginate: (number: number) => void;
}


function PaginationMainPageComponent ({offersPerPages, totalOffers, callbackPaginate}: PaginationMainPageComponentProps) {

  const pageNumbers = [];

  for (let page = 1; page <= Math.ceil(totalOffers / offersPerPages); page++) {
    pageNumbers.push(page);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          pageNumbers.map((number) => (
            <li className="pagination__item" key={number} onClick={() => callbackPaginate(number)}>
              <a
                className="pagination__link pagination__link--active"
                href={number}

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
