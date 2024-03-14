import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function notify () {
  toast.error('Ошибка загрузки. Пожалуйста, проверьте интернет-соединение или перезагрузите страницу', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
}

export {notify};
