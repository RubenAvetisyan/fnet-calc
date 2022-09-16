<script setup lang="ts">
const props = defineProps({
    fn: {
        typeL Function,
        default: () => { }
    }
})
</script>

<template>
    <button m-3 text-sm btn :disabled="!name" @click="fn">
        <slot />
    </button>
</template>