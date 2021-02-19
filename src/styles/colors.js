export const neutral = {
  white: "#ffffff",
  s100: "#efeff6",
  s150: "#dfdfe6",
  s200: "#c7c7ce",
  s250: "#bbbbc2",
  s300: "#9f9ea4",
  s400: "#7c7c82",
  s500: "#515154",
  s600: "#38383a",
  s700: "#2d2c2e",
  s800: "#212123",
  s900: "#161617",
  black: "#000000",
}

export const primary = {
  s200: "#459de6",
  brand: "#0d548f",
  s600: "#0c3659",
}

export const secondary = {
  s200: "#b968e8",
  brand: "#591282",
  s600: "#3f0d5c",
}

export const danger = {
  s400: "#cf1717",
}

export const success = {
  s400: "#008a09",
}

export const warning = {
  s400: "#cf9700",
}

const applyOpacity = (hexColor, opacity) => {
  const red = parseInt(hexColor.slice(1, 3), 16)
  const green = parseInt(hexColor.slice(3, 5), 16)
  const blue = parseInt(hexColor.slice(5, 7), 16)

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

export const transparent = {
  clear: "rgba(255, 255, 255, 0)",
  lightGray: applyOpacity(neutral.s300, 0.4),
  darkGray: applyOpacity(neutral.s800, 0.8),
}