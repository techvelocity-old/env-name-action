const NAME_PATTERN = /\{name\}/g

export function trim(name: string, max: number): string {
  const re = new RegExp(`^.{2,${max - 1}}[a-z0-9]`, 'gi')
  const result = re.exec(name)

  if (!result) {
    throw new Error(`unable to trim ${name} to ${max}`)
  }
  return result[0]
}

export function generate(name: string, pattern: string, max: number): string {
  if (!NAME_PATTERN.exec(pattern)) {
    throw new Error('missing {name} inside the pattern')
  }

  const fullName = pattern
    .replace(NAME_PATTERN, name)
    .replace(/[\\/\\-_]/g, '-')

  return trim(fullName, max)
}
