import unidecode from "unidecode"

// Slugify a string
export const strSlugify = (string: string): string => {
  const str = unidecode(string)
  return str.toLowerCase()
    .replace(/[\s]/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+$/g, '')
};