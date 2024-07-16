<template>
  <div id="background">
    <div id="game-complete-modal">
      <div class="celebration">&#x1F389; {{ winners }} &#x1F389;</div>
      <div class="winners" v-if="scoreStore.getWinningTeam.length > 1">
        <span class="winner" v-for="winner in scoreStore.getWinningTeam" :key="winner">{{
          winner.name
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScoreStore } from '@/stores/scoreStore'
import { computed } from 'vue'

const scoreStore = useScoreStore()

const winners = computed(() => {
  return scoreStore.getWinningTeam.length == 1
    ? scoreStore.getWinningTeam[0].name + ' Wins!'
    : 'Joint Winners!'
})
</script>

<style lang="scss" scoped>
#background {
  background-color: rgba(0, 0, 0, 0.44);
  position: fixed;
  top: 0;
  left: 0px;
  width: 100vw;
  height: calc(100vh - 50px);
  #game-complete-modal {
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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .celebration {
      font-size: 100px;
      color: goldenrod;
    }
    .winners {
      display: flex;
      gap: 1rem;
      font-size: 50px;

      .winner {
        &::before {
          content: ' & ';
        }
        &:first-of-type {
          &::before {
            content: '';
          }
        }
      }
    }
  }
}
</style>
