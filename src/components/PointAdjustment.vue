<template>
  <div id="score">{{ score }}</div>
</template>

<script setup>
import { useScoreStore } from '@/stores/scoreStore'
import { ref } from 'vue'

const props = defineProps({
  currentScore: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  direction: {
    type: String,
    required: true,
    default: 'increase'
  }
})

const emit = defineEmits(['completed'])

const score = ref(props.currentScore)
const scoreStore = useScoreStore()

const incrementScore = () => {
  const increment = props.direction === 'increase' ? 5 : -5
  const targetScore =
    props.direction === 'increase'
      ? props.currentScore + props.value
      : props.currentScore - props.value

  const interval = setInterval(() => {
    if (
      (props.direction === 'increase' && score.value < targetScore) ||
      (props.direction === 'decrease' && score.value > targetScore)
    ) {
      score.value += increment
    } else {
      clearInterval(interval)
      scoreStore.getSelectedTeam.score = score.value
      emit('completed')
    }
  }, 15) // adjust the delay (in ms) to control the speed of increment
}

incrementScore()
</script>

<style lang="scss" scoped>
#score {
  font-size: 150px;
}
</style>
