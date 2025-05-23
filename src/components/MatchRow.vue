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
      <div class="spacer" />
      <a
        v-if="match.article_url"
        class="article-link"
        :href="match.article_url"
        target="_blank"
        >Voir le résumé</a
      >
    </div>
    <div class="score">
      <template v-if="hasPlayed">
        <div class="small-score">
          <TeamFlag :team="team_1" />
          <span :class="{ winner: winnerShort === match.team_1 }">
            {{ match.score_1 }}
          </span>
          -
          <span :class="{ winner: winnerShort === match.team_2 }">
            {{ match.score_2 }}
          </span>
          <TeamFlag :team="team_2" />
        </div>
        <div
          class="overtime"
          v-if="match.overtime"
          title="Impro supplémentaire"
          :style="{
            backgroundColor: loserColor
          }"
        >
          ⏰
        </div>
      </template>
      <template v-else>
        <div class="small-score"><TeamFlag :team="team_1" /> - <TeamFlag :team="team_2" /></div>
      </template>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'

import TeamFlag from './TeamFlag.vue'
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
</script>

<style scoped>
li {
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: var(--dark-secondary);
  border-radius: 25px;
  width: 100%;
}

.header {
  display: flex;
  gap: 15px;

  font-size: 0.7rem;

  .spacer {
    flex-grow: 1;
  }
}

.score {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  align-items: center;
}

.small-score {
  display: flex;
  align-items: center;
  gap: 10px;
}

.overtime {
  height: 2rem;
  width: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  border-radius: 50%;
  border: 2px solid orangered;
}

.winner {
  font-weight: 900;
}

.article-link {
  color: black;
}
</style>
