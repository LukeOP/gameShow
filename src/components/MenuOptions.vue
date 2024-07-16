<template>
  <div id="background">
    <div id="side-menu">
      <div id="close" @click="$emit('close', false)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </div>
      <h1 class="menu-title">Game Options:</h1>
      <div class="menu-sections">
        <span
          :class="{ active: currentSection == 'categories' }"
          @click="currentSection = 'categories'"
          >Categories</span
        >
        <span
          :class="{ active: currentSection == 'questions' }"
          @click="currentSection = 'questions'"
          >Questions</span
        >
        <!-- <span :class="{ active: currentSection == 'teams' }" @click="currentSection = 'teams'"
          >Teams</span
        > -->
      </div>
      <Transition name="fade" mode="out-in">
        <!-- Categories -->
        <div class="category-selection" v-if="currentSection == 'categories'">
          <h2>Categories</h2>
          <div class="category-headings">
            <CategoryInput :id="1">Category One:</CategoryInput>
            <CategoryInput :id="2">Category Two:</CategoryInput>
            <CategoryInput :id="3">Category Three:</CategoryInput>
            <CategoryInput :id="4">Category Four:</CategoryInput>
            <CategoryInput :id="5">Category Five:</CategoryInput>
          </div>
        </div>
        <!-- Questions -->
        <div class="question-section" v-else-if="currentSection == 'questions'">
          <h2>Questions</h2>
          <select v-model="selectedCategory">
            <option
              :value="category.id"
              v-for="category in questionStore.categories"
              :key="category.id"
            >
              Category {{ category.id + ' - ' + category.description }}
            </option>
          </select>
          <div id="question-answer">
            <MenuQuestionAnswer
              v-for="(question, index) in questions"
              :key="index"
              :question="question"
            />
          </div>
        </div>
        <!-- Teams -->
        <div class="teams-section" v-else-if="currentSection == 'teams'">
          <h2>Teams</h2>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { useQuestionStore } from '@/stores/questionsStore'
import CategoryInput from './CategoryInput.vue'
import MenuQuestionAnswer from './MenuQuestionAnswer.vue'
import { computed, ref } from 'vue'

const currentSection = ref('categories')
const questionStore = useQuestionStore()
const selectedCategory = ref(1)
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['close'])

const questions = computed(() => {
  return questionStore.questionList.filter((q) => q.category === selectedCategory.value)
})
</script>

<style lang="scss" scoped>
#background {
  background-color: rgba(0, 0, 0, 0.44);
  position: fixed;
  top: 0;
  left: 0px;
  width: 100vw;
  height: 100vh;

  #side-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 30%;
    max-width: 90%;
    min-width: 300px;
    height: 100%;
    background-color: white;
    padding: 10px 20px;
    #close {
      position: absolute;
      width: 20px;
      right: 30px;
      top: 20px;
      &:hover {
        svg {
          fill: rgb(45, 45, 192);
          cursor: pointer;
        }
      }
    }
    .menu-title {
      font-size: 50px;
    }
    .menu-sections {
      display: flex;
      gap: 1rem;
      span {
        cursor: pointer;
        padding: 5px 10px;
      }
      .active {
        color: rgb(19, 25, 89);
        border-bottom: 3px solid rgb(12, 25, 89);
      }
    }
    .category-selection {
      margin-top: 2rem;
      select {
        padding: 5px 20px;
        border-radius: 1rem;
      }
      .category-headings {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
    .question-section {
      margin-top: 2rem;

      select {
        width: 100%;
        border-radius: 0.5rem;
        padding: 5px 20px;
        border: 1px solid grey;
        margin-bottom: 2rem;
      }
      #question-answer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
    .teams-section {
      margin-top: 2rem;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
