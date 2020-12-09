import { DateTime, LocaleOptions } from 'luxon'

class DateUtil {
  static now() {
    return DateTime.local().toMillis()
  }

  static createDateByTimestamp(timestamp: number) {
    return DateTime.fromMillis(timestamp)
  }

  static formatAsLocaleString(
    dateTime: DateTime,
    formatter: (LocaleOptions & Intl.DateTimeFormatOptions) | undefined
  ) {
    return dateTime.setLocale('pt-BR').toLocaleString(formatter)
  }
}

export default DateUtil
