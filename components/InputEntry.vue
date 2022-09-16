<script setup lang="ts">
const name = ref('')

// const router = useRouter()
const go = () => {
  // if (name.value)
  // router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <input id="input" v-model="name" placeholder="What's your name?" type="text" autocomplete="off" p="x-4 y-2" m="t-5"
    min-w="[50px]" text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
    @keydown.enter="go">
</template>
