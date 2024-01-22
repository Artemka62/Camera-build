import { useAppDispatch } from '../../hooks/use-store';
import { windowsSlice } from '../../store/slice/modalWindows';
import { SubmitHandler, useForm } from 'react-hook-form';
import './modal-window-rewiew-product.css';
import { Fragment, useEffect} from 'react';
import { OPTIONS } from '../../const';

type FormInputs = {
  userName: string;
  userPlus: string;
  userMinus: string;
  UserComment: string;
  rating: string;
};

function ModalWindowReviewProductComponent () {
  const dispatch = useAppDispatch();

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    setFocus,
    handleSubmit,
    reset,
    watch,
  } = useForm<FormInputs>({
    mode: 'all'

  });


  useEffect(() => {
    document.body.classList.add('scroll-lock');

    return () => document.body.classList.remove('scroll-lock');
  }, []);

  // useEffect(() => {


  //   setFocus('userName');
  // }, [setFocus]);


  const ratingFieldValue = watch('rating');

  function handleButtonClose () {
    dispatch(windowsSlice.actions.windowReview(false));
    dispatch(windowsSlice.actions.isModalWindow(false));
  }

  const handleFormSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form onSubmit={(event) => void handleSubmit(handleFormSubmit)(event)} method="post">
          <div className="form-review__rate">
            <fieldset className={`${ errors.rating ? 'rate form-review__item ' : 'rate form-review__item is-invalid'}`}>
              <legend className="rate__caption">
                Рейтинг
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  {OPTIONS.map((option) => (
                    <Fragment key={option.value}>
                      <input
                        className="visually-hidden"
                        id={`star-${option.value}`}
                        type="radio"
                        value={option.value}
                        {...register('rating', {
                          required: 'Нужно оценить товар',
                          validate: (ratingValue) =>
                            (Number(ratingValue) >= 1 &&
                              Number(ratingValue) <= 5) ||
                            'Минимальное значение 1, максимальное 5',
                        })}
                      />
                      <label
                        className="rate__label"
                        htmlFor={`star-${option.value}`}
                        title={option.label}
                      />
                    </Fragment>
                  ))}
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">{ratingFieldValue || 0}</span>{' '}
                  <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              {errors.rating && (
                <p className="rate__message">
                  {errors.rating.message || 'Ошибка'}
                </p>
              )}
            </fieldset>
            <div className= {`${ !errors.userName ? 'custom-input form-review__item ' : 'custom-input form-review__item is-invalid'}`}>
              <label>
                <span className="custom-input__label">
                  Ваше имя
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"


                  {...register('userName', {
                    required: 'Нужно указать имя',
                    minLength: {
                      value: 2,
                      message: 'От 2 до 15 символов',
                    },
                    maxLength: {
                      value: 15,
                      message: 'От 1 до 15 символов',
                    }
                  })}
                />
              </label>
              {errors.userName && (
                <p className="custom-input__error">
                  {errors.userName.message || 'Ошибка'}
                </p>
              )}
            </div>
            <div className= {`${ !errors.userPlus ? 'custom-input form-review__item ' : 'custom-input form-review__item is-invalid'}`}>
              <label>
                <span className="custom-input__label">
                  Достоинства
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Основные преимущества товара"
                  {...register('userPlus', {
                    required: 'Нужно указать достоинства',
                    minLength: {
                      value: 10,
                      message: 'От 10 до 160 символов',
                    },
                    maxLength: {
                      value: 160,
                      message: 'От 10 до 160 символов',
                    }
                  })}
                />
              </label>
              {errors.userPlus && (
                <p className="custom-input__error">
                  {errors.userPlus.message || 'Ошибка'}
                </p>
              )}
            </div>
            <div className={`${ !errors.userMinus ? 'custom-input form-review__item ' : 'custom-input form-review__item is-invalid'}`}>
              <label>
                <span className="custom-input__label">
                  Недостатки
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Главные недостатки товара"
                  {...register('userMinus', {
                    required: 'Нужно указать недостатки',
                    minLength: {
                      value: 10,
                      message: 'От 10 до 160 символов',
                    },
                    maxLength: {
                      value: 160,
                      message: 'От 10 до 160 символов',
                    }
                  })}
                />
              </label>
              {errors.userMinus && (
                <p className="custom-input__error">
                  {errors.userMinus.message || 'Ошибка'}
                </p>
              )}
            </div>

            <div className={`${ !errors.UserComment ? 'custom-textarea form-review__item' : 'custom-textarea form-review__item is-invalid'}`}>
              <label>
                <span className="custom-textarea__label">
                  Комментарий
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <textarea
                  placeholder="Поделитесь своим опытом покупки"
                  {...register('UserComment', {
                    required: 'Нужно добавить комментарий',
                    minLength: {
                      value: 10,
                      message: 'От 10 до 160 символов',
                    },
                    maxLength: {
                      value: 160,
                      message: 'От 10 до 160 символов',
                    }
                  })}
                />
              </label>
              {errors.UserComment && (
                <div className="custom-textarea__error">
                  {errors.UserComment.message || 'Ошибка'}
                </div>
              )}
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">
            Отправить отзыв
          </button>
        </form>
      </div>
      <button onClick={handleButtonClose} className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export {ModalWindowReviewProductComponent};
