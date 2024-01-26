import dayjs from 'dayjs';
import 'dayjs/locale/ru';

function formatData (data: string) {
  return dayjs(data).locale('ru').format('DD MMMM');
}

export {formatData};
