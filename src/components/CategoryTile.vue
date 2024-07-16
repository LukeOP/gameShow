<template>
  <div
    class="category-tile"
    :class="{ hover: hover, active: active }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="setActive()"
  >
    {{ question.value }}
  </div>
</template>

<script setup>
import { useQuestionStore } from '@/stores/questionsStore'
import { ref } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const hover = ref(false)
const active = ref(false)
const questionsStore = useQuestionStore()

function setActive() {
  if (!active.value) {
    questionsStore.setCurrentQuestion(props.question.id)
    active.value = true
  }
}
</script>

<style lang="scss" scoped>
.category-tile {
  background-color: rgb(45, 45, 192);
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
}
.hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px 5px white;
}
.active {
  background-color: rgb(69, 69, 69);
  color: grey;
  cursor: default;
  &:hover {
    box-shadow: none;
  }
}
</style>
