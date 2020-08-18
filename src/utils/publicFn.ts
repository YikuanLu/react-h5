import moment from '@/utils/moment'

export const computeTime = (createTime?: string): string => {
  if (!createTime) return ''
  const day = moment().diff(moment(createTime), 'day')
  const hour = moment().diff(moment(createTime), 'hour')
  const second = moment().diff(moment(createTime), 'second')
  const minute = moment().diff(moment(createTime), 'minute')
  const millisecond = moment().diff(moment(createTime), 'millisecond')

  if (millisecond < 1000) {
    return '刚刚'
  }
  if (second < 60) {
    return `${second}秒钟前`
  }
  if (hour < 1) {
    return `${minute}分钟前`
  }
  if (hour < 24) {
    return `${hour}小时前`
  }
  if (hour < 72) {
    return `${day}天前`
  }
  if (moment().isSame(moment(createTime), 'year')) {
    return moment(createTime).format('MM-DD HH:mm')
  }
  return moment(createTime).format('YYYY-MM-DD HH:mm')
}

export const formatNumber = (num: number): string => {
  if (num >= 10000) {
    const newNum = `${num}`.slice(0, `${num}`.length - 2)
    return `${parseFloat((parseInt(newNum, 10) / 100).toFixed(2))}w`
  }
  return `${num}`
}

export const secondToMinute = (s: number): string => {
  // 计算分钟
  // 算法：将秒数除以60，然后下舍入，既得到分钟数
  const h = Math.floor(s / 60)
  const hour = h < 10 ? `0${h}` : h
  // 计算秒
  // 算法：取得秒%60的余数，既得到秒数
  // 将变量转换为字符串
  // 如果只有一位数，前面增加一个0
  const second = s % 60 < 10 ? `0${s % 60}` : s % 60
  return `${hour}:${second}`
}

// 防抖
export function debounce(fn: () => void, wait: number): () => void {
  let timeout: NodeJS.Timeout | null = null
  return (): void => {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}
