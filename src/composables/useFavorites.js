import { ref } from 'vue'
import { loadFavorite, saveFavorite, deleteFavorite, removeFavorite, loadUsed, saveUsed, deleteUsed, removeUsed } from '@/common/cache'

const favoriteList = ref(loadFavorite()) // 单例状态
const usedList = ref(loadUsed())

export function useFavorites () {
  function addFavorite (item, title) {
    const copy = { ...item, title }
    favoriteList.value = saveFavorite(copy)
  }

  function addUsed (item, title) {
    const copy = { ...item, title }
    usedList.value = saveUsed(copy)
  }

  // 收藏与常用都以 link 为唯一键，删除时两表同时清理
  function removeItem (item) {
    usedList.value = deleteUsed(item)
    favoriteList.value = deleteFavorite(item)
  }

  function clearFavorites () {
    favoriteList.value = removeFavorite()
  }

  function clearUsed () {
    usedList.value = removeUsed()
  }

  return { favoriteList, usedList, addFavorite, addUsed, removeItem, clearFavorites, clearUsed }
}
