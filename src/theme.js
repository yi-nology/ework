// Naive UI 主题定制：陶土橙 + 暖色纸感，亮/暗两套
const BRAND = {
  primary: '#C97B5D',
  hover: '#B96C4E',
  pressed: '#A85F42',
  suppl: '#F6E4DB'
}

export function buildThemeOverrides () {
  const common = {
    primaryColor: BRAND.primary,
    primaryColorHover: BRAND.hover,
    primaryColorPressed: BRAND.pressed,
    primaryColorSuppl: BRAND.suppl,
    borderRadius: '8px',
    borderRadiusSmall: '6px',
    fontWeightStrong: '600'
  }
  return {
    common,
    Card: {
      borderRadius: '16px'
    },
    Drawer: {
      borderRadius: '16px'
    },
    Popover: {
      borderRadius: '12px'
    }
  }
}
