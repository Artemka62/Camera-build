import { Link, createSearchParams, useSearchParams } from 'react-router-dom';
import { ButtonName, DEFAULT_UNIT } from '../../src-const';
import { getUrlParams } from '../../utils/utils-grt-url';

type ButtonChangePageProps = {
  onPaginationButtonClick: (number: number) => void;
  currentPage: number;
  nameButton: string;
}

function ButtonChangePage ({onPaginationButtonClick, currentPage, nameButton}: ButtonChangePageProps) {

  const [urlParam] = useSearchParams();


  function handleClickButton () {
    if(nameButton === ButtonName.NextEn) {
      onPaginationButtonClick(currentPage + DEFAULT_UNIT);
    }

    if(nameButton === ButtonName.BackEn) {
      onPaginationButtonClick(currentPage - DEFAULT_UNIT);
    }
  }

  return (
    <li className="pagination__item" onClick={handleClickButton} data-testid='button-change-page'>
      <Link
        to={{
          search: createSearchParams({
            ...getUrlParams(urlParam),
            ['page']: currentPage.toString(),
          }).toString(),
        }}
        className="pagination__link pagination__link--text"
      >
        {(nameButton === ButtonName.NextEn) ? ButtonName.NextRu : ButtonName.BackRu}
      </Link>
    </li>
  );
}

export {ButtonChangePage};
