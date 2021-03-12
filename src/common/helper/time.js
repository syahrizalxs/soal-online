import dayjs from 'dayjs'
import id from 'dayjs/locale/id'

dayjs.locale(id)

export function converDate (date) {
  return dayjs(date).format('DD-MMMM-YYYY [Pukul:] H:m')
}

export function convertNano (nano) {
  let date = new Date(nano)
  return dayjs(date).format('DD-MMMM-YYYY [Pukul:] H:m')
}
