<template>
  <section :id="title" class="category-card" :style="{ '--cat-color': colorForIndex(catIndex) }">
    <div class="card-head">
      <h3 class="title">
        <span class="dot"></span>
        {{ title }}
      </h3>
      <span class="count-pill">{{ count }} 个站点</span>
    </div>
    <div class="grid">
      <LinkCard
        v-for="it in items"
        :key="it.link + it.name"
        :item="it"
        :cat-index="catIndex"
        :deletable="deletable"
      />
    </div>
  </section>
</template>

<script setup>
import LinkCard from './LinkCard.vue'
import { colorForIndex } from '@/common/palette'

defineProps({
  title: { type: String, required: true },
  count: { type: Number, required: true },
  items: { type: Array, required: true },
  catIndex: { type: Number, default: 0 },
  deletable: { type: Boolean, default: false }
})
</script>

<style scoped>
.category-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px 24px 24px;
  margin-bottom: 20px;
  box-shadow: var(--shadow-card);
}
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  font-weight: 600;
  color: var(--text);
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 3px;
  background: var(--cat-color, var(--accent));
}
.count-pill {
  font-size: 12px;
  color: var(--text-3);
  background: var(--bg-soft);
  padding: 2px 10px;
  border-radius: 999px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 12px;
}
@media (max-width: 768px) {
  .category-card { padding: 16px; border-radius: 14px; }
  .grid { grid-template-columns: 1fr; }
}
</style>
