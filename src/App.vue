<script setup>
import RESULTS from './data/results.json'
import MatchRow from './components/MatchRow.vue'
import RecapTable from './components/RecapTable.vue'
import TeamCard from './components/TeamCard.vue'

// Check for "fake-data" cheat code
if (new URLSearchParams(window.location.search).get('fakeData')) {
  RESULTS.matchs_pool.forEach((m, idx) => {
    if (idx >= 6) {
      return
    }
    m.score_1 = Math.round(8 + Math.random() * 8)
    m.score_2 = Math.round(8 + Math.random() * 8)
    if (m.score_2 === m.score_1) {
      // hack 🤫
      m.score_2++
    }
    m.overtime = Math.random() > 0.6
  })
}
</script>

<template>
  <img class="header-pic" aria-role="none" src="/dall-e-3-chibi-astro.png" />
  <h1 class="hero-title">Récap</h1>
  <p class="hero-sub">du 29e Mondial d'Improvisation Théâtrale</p>

  <p><a href="https://www.fbia.be/mondial-2023/" target="_blank">Plus d'infos</a></p>

  <h2>Équipes</h2>
  <ul class="teams-list">
    <TeamCard v-for="t in RESULTS.teams" :key="t.short" :team="t" />
  </ul>

  <h2>Matchs de pool</h2>
  <p v-if="RESULTS.matchs_pool.some((m) => m.overtime)" class="small">⏰ = impro supplémentaire</p>
  <ul class="match-list">
    <MatchRow
      v-for="match in RESULTS.matchs_pool"
      :key="match.team_1 + match.team_2"
      :match="match"
    />
  </ul>

  <h2>Tableau des scores</h2>
  <div class="recap-table">
    <RecapTable :results="RESULTS" />
    <ul class="small">
      <li>0 = perdu dans le temps règlementaire</li>
      <li>1 = perdu après une impro supplémentaire</li>
      <li>3 = gagné après une impro supplémentaire</li>
      <li>4 = gagné dans le temps règlementaire</li>
    </ul>
  </div>

  <div class="finale-section">
    <h2>🏆 Finale 🏆</h2>
    <MatchRow :match="RESULTS.finale" />
  </div>

  <img class="footer-img" aria-role="none" src="/dall-e-3-illustration-control-room.jpeg" />
  <p class="footer-text">Maintenu par Thomas Chapeaux<br />Illustrations par Dall·E 3</p>
</template>

<style scoped>
.header-pic {
  position: absolute;
  width: 150px;
  right: 20px;
}

h1.hero-title {
  font-size: 1.9rem;
  /* leave room for header pic */
  width: calc(100% - 120px);
}

.hero-sub {
  /* leave room for header pic */
  width: calc(100% - 120px);
}

ul.match-list {
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: 1fr;
  row-gap: 5px;
  column-gap: 10px;
}

h2 {
  line-height: 1.5;
  padding: 10px 0;
}

.small {
  font-size: 0.8rem;
}

.recap-table {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
}

.recap-table ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

ul.teams-list {
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

@media (min-width: 600px) {
  ul.match-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 900px) {
  ul.match-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.finale-section {
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-img {
  width: 100%;
  max-width: 400px;
  align-self: center;
}

.footer-text {
  font-size: 0.7rem;
  width: 100%;
  text-align: center;
}
</style>
