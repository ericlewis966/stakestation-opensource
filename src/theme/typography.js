// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`
}

function responsiveFontSizes({ xs, sm, md, lg }) {
  return {
    '@media (min-width:0px)': {
      fontSize: pxToRem(xs),
    },
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  }
}

const FONT_PRIMARY = 'ThunderBolt1' // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 1,
    fontSize: pxToRem(80),
    ...responsiveFontSizes({ sm: 64, md: 80, lg: 80 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 1,
    fontSize: pxToRem(48),
    ...responsiveFontSizes({ xs: 36, sm: 36, md: 56, lg: 56 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1,
    fontSize: pxToRem(44),
    ...responsiveFontSizes({ xs: 24, sm: 24, md: 44, lg: 44 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1,
    fontSize: pxToRem(34),
    ...responsiveFontSizes({ xs:20, sm: 20, md: 34, lg: 34 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 1,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
}

export default typography