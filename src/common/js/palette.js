// 分类配色：与陶土橙主色协调的大地色系，用于分类徽标、标题点缀与首字头像
// color = 主色（实色徽标 / 文字），bg = 浅底（卡片头像底色）
const PALETTE = [
    { color: '#C97B5D', bg: '#F6E4DB' }, // 陶土
    { color: '#5F8C6B', bg: '#E2EEE5' }, // 松绿
    { color: '#5E7FA6', bg: '#E1E9F2' }, // 灰蓝
    { color: '#A06D79', bg: '#F3E2E5' }, // 玫瑰灰
    { color: '#A98467', bg: '#F0E7DE' }, // 暖棕
    { color: '#8E7CC3', bg: '#EBE7F5' }, // 灰紫
    { color: '#B08D3E', bg: '#F3EBD9' }, // 芥黄
    { color: '#4F8B8B', bg: '#DFEDEC' }, // 青
    { color: '#BC6C4F', bg: '#F6E3DC' }, // 赭石
    { color: '#6B7FA3', bg: '#E4E9F3' }, // 靛灰
    { color: '#7D6B91', bg: '#EBE6F0' }, // 紫灰
    { color: '#9A7B4F', bg: '#F1E8DC' }  // 深驼
]

export function badgeForIndex (i) {
    return PALETTE[Math.abs(i) % PALETTE.length]
}

export function colorForIndex (i) {
    return badgeForIndex(i).color
}
