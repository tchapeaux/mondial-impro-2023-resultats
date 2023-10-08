<template>
  <table class="recap-scores">
    <tr>
      <th></th>
      <th
        v-for="t in results.teams"
        :key="t.short"
        :style="{ backgroundColor: t.color, color: 'black' }"
      >
        {{ t.emoji }}
      </th>
      <th>Total</th>
    </tr>
    <tr v-for="t in results.teams" :key="t.short">
      <td :style="{ backgroundColor: t.color, color: 'black' }">
        <span>{{ t.emoji }}</span>
        <span class="row-name">{{ t.name }}</span>
      </td>
      <td v-for="t2 in results.teams" :key="t2.short">
        <span v-if="t === t2">/</span>
        <span v-else>{{ scoreTable[t.short][t2.short] }}</span>
      </td>
      <td>{{ sumTable[t.short] }}</td>
    </tr>
  </table>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ results: { type: Object, required: true } })

function getMatchScores(match) {
  const winner = match.score_1 > match.score_2 ? match.team_1 : match.team_2
  const loser = match.score_1 > match.score_2 ? match.team_2 : match.team_1

  return match.overtime ? { [winner]: 3, [loser]: 1 } : { [winner]: 4, [loser]: 0 }
}

const scoreTable = computed(() => {
  const scores = {}

  props.results.teams.forEach((t) => {
    const teamScore = {}

    props.results.teams.forEach((t2) => {
      if (t === t2) {
        return
      }

      const match = props.results.matchs_pool.find(
        (m) =>
          (m.team_1 === t.short && m.team_2 === t2.short) ||
          (m.team_1 === t2.short && m.team_2 === t.short)
      )

      const hasPlayed = typeof match.score_1 === 'number'
      if (hasPlayed) {
        const score = getMatchScores(match)
        teamScore[t2.short] = score[t.short]
      }
    })

    scores[t.short] = teamScore
  })

  return scores
})

const sumTable = computed(() => {
  const sums = {}

  Object.keys(scoreTable.value).forEach((t) => {
    let sum = 0
    Object.values(scoreTable.value[t]).forEach((val) => (sum += val))
    sums[t] = sum
  })

  return sums
})
</script>

<style scoped>
td:first-child {
  text-align: left;
}

td:last-child {
  font-weight: 900;
}

th:last-child {
  font-weight: 900;
}

.row-name {
  margin-left: 10px;
}

@media (max-width: 600px) {
  .row-name {
    display: none;
  }
}

table.recap-scores tr {
  text-align: center;
}

table.recap-scores tr:nth-child(even) {
  background-color: var(--dark-secondary);
}

.recap-scores th,
.recap-scores td {
  padding: 5px;
  border: 1px solid var(--light-secondary);
}

@media (min-width: 600px) {
  .recap-scores th,
  .recap-scores td {
    padding: 10px;
  }
}
</style>
