<script setup lang="ts">

const props = defineProps({
    fn: {
        type: Function,
        default: () => { },
    }
})
</script>

<template>
    <ion-button color="Primary" :fill="'outline'" @click="fn">
        <slot />
    </ion-button>
</template>
