import DateUtil from './date'

class Formatter {
  static getHumanizedDate = (timestamp: number) => {
    const formatter = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const dateTime = DateUtil.createDateByTimestamp(timestamp)
    return DateUtil.formatAsLocaleString(dateTime, formatter)
  }
}

export default Formatter
