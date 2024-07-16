import { defineStore } from 'pinia'
import { list } from '../assets/questionList'

function getState() {
  return {
    questionList: list,
    categories: [
      { id: 1, description: 'Michael', active: true },
      { id: 2, description: 'Hayley', active: true },
      { id: 3, description: 'Peter Section', active: true },
      { id: 4, description: 'Joel Section', active: true },
      { id: 5, description: 'NZ Geography', active: true }
    ],
    currentQuestion: 0,
    categoryCounter: 5,
    questionCounter: 0,
    questionsAnswered: 0
  }
}

export const useQuestionStore = defineStore('questionStore', {
  state: () => getState(),
  actions: {
    setCurrentQuestion(question_id) {
      this.currentQuestion = question_id
    },
    closeQuestion() {
      this.currentQuestion = 0
      this.questionsAnswered++
    }
  },
  getters: {
    getQuestion() {
      return this.questionList.find((q) => q.id == this.currentQuestion)
    },
    getCategories() {
      // const questionCategoryIds = this.questionList.map((q) => q.category)
      // return this.categories.filter((c) => questionCategoryIds.includes(c.id))
      return this.categories.filter((c) => c.active === true)
    },
    getGameCompleted() {
      if (this.questionList.length - this.questionsAnswered > 0) return false
      return true
    }
  }
})
