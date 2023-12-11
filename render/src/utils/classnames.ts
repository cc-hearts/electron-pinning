import { isBool, isObject } from '@cc-heart/utils'

export function classnames(
  ...params: (string | boolean | number | string[] | Record<string, any>)[]
) {
  return params
    .reduce<string[]>((acc, cur) => {
      if (Array.isArray(cur)) {
        return [...acc, ...cur.filter(Boolean)]
      }

      if (isObject(cur)) {
        return [
          ...acc,
          ...Object.entries(cur)
            .filter(([, value]) => value)
            .map(([key]) => key),
        ]
      }

      if (isBool(cur) && !cur) return acc

      return [...acc, cur]
    }, [])
    .join(' ')
}
