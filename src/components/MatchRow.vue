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
            <TeamFlag :team="team_1" /> {{ match.score_1 }}
          </span>
          -
          <span :class="{ winner: winnerShort === match.team_2 }">
            {{ match.score_2 }} <TeamFlag :team="team_2" />
          </span>
        </div>
        <div
          class="overtime"
          v-if="match.overtime"
          :style="{
            backgroundColor: loserColor
          }"
        >
          ⏰
        </div>
      </template>
      <template v-else>
        <div><TeamFlag :team="team_1" /> - <TeamFlag :team="team_2" /></div>
      </template>
    </div>
  </li>
</template>

<script setup>
import TeamFlag from './TeamFlag.vue'

import { computed } from 'vue'
import RESULTS from '../data/results.json'

const props = defineProps({
  match: { type: Object, required: true }
})

const hasPlayed = computed(() => typeof props.match.score_1 === 'number')

const team_1 = computed(() => RESULTS.teams.find((t) => t.short === props.match.team_1))
const team_2 = computed(() => RESULTS.teams.find((t) => t.short === props.match.team_2))

const winnerShort = computed(() =>
  props.match.score_1 > props.match.score_2 ? props.match.team_1 : props.match.team_2
)
const loserShort = computed(() =>
  props.match.score_1 > props.match.score_2 ? props.match.team_2 : props.match.team_1
)
const winColor = computed(() => {
  if (!hasPlayed.value) {
    return null
  }

  return RESULTS.teams.find((t) => t.short === winnerShort.value).color
})
const loserColor = computed(() => {
  if (!hasPlayed.value) {
    return null
  }

  return RESULTS.teams.find((t) => t.short === loserShort.value).color
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

  align-items: center;
}

.overtime {
  padding: 5px;
  border-radius: 50%;
}

.winner {
  font-weight: 900;
}
</style>
