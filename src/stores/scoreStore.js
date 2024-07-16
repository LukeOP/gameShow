import { defineStore } from 'pinia'

function getState() {
  return {
    teams: [
      {
        id: 1,
        name: 'Team One',
        score: 0
      },
      {
        id: 2,
        name: 'Team Two',
        score: 0
      }
    ],
    teamCounter: 3,
    selectedTeam: 1,
    currentTurn: 1
  }
}

export const useScoreStore = defineStore('teamScores', {
  state: () => getState(),
  actions: {
    increaseScore(score) {
      this.getSelectedTeam.score += score
    },
    decreaseScore(score) {
      this.getSelectedTeam.score -= score
    },
    setTeamName(name) {
      this.getSelectedTeam.name = name
    },
    setSelectedTeam(team) {
      this.selectedTeam = team
    },
    nextTurn() {
      if (this.currentTurn < this.teams.length) {
        this.currentTurn++
      } else this.currentTurn = 1
      this.setSelectedTeam(this.currentTurn)
    },
    nextTeam() {
      this.selectedTeam = this.getNextTeam
    }
  },
  getters: {
    getCurrentTeam() {
      return this.teams.find((t) => t.id == this.currentTurn)
    },
    getSelectedTeam() {
      return this.teams.find((t) => t.id == this.selectedTeam)
    },
    getNextTeam() {
      if (this.selectedTeam < this.teams.length) {
        return this.selectedTeam + 1
      } else return 1
    },
    getWinningTeam() {
      const sortedTeams = this.teams.sort((a, b) => b.score - a.score)
      const highestScore = sortedTeams[0].score
      const winners = sortedTeams.filter((team) => team.score === highestScore)

      return winners.length === 1 ? [winners[0]] : winners
    }
  }
})
