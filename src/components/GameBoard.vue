<template>
  <div id="game-board">
    <CategoryColumn
      v-for="category in questionsStore.getCategories"
      :key="category"
      :category="category"
    />
  </div>
</template>

<script setup>
import { useQuestionStore } from '@/stores/questionsStore'
import CategoryColumn from './CategoryColumn.vue'

const questionsStore = useQuestionStore()
</script>

<style lang="scss" scoped>
#game-board {
  background-color: black;
  height: calc(100vh - 64px);
  display: flex;
  gap: 10px;
  padding: 10px;
}
</style>
