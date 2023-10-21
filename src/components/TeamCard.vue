<template>
  <a class="card" :href="team.info_url" target="_blank" :style="{ backgroundColor: team.color }">
    <TeamFlag :team="team" />
    <span class="team-name">{{ team.name }}</span>
  </a>
</template>

<script setup>
import TeamFlag from './TeamFlag.vue'

defineProps({ team: { type: Object, required: true } })
</script>

<style scoped>
a.card {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 5px 10px;
  border: transparent 5px solid;
  border-radius: 25px;
  color: black;

  text-decoration: none;

  transition:
    scale 0.2s ease,
    border-color 0.2s ease;
}

a.card:hover {
  border-color: var(--light-secondary);
  scale: 1.1;
}

@media (max-width: 500px) {
  .team-name {
    display: none;
  }
}
</style>
