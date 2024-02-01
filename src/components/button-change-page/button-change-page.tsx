import { ButtonName, DEFAULT_UNIT } from '../../src-const';

type ButtonChangePageProps = {
  onCallbackPaginate: (number: number) => void;
  currentPage: number;
  nameButton: string;
}

function ButtonChangePage ({onCallbackPaginate, currentPage, nameButton}: ButtonChangePageProps) {

  function handleClickButton () {
    if(nameButton === ButtonName.NextEn) {
      onCallbackPaginate(currentPage + DEFAULT_UNIT);
    }

    if(nameButton === ButtonName.BackEn) {
      onCallbackPaginate(currentPage - DEFAULT_UNIT);
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
