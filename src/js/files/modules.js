export const mhzModules = {
  md1: matchMedia(`(width < 77.625rem)`),
  md2: matchMedia(`(width < 61.99875rem)`),
  md3: matchMedia(`(width < 47.99875rem)`),
  md4: matchMedia(`(width < 29.99875rem)`),
  mmd1: matchMedia(`(width > 77.625rem)`),
  mmd2: matchMedia(`(width > 61.99875rem)`),
  mmd3: matchMedia(`(width > 47.99875rem)`),
  mmd4: matchMedia(`(width > 29.99875rem)`),
  md: (width) => {
    return matchMedia(`(width < ${width / 16}rem)`)
  },
  mmd: (width) => {
    return matchMedia(`(width > ${width / 16}rem)`)
  }
}