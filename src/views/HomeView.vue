<template>
  <main>
    <ScoreHeader @menu="setMenu" />
    <GameBoard />
    <Transition name="fade">
      <MenuOptions v-if="menuState" @close="setMenu" />
    </Transition>
    <ActiveTile v-if="questionStore.currentQuestion > 0" />
    <GameCompleteModal v-if="questionStore.getGameCompleted" />
  </main>
</template>

<script setup>
import ScoreHeader from '../components/ScoreHeader.vue'
import GameBoard from '../components/GameBoard.vue'
import ActiveTile from '../components/ActiveTile.vue'
import MenuOptions from '../components/MenuOptions.vue'
import GameCompleteModal from '../components/GameCompleteModal.vue'
import { useQuestionStore } from '@/stores/questionsStore'
import { ref } from 'vue'

const questionStore = useQuestionStore()
const menuState = ref(false)

function setMenu(value) {
  menuState.value = value
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
