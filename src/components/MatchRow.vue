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
      <div v-if="!hasPlayed"><a :href="ticketsUrl" target="_blank">Tickets</a></div>
    </div>
    <div class="score">
      <template v-if="hasPlayed">
        <div>
          <span :class="{ winner: winnerShort === match.team_1 }">
            {{ teamDisplayName(match.team_1) }} {{ match.score_1 }}
          </span>
          -
          <span :class="{ winner: winnerShort === match.team_2 }">
            {{ match.score_2 }} {{ teamDisplayName(match.team_2) }}
          </span>
        </div>
        <div v-if="match.overtime">⏰</div>
      </template>
      <template v-else>
        <div>{{ teamDisplayName(match.team_1) }} - {{ teamDisplayName(match.team_2) }}</div>
      </template>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import RESULTS from '../data/results.json'

function teamDisplayName(shortHand) {
  // const property = window.innerWidth < 700 ? 'emoji' : 'name'
  const property = 'emoji'
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

const ticketsUrl = computed(() => {
  if (props.match.date.includes('28')) {
    // Finale
    return 'https://www.fbia.be/billetterie/la-finale/'
  }

  const team1Name = RESULTS.teams.find((t) => t.short === props.match.team_1).name.replace('é', 'e')
  const team2Name = RESULTS.teams.find((t) => t.short === props.match.team_2).name.replace('é', 'e')

  return `https://www.fbia.be/billeterie/${team1Name.toLowerCase()}-vs-${team2Name.toLocaleLowerCase()}/`
})
</script>

<style scoped>
li {
  padding: 15px;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: var(--dark-secondary);
  border-radius: 25px;
}

.header {
  display: flex;
  gap: 15px;

  font-size: 0.7rem;
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
