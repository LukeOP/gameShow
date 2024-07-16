<template>
  <header id="score-header">
    <div></div>
    <div id="score-section">
      <div
        v-for="team in teamScore.teams"
        :key="team"
        class="team"
        :class="{ active: teamScore.currentTurn == team.id }"
        @click="setActiveTeam(team.id)"
      >
        <span class="team-name">{{ team.name }}: </span>
        <span class="team-score">{{ team.score }}</span>
      </div>
    </div>
    <div class="menu-icon">
      <span @click="$emit('menu', true)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </span>
    </div>
  </header>
</template>

<script setup>
import { useScoreStore } from '@/stores/scoreStore'
import SpacerTemplate from './SpacerTemplate.vue'

const teamScore = useScoreStore()
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['menu'])

function setActiveTeam(team) {
  teamScore.setSelectedTeam(team)
}
</script>

<style lang="scss" scoped>
#score-header {
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  #score-section {
    display: flex;
    gap: 20px;
    justify-content: center;
    .team {
      padding: 0px 20px;
      cursor: pointer;
      color: rgb(179, 179, 179);
      .team-name {
        font-size: 40px;
      }
      .team-score {
        font-size: 40px;
      }
    }
    .active {
      color: orange;
      .team-name {
        opacity: 1;
      }
    }
  }
  .menu-icon {
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 10px;
    span {
      height: 100%;
      width: 30px;
      svg {
        fill: rgb(179, 179, 179);
        max-height: 30px;
        &:hover {
          cursor: pointer;
          fill: white;
        }
      }
    }
  }
}
</style>
