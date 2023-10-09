<template>
  <img v-if="team" :alt="team.name" :src="team.flag" :title="team.name" />
  <span v-else>??</span>
</template>

<script setup>
defineProps({ team: { type: Object, defaut: {} } })
</script>

<style scoped>
img {
  width: 1.5rem;
}

@media (min-width: 600px) {
  img {
    width: 2rem;
  }
}
</style>
