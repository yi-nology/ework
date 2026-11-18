<template>
  <div>
    <n-result
      v-if="error"
      status="404"
      title="数据加载失败"
      description="请检查配置中心连接后重试"
    >
      <template #footer>
        <n-button type="primary" @click="load">重新加载</n-button>
      </template>
    </n-result>

    <div v-else-if="loading && !totalCount" class="skeleton-wrap">
      <div class="sk-card" v-for="i in 2" :key="i">
        <n-skeleton text width="30%" :sharp="false" />
        <div class="sk-grid">
          <n-skeleton v-for="j in 8" :key="j" text :sharp="false" class="sk-item" />
        </div>
      </div>
    </div>

    <n-result
      v-else-if="keyword && hitCount === 0"
      status="search"
      title="没有找到相关站点"
      :description="'换个关键词试试：' + keyword"
    >
      <template #footer>
        <n-button @click="setKeyword('')">清空搜索</n-button>
      </template>
    </n-result>

    <n-empty
      v-else-if="!loading && !totalCount"
      description="暂无导航数据，请到配置中心检查各渠道发布状态"
      class="empty-block"
    />

    <template v-else>
      <CategoryCard
        v-if="favoriteList.length"
        title="我的收藏"
        :count="favoriteList.length"
        :items="favoriteList"
        :cat-index="-1"
        color-override="#C97D5D"
        deletable
      />
      <CategoryCard
        v-if="usedList.length"
        title="常用网址"
        :count="usedList.length"
        :items="usedList"
        :cat-index="-2"
        deletable
      />
      <CategoryCard
        v-for="(cat, index) in filtered"
        :key="cat.name"
        :title="cat.title"
        :count="cat.nav.length"
        :items="cat.nav"
        :cat-index="index"
      />
    </template>
  </div>
</template>

<script setup>
import { NButton, NEmpty, NResult, NSkeleton } from 'naive-ui'
import CategoryCard from './CategoryCard.vue'
import { useNavData } from '@/composables/useNavData'
import { useFavorites } from '@/composables/useFavorites'

const { filtered, keyword, hitCount, totalCount, loading, error, load, setKeyword } = useNavData()
const { favoriteList, usedList } = useFavorites()

load()
</script>

<style scoped>
.skeleton-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.sk-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px;
}
.sk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 12px;
  margin-top: 16px;
}
.sk-item {
  height: 60px;
  border-radius: 12px;
}
.empty-block {
  margin-top: 12vh;
}
</style>
