<template>
  <div id="background">
    <div id="active-tile">
      <div id="content">
        <section id="top-section">
          <div id="team">
            {{ scoreStore.getSelectedTeam.name }}: {{ scoreStore.getSelectedTeam.score }}
          </div>
          <div id="value">{{ questionStore.getQuestion.value }}pts</div>
          <SpacerTemplate />
        </section>
        <div id="question" v-if="!revealAnswer">{{ questionStore.getQuestion.question }}</div>
        <ScoringPanel />
      </div>
    </div>
  </div>
</template>

<script setup>
import ScoringPanel from './ScoringPanel.vue'
import { useQuestionStore } from '@/stores/questionsStore'
import { useScoreStore } from '@/stores/scoreStore'
import { ref } from 'vue'
import SpacerTemplate from './SpacerTemplate.vue'

const questionStore = useQuestionStore()
const scoreStore = useScoreStore()
const revealAnswer = ref(false)
</script>

<style lang="scss" scoped>
#background {
  background-color: rgba(0, 0, 0, 0.44);
  position: fixed;
  top: 50px;
  left: 0px;
  width: 100vw;
  height: calc(100vh - 50px);
  #active-tile {
    margin: auto;
    background-color: rgb(45, 45, 192);
    background-color: white;
    height: 90%;
    width: 90%;
    color: black;
    border-radius: 1rem;
    padding: 20px;
    #content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      #top-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        padding-bottom: 10px;
        border-bottom: 1px solid grey;
        #team {
          font-size: 50px;
          // border: 3px solid #000;
          padding: 5px 20px;
          width: 100%;
        }
        #value {
          font-size: 80px;
          width: 100%;
          text-align: center;
        }
      }
      #question {
        display: flex;
        font-size: 80px;
        // background-color: pink;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-grow: 1;
      }
    }
  }
}
</style>
