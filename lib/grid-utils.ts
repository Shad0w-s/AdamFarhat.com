export const getGridCols = (cols?: number, prefix?: string) => {
  if (!cols) return ''
  const p = prefix ? `${prefix}:` : ''
  return `${p}grid-cols-${cols}`
}

export const getColClasses = (cols?: number, prefix?: string) => {
  if (!cols) return ''
  const p = prefix ? `${prefix}:` : ''
  return `${p}columns-${cols}`
}

