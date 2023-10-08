<script setup>
import RESULTS from './data/results.json'
import MatchRow from './components/MatchRow.vue'
import RecapTable from './components/RecapTable.vue'
</script>

<template>
  <h1>Résultats du 29e Mondial d'Improvisation</h1>

  <a href="https://www.fbia.be/mondial-2023/" target="_blank">Plus d'infos</a>

  <h2>Matchs de pool</h2>
  <ul class="match-list">
    <MatchRow
      v-for="match in RESULTS.matchs_pool"
      :key="match.team_1 + match.team_2"
      :match="match"
    />
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
ul.match-list {
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 5px;
  column-gap: 10px;
}

h2 {
  line-height: 1.5;
  padding: 10px 0;
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }

  ul.match-list {
    grid-template-columns: 1fr;
  }
}
</style>
