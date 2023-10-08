<script setup>
import RESULTS from './data/results.json'
import MatchRow from './components/MatchRow.vue'
import RecapTable from './components/RecapTable.vue'
</script>

<template>
  <h1>Résultats du 29e Mondial d'Improvisation</h1>

  <h2>Matchs de pool</h2>
  <ul>
    <MatchRow v-for="match in RESULTS.matchs_pool" :key="match.date" :match="match" />
  </ul>
  <p>⏰ Score après une impro supplémentaire</p>

  <h2>Tableau récapitulatif</h2>
  <RecapTable />
  <ul>
    <li>0 = perdu dans le temps règlementaire</li>
    <li>1 = perdu après une impro supplémentaire</li>
    <li>3 = gagné après une impro supplémentaire</li>
    <li>4 = gagné dans le temps règlementaire</li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

h2 {
  line-height: 1.5;
  padding: 10px 0;
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
