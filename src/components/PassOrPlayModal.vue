<template>
  <div id="background">
    <div id="pass-or-play-modal">
      <!-- Incorrect Answer -->
      <div class="incorrect" v-if="display === 'incorrect'">
        <div class="image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
            />
          </svg>
        </div>
        <div class="content">
          <div class="team">{{ scoreStore.getSelectedTeam.name }}</div>
          <div class="text">Incorrect Answer</div>
        </div>
      </div>

      <!-- Points Adjustment -->
      <div id="point-adjust" v-if="display === 'pointAdjust'">
        <div class="team">{{ scoreStore.getSelectedTeam.name }}</div>
        <div class="value">-{{ questionStore.getQuestion.value }}</div>
        <PointAdjustment
          :currentScore="scoreStore.getSelectedTeam.score"
          :value="questionStore.getQuestion.value"
          direction="decrease"
          @completed="passOrPlay()"
        />
      </div>

      <!-- Pass or Play -->
      <div id="pass-or-play" v-if="display === 'passOrPlay'">
        <div class="team">{{ scoreStore.getSelectedTeam.name }}</div>
        <div class="content">
          <div class="text-center">Do you want to steal the question:</div>
          <div class="text-center question">{{ questionStore.getQuestion.question }}</div>
        </div>
        <div class="options">
          <button
            class="btn btn-pass"
            v-if="scoreStore.getNextTeam != scoreStore.getCurrentTeam.id"
            @click="pass"
          >
            Pass to next team
          </button>
          <button v-else class="btn btn-pass" @click="display = 'answer'">
            Pass and Reveal Answer
          </button>
          <button class="btn btn-correct" @click="play">Steal and Play</button>
        </div>
      </div>

      <!-- Answer -->
      <div id="answer" v-if="display === 'answer'">
        <div class="content">
          <div class="question">{{ questionStore.getQuestion.question }}</div>
          <div class="answer">{{ questionStore.getQuestion.answer }}</div>
          <button class="btn btn-pass" @click="closeModal()">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScoreStore } from '@/stores/scoreStore'
import { ref } from 'vue'
import PointAdjustment from './PointAdjustment.vue'
import { useQuestionStore } from '@/stores/questionsStore'

const emit = defineEmits(['close'])

const scoreStore = useScoreStore()
const questionStore = useQuestionStore()
const display = ref('incorrect')

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const updateDisplay = async (route) => {
  await delay(2000)
  display.value = route
}
updateDisplay('pointAdjust')

async function passOrPlay() {
  if (scoreStore.getNextTeam != scoreStore.getCurrentTeam.id) {
    await updateDisplay('passOrPlay')
    scoreStore.nextTeam()
  } else updateDisplay('answer')
}

function play() {
  emit('close')
}

function pass() {
  scoreStore.nextTeam()
}
function closeModal() {
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
  #pass-or-play-modal {
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
    .incorrect {
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
          fill: darkred;
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
          color: darkred;
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
        color: rgb(45, 45, 192);
      }
      .value {
        font-size: 50px;
        color: darkred;
      }
    }
    #pass-or-play {
      display: flex;
      flex-direction: column;
      //   justify-content: center;
      align-items: center;
      height: 100%;
      .team {
        font-size: 50px;
        color: black;
      }
      .content {
        font-size: 50px;
        flex-grow: 2;
        .question {
          font-size: 80px;
        }
      }
      .options {
        display: flex;
        gap: 1rem;
        padding: 10px 10px 30px 10px;
      }
    }
    #answer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        height: 100%;
        .question {
          height: 100px;
        }
        .answer {
          flex-grow: 2;
          font-size: 80px;
          display: flex;
          align-items: center;
        }
        .btn {
          height: 70px;
          margin: 10px 10px 30px 10px;
        }
      }
    }
  }
}
.btn {
  width: 300px;
}
</style>
