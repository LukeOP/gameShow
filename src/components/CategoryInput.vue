<template>
  <div class="category-label">
    <input type="checkbox" v-model="category.active" />
    <label><slot></slot></label>
    <input type="text" v-model="category.description" />
  </div>
</template>

<script setup>
import { useQuestionStore } from '@/stores/questionsStore'
import { ref } from 'vue'

const questionStore = useQuestionStore()
const props = defineProps({ id: Number })

const category = ref(questionStore.categories.find((c) => c.id == props.id))
</script>

<style lang="scss" scoped>
.category-label {
  width: 100%;
  display: flex;
  gap: 10px;
  input[type='checkbox'] {
    height: 30px;
    width: 30px;
  }
  label {
    width: 200px;
  }
  input[type='text'] {
    width: 100%;
    border-radius: 0.5rem;
    padding: 5px 20px;
    border: 1px solid grey;
  }
}
</style>
