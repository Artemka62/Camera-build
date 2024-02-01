import { ButtonName, DEFAULT_UNIT } from '../../src-const';

type ButtonChangePageProps = {
  onPaginationButtonClick: (number: number) => void;
  currentPage: number;
  nameButton: string;
}

function ButtonChangePage ({onPaginationButtonClick, currentPage, nameButton}: ButtonChangePageProps) {

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
      <a
        className="pagination__link pagination__link--text"
      >
        {(nameButton === ButtonName.NextEn) ? ButtonName.NextRu : ButtonName.BackRu}
      </a>
    </li>
  );
}

export {ButtonChangePage};
