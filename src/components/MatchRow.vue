<template>
  <li
    :style="{
      backgroundColor: hasPlayed ? winColor : undefined,
      color: hasPlayed ? 'black' : undefined
    }"
  >
    <div class="header">
      <div>{{ match.date.replace('/2023', '') }}</div>
      <div>{{ match.place }}</div>
    </div>
    <div class="score">
      <div v-if="hasPlayed">
        <span :class="{ winner: winnerShort === match.team_1 }"
          >{{ teamDisplayName(match.team_1) }} {{ match.score_1 }}</span
        >
        -
        <span :class="{ winner: winnerShort === match.team_2 }"
          >{{ match.score_2 }} {{ teamDisplayName(match.team_2) }}</span
        >
      </div>
      <div v-else>{{ teamDisplayName(match.team_1) }} - {{ teamDisplayName(match.team_2) }}</div>

      <span v-if="match.overtime">⏰</span>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import RESULTS from '../data/results.json'

function teamDisplayName(shortHand) {
  const property = window.innerWidth < 700 ? 'emoji' : 'name'
  return RESULTS.teams.find((t) => t.short === shortHand)?.[property] || shortHand
}

const props = defineProps({
  match: { type: Object, required: true }
})

const hasPlayed = computed(() => typeof props.match.score_1 === 'number')
const winnerShort = computed(() =>
  props.match.score_1 > props.match.score_2 ? props.match.team_1 : props.match.team_2
)
const winColor = computed(() => {
  if (!hasPlayed.value) {
    return null
  }

  return RESULTS.teams.find((t) => t.short === winnerShort.value).color
})
</script>

<style scoped>
li {
  padding: 15px;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #444444;
  border-radius: 25px;
}

@media (min-width: 600px) {
  li {
    flex-direction: row;
    gap: 15px;
  }
}

.header {
  display: flex;
  gap: 15px;
}

.score {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.winner {
  font-weight: 900;
}
</style>
