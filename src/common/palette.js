// 分类配色：与陶土橙主色协调的大地色系
// color = 主色（实色徽标 / 文字），bg = 浅色底（头像底色）
const PALETTE = [
  { color: '#C97B5D', bg: '#F6E4DB' },
  { color: '#5F8C6B', bg: '#E2EEE5' },
  { color: '#5E7FA6', bg: '#E1E9F2' },
  { color: '#A06D79', bg: '#F3E2E5' },
  { color: '#A98467', bg: '#F0E7DE' },
  { color: '#8E7CC3', bg: '#EBE7F5' },
  { color: '#B08D3E', bg: '#F3EBD9' },
  { color: '#4F8B8B', bg: '#DFEDEC' },
  { color: '#BC6C4F', bg: '#F6E3DC' },
  { color: '#6B7FA3', bg: '#E4E9F3' },
  { color: '#7D6B91', bg: '#EBE6F0' },
  { color: '#9A7B4F', bg: '#F1E8DC' }
]

export function badgeForIndex (i) {
  return PALETTE[Math.abs(i) % PALETTE.length]
}

export function colorForIndex (i) {
  return badgeForIndex(i).color
}
