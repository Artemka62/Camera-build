import { ButtonName, DEFAULT_UNIT } from '../../src-const';

type ButtonChangePageProps = {
  callbackPaginate: (number: number) => void;
  currentPage: number;
  nameButton: string;
}

function ButtonChangePage ({callbackPaginate, currentPage, nameButton}: ButtonChangePageProps) {

  function handleClickButton () {
    if(nameButton === ButtonName.NextEn) {
      callbackPaginate(currentPage + DEFAULT_UNIT);
    }

    if(nameButton === ButtonName.BackEn) {
      callbackPaginate(currentPage - DEFAULT_UNIT);
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
