import { useAppDispatch} from '../../hooks/hook-use-store';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Fragment, useEffect} from 'react';
import { DEFAULT_NULL, DELAY_FOCUS, OPTIONS, SettingValidation } from '../../src-const';
import { postReview } from '../../services/thunk/thunk-post-review';
import { PostReview } from '../../types/types-service';
import { useParams } from 'react-router-dom';
import { fetchReviewsAction } from '../../services/thunk/thunk-fetch-rewiews';
import './modal-window-rewiew-product.css';

type FormInputs = {
  userName: string;
  userPlus: string;
  userMinus: string;
  userComment: string;
  rating: string;
};

function ModalWindowReviewProductComponent () {
  const dispatch = useAppDispatch();
  const {id} = useParams();

  const {
    register,
    formState: {
      errors,
      //isValid,
    },
    setFocus,
    handleSubmit,
    reset,
    watch,
  } = useForm<FormInputs>({
    mode: 'all'

  });

  const ratingFieldValue = watch('rating');

  useEffect(() => {
    let isMounted = true;

    if(isMounted){
      document.body.classList.add('scroll-lock');
    }

    return () => {
      document.body.classList.remove('scroll-lock');
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      setTimeout(() => {
        setFocus('userName');
      }, DELAY_FOCUS);
    }

    return () => {
      isMounted = false;
    };
  }, [setFocus]);

  function handleButtonClose () {
    dispatch(windowsSlice.actions.windowReview(false));
    dispatch(windowsSlice.actions.isModalWindow(false));
  }

  const handleFormSubmit: SubmitHandler<FormInputs> = (data) => {
    const dataForm: PostReview = {
      cameraId: parseFloat(id || ''),
      userName: data.userName,
      advantage: data.userPlus,
      disadvantage: data.userMinus,
      review: data.userComment,
      rating: +data.rating
    };

    dispatch(postReview({dataForm})).unwrap().then(() => {
      reset();
      dispatch(windowsSlice.actions.windowReview(false));
      dispatch(windowsSlice.actions.windowReviewSuccess(true));

      if(id){
        dispatch(fetchReviewsAction(+id));
      }
    });
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
                            (Number(ratingValue) >= SettingValidation.RatingMin &&
                              Number(ratingValue) <= SettingValidation.RatingMax) ||
                              SettingValidation.RatingMessage,
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
                  <span className="rate__stars">{ratingFieldValue || DEFAULT_NULL}</span>{' '}
                  <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              {errors.rating && (
                <p className="rate__message">
                  {errors.rating.message || SettingValidation.ErrorMessage}
                </p>
              )}
            </fieldset>
            <div className= {`${!errors.userName ? 'custom-input form-review__item ' : 'custom-input form-review__item is-invalid'}`}>
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
                  autoFocus
                  {...register('userName', {
                    required: SettingValidation.UserMessageRequired,
                    minLength: {
                      value: SettingValidation.UserNameMin,
                      message: SettingValidation.UserMessageValidation,
                    },
                    maxLength: {
                      value: SettingValidation.UserNameMax,
                      message: SettingValidation.UserMessageValidation,
                    }
                  })}
                />
              </label>
              {errors.userName && (
                <p className="custom-input__error">
                  {errors.userName.message || SettingValidation.ErrorMessage}
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
                    required: SettingValidation.UserTextPlus,
                    minLength: {
                      value: SettingValidation.UserTextMin,
                      message: SettingValidation.UserTextMessage,
                    },
                    maxLength: {
                      value: SettingValidation.UserTextMax,
                      message: SettingValidation.UserTextMessage,
                    }
                  })}
                />
              </label>
              {errors.userPlus && (
                <p className="custom-input__error">
                  {errors.userPlus.message || SettingValidation.ErrorMessage}
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
                    required: SettingValidation.UserTextMinus,
                    minLength: {
                      value: SettingValidation.UserTextMin,
                      message: SettingValidation.UserTextMessage,
                    },
                    maxLength: {
                      value: SettingValidation.UserTextMax,
                      message: SettingValidation.UserTextMessage,
                    }
                  })}
                />
              </label>
              {errors.userMinus && (
                <p className="custom-input__error">
                  {errors.userMinus.message || SettingValidation.ErrorMessage}
                </p>
              )}
            </div>

            <div className={`${ !errors.userComment ? 'custom-textarea form-review__item' : 'custom-textarea form-review__item is-invalid'}`}>
              <label>
                <span className="custom-textarea__label">
                  Комментарий
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <textarea
                  placeholder="Поделитесь своим опытом покупки"
                  {...register('userComment', {
                    required: SettingValidation.UserComment,
                    minLength: {
                      value: SettingValidation.UserTextMin,
                      message: SettingValidation.UserTextMessage,
                    },
                    maxLength: {
                      value: SettingValidation.UserTextMax,
                      message: SettingValidation.UserTextMessage,
                    }
                  })}
                />
              </label>
              {errors.userComment && (
                <div className="custom-textarea__error">
                  {errors.userComment.message || SettingValidation.ErrorMessage}
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
