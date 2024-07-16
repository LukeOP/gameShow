<template>
  <div id="category-column">
    <div class="category-tiles">
      <CategoryHeader>{{ category.description }}</CategoryHeader>
      <CategoryTile v-for="question in categoryQuestions" :key="question.id" :question="question" />
    </div>
  </div>
</template>

<script setup>
import CategoryTile from './CategoryTile.vue'
import CategoryHeader from './CategoryHeader.vue'
import { computed } from 'vue'
import { useQuestionStore } from '@/stores/questionsStore'

const questionStore = useQuestionStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const categoryQuestions = computed(() => {
  return questionStore.questionList.filter((q) => q.category == props.category.id)
})
</script>

<style lang="scss" scoped>
#category-column {
  height: 100%;
  width: 100%;
  .category-tiles {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 10px;
    height: 100%;
  }
}
</style>
