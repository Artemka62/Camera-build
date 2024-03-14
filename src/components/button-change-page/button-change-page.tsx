import { Link, createSearchParams, useSearchParams } from 'react-router-dom';
import { AppRoute, ButtonName, DEFAULT_UNIT } from '../../src-const';
import { getUrlParams } from '../../utils';

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
            [AppRoute.Page]: ((nameButton === ButtonName.NextEn) ? lastPage + DEFAULT_UNIT : lastPage - DEFAULT_UNIT).toString(),
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
