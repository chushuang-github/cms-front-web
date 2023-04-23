// 默认情况下dayjs是不能转换utc时间格式的
// 我们从dayjs/plugin/utc引入utc，使用dayjs.extend()对dayjs进行扩展
// 使dayjs支持utc时间格式的转化
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
// 将utc时间格式转换为我们想要的格式：2021-10-19T11:56:35.000Z
const DATE_TIEM_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIEM_FORMAT
) {
  // 服务器存储的是utc时间，我们所处的是东八区时间(北京时间)
  // 这个两个时间差8小时，utcOffset方法将时间加上8个小时
  // dayjs.utc是转化utc时间
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
