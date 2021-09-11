const relative = new Intl.RelativeTimeFormat('en-GB', {numeric: 'auto'})
const short = new Intl.DateTimeFormat('en-GB', {weekday: 'long'})
const long = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatDate(
  date: string | Date,
  type: 'relative' | 'normal',
): string {
  let formatedDate = date
  const locale = 'en-US'

  if (typeof formatedDate === 'string') {
    formatedDate = new Date(date)
  }

  if (type === 'relative') {
    const now = new Date().setHours(0, 0, 0, 0)
    const then = formatedDate.setHours(0, 0, 0, 0)
    const days = (then - now) / 86400000
    if (days > -6) {
      if (days > -2) {
        return relative.format(days, 'day')
      }
      return short.format(formatedDate)
    }
    return long.format(formatedDate)
    // credits: David Bushell
  }

  return new Intl.DateTimeFormat(locale).format(
    typeof date === 'string' ? new Date(date) : date,
  )
}
