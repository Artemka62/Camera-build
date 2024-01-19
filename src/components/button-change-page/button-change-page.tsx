import { useNavigate } from 'react-router-dom';


type ButtonChangePageProps = {
  callbackPaginate: (number: number) => void;
  currentPage: number;
  nameButton: string;
}


function ButtonChangePage ({callbackPaginate, currentPage, nameButton}: ButtonChangePageProps) {

  const navigate = useNavigate();

  function handleClickButton () {
    if(nameButton === 'next') {
      callbackPaginate(currentPage + 1);
      navigate(`/?page=${currentPage + 1}`);
    }

    if(nameButton === 'back') {
      callbackPaginate(currentPage - 1);
      navigate(`/?page=${currentPage - 1}`);
    }
  }

  return (
    <li className="pagination__item" onClick={handleClickButton}>
      <a
        className="pagination__link pagination__link--text"
      >
        {(nameButton === 'next') ? 'Далее' : 'Назад'}
      </a>
    </li>
  );
}

export {ButtonChangePage};
