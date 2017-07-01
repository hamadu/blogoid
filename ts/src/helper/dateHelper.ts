const dateFnFormat = require('date-fns/format')

export class DateHelper {
  public static format(date: Date, format = 'YYYY/MM/DD HH:mm:ss') {
    return dateFnFormat(date, format)
  }
}
