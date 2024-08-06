import { formatDistanceToNow } from 'date-fns'

export const convertTimestampToDate = (timestamp: string, enrolled: boolean) => {
  if (!enrolled) return null
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(2)} @ ${format24Hour(date)}`
}

const format24Hour = (date: Date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  const hoursStr = hours < 10 ? '0' + hours.toString() : hours.toString()
  const minutesStr = minutes < 10 ? '0' + minutes.toString() : minutes.toString()
  const strTime = hoursStr + ':' + minutesStr
  return strTime
}

export const timeSince = (stringData: string) => {
  if (!stringData) return 'N/A'
  const date = new Date(stringData)
  return formatDistanceToNow(date, { addSuffix: true })
}

export const formatForDate = (stringData: number) => {
  const date = new Date(stringData * 1000)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export const formatForTimestampWithDate = (stringData: string) => {
  const date = new Date(stringData)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}
