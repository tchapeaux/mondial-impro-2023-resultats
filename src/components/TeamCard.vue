<template>
  <li class="card" :style="{ backgroundColor: team.color }">
    <TeamFlag :team="team" />
    <span class="team-name">{{ team.name }}</span>
  </li>
</template>

<script setup>
import TeamFlag from './TeamFlag.vue'

defineProps({ team: { type: Object, required: true } })
</script>

<style scoped>
li.card {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 5px 10px;
  border-radius: 25px;
  color: black;
}

@media (max-width: 500px) {
  .team-name {
    display: none;
  }
}
</style>
