<template>
  <div id="background">
    <div id="correct-answer-modal">
      <!-- Correct Answer -->
      <div class="correct" v-if="display === 'correct'">
        <div class="image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
            />
          </svg>
        </div>
        <div class="content">
          <div class="team">{{ scoreStore.getSelectedTeam.name }}</div>
          <div class="text">Correct Answer</div>
          <div class="answer">{{ questionStore.getQuestion.answer }}</div>
        </div>
      </div>

      <!-- Points Adjustment -->
      <div id="point-adjust" v-if="display === 'pointAdjust'">
        <div class="team">{{ scoreStore.getSelectedTeam.name }}</div>
        <div class="value">+{{ questionStore.getQuestion.value }}</div>
        <PointAdjustment
          :currentScore="scoreStore.getSelectedTeam.score"
          :value="questionStore.getQuestion.value"
          direction="increase"
          @completed="closeModal()"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScoreStore } from '@/stores/scoreStore'
import { ref } from 'vue'
import PointAdjustment from './PointAdjustment.vue'
import { useQuestionStore } from '@/stores/questionsStore'

const scoreStore = useScoreStore()
const questionStore = useQuestionStore()
const display = ref('correct')

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const updateDisplay = async (route) => {
  await delay(2000)
  display.value = route
}
updateDisplay('pointAdjust')

async function closeModal() {
  await delay(2000)
  scoreStore.nextTurn()
  questionStore.closeQuestion()
}
</script>

<style lang="scss" scoped>
#background {
  background-color: rgba(0, 0, 0, 0.44);
  position: fixed;
  top: 0;
  left: 0px;
  width: 100vw;
  height: calc(100vh - 50px);
  #correct-answer-modal {
    position: relative;
    margin: auto;
    background-color: white;
    height: 90%;
    width: 90%;
    color: black;
    border-radius: 1rem;
    padding: 20px;
    top: 50%;
    transform: translateY(-50%);
    .correct {
      display: flex;
      height: 100%;
      .image {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          height: 200px;
          fill: darkgreen;
        }
      }
      .content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 60px;
        .team {
          font-size: 40px;
          color: black;
        }
        .text {
          font-size: 70px;
          color: darkgreen;
        }
        .answer {
          font-size: 40px;
        }
      }
    }
    #point-adjust {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 120px;
      .team {
        font-size: 70px;
      }
      .value {
        font-size: 50px;
        color: darkgreen;
      }
    }
  }
}
</style>
