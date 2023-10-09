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

function openScoreHint() {
  document.querySelector('#score-explications').showModal()
}

function closeScoreHint() {
  document.querySelector('#score-explications').close()
}
</script>

<template>
  <img class="header-pic" aria-role="none" src="/dall-e-3-chibi-astro.png" />
  <h1 class="hero-title">Récap</h1>
  <p class="hero-sub">du 29e Mondial d'Impro</p>

  <p>
    <a href="https://www.fbia.be/mondial-2023/" target="_blank">Plus d'infos</a>
  </p>

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

  <h2 class="header-with-tooltip">
    Tableau des scores
    <button class="tooltip" @click="openScoreHint">?</button>
    <dialog id="score-explications">
      <div class="content">
        <h3>Scores de match</h3>
        <ul class="small">
          <li>0 = perdu dans le temps règlementaire</li>
          <li>1 = perdu après une impro supplémentaire</li>
          <li>3 = gagné après une impro supplémentaire</li>
          <li>4 = gagné dans le temps règlementaire</li>
        </ul>
        <button @click="closeScoreHint">Fermer</button>
      </div>
    </dialog>
  </h2>
  <div class="recap-table">
    <RecapTable :results="RESULTS" />
  </div>

  <div class="finale-section">
    <h2>🏆 Finale 🏆</h2>
    <MatchRow :match="RESULTS.finale" />
  </div>

  <img class="footer-img" aria-role="none" src="/dall-e-3-illustration-control-room.jpeg" />
  <footer class="footer-text">
    <p>Maintenu par Thomas Chapeaux</p>
    <p>
      29e Mondial d'Impro organisé par <a href="https://www.fbia.be" target="_blank">la FBIA</a>
    </p>
    <p>Illustrations par Dall·E 3</p>
  </footer>
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

.header-with-tooltip {
  display: flex;
  align-items: baseline;
}

.tooltip {
  padding: 2px;
  margin: 2px;
  margin-left: 10px;
  border-radius: 50%;
  background: var(--color-background);
  color: var(--color-text);

  border: var(--color-text) 3px solid;

  font-size: 1rem;
  font-weight: 900;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: 1.5rem;

  cursor: pointer;
}

.tooltip:hover {
  background-color: var(--color-text);
  color: var(--color-background);
}

dialog {
  margin: auto;
}

#score-explications {
  background-color: var(--dark-secondary);
  color: var(--color-text);

  border-color: var(--light-secondary);
  border-radius: 15px;
}

#score-explications .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

#score-explications button {
  border: 0;
  background-color: var(--light-secondary);
  color: var(--color-background);
  padding: 5px 10px;
  border-radius: 25px;
  font-size: 1.4rem;
  cursor: pointer;
}

#score-explications ul {
  list-style: none;
  padding: 0;
  margin: 0;
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
