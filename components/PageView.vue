<script setup lang="ts">
const ionRouter = useIonRouter()

const { data } = await useFetch('/api/pageview')

const time = useTimeAgo(computed(() => data.value.startAt))
</script>

<template>
  <div></div>
</template>
