<template>
  <section id="scoring-panel">
    <div>
      <div class="primary-answers">
        <button class="btn-correct btn" @click="addValue()">
          Correct +{{ questionStore.getQuestion.value }}
        </button>
        <button class="btn-incorrect btn" @click="subtractValue()">
          Incorrect -{{ questionStore.getQuestion.value }}
        </button>
      </div>
    </div>
    <PassOrPlayModal v-if="incorrectAnswer" @close="incorrectAnswer = false" />
    <CorrectAnswerModal v-if="correctAnswer" @close="correctAnswer = false" />
  </section>
</template>

<script setup>
import { useQuestionStore } from '@/stores/questionsStore'
import { ref } from 'vue'
import PassOrPlayModal from './PassOrPlayModal.vue'
import CorrectAnswerModal from './CorrectAnswerModal.vue'

const questionStore = useQuestionStore()
const incorrectAnswer = ref(false)
const correctAnswer = ref(false)

function addValue() {
  correctAnswer.value = true
}

function subtractValue() {
  incorrectAnswer.value = true
}
</script>

<style lang="scss" scoped>
.primary-answers {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 10px 0;
}
.secondary-answers {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 10px 0;
}
</style>
