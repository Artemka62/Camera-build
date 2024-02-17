import { Link, createSearchParams, useSearchParams } from 'react-router-dom';
import { ButtonName } from '../../src-const';
import { getUrlParams } from '../../utils/utils-grt-url';

type ButtonChangePageProps = {

  nameButton: string;
  lastPage:number;
}

function ButtonChangePage ({nameButton, lastPage}: ButtonChangePageProps) {
  const [urlParam] = useSearchParams();

  return (
    <li className="pagination__item" data-testid='button-change-page'>
      <Link
        to={{
          search: createSearchParams({
            ...getUrlParams(urlParam),
            ['page']: ((nameButton === ButtonName.NextEn) ? lastPage + 1 : lastPage - 1).toString(),
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
