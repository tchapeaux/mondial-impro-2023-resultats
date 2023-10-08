<template>
  <li
    :style="{
      backgroundColor: hasPlayed ? winColor : undefined,
      color: hasPlayed ? 'black' : undefined
    }"
  >
    <div>{{ match.date }}</div>
    <div>{{ match.place }}</div>
    <div>{{ teamDisplayName(match.team_1) }} - {{ teamDisplayName(match.team_2) }}</div>
    <div v-if="hasPlayed">
      {{ match.score_1 }} - {{ match.score_2 }} <span v-if="match.overtime">⏰</span>
    </div>
    <div v-if="hasPlayed">🏆 {{ teamDisplayName(winnerShort) }}</div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import RESULTS from '../data/results.json'

function teamDisplayName(shortHand) {
  const property = window.innerWidth < 500 ? 'emoji' : 'name'
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 15px;
  background-color: #444444;
  border-radius: 25px;
}
</style>
