import { domainToASCII } from 'node:url'

const allowedLocalPartSymbols = new Set(`!#$%&'*+/=?^\`{|}~.-`.split(''))

export const isValidEmail = (value) => {
  if (!value || value.length > 254 || value.includes(' ')) {
    return false
  }

  const parts = value.split('@')
  if (parts.length !== 2) {
    return false
  }

  const [localPart, rawDomain] = parts
  if (
    !localPart ||
    !rawDomain ||
    localPart.startsWith('.') ||
    localPart.endsWith('.') ||
    localPart.includes('..')
  ) {
    return false
  }

  for (const character of localPart) {
    const isLetterOrDigit =
      (character >= 'a' && character <= 'z') ||
      (character >= 'A' && character <= 'Z') ||
      (character >= '0' && character <= '9')

    if (!isLetterOrDigit && !allowedLocalPartSymbols.has(character)) {
      return false
    }
  }

  const domain = domainToASCII(rawDomain)
  if (!domain || !domain.includes('.')) {
    return false
  }

  return domain.split('.').every((label) => {
    if (!label || label.startsWith('-') || label.endsWith('-')) {
      return false
    }

    for (const character of label) {
      const isLetterOrDigit =
        (character >= 'a' && character <= 'z') ||
        (character >= 'A' && character <= 'Z') ||
        (character >= '0' && character <= '9')

      if (!isLetterOrDigit && character !== '-') {
        return false
      }
    }

    return true
  })
}
