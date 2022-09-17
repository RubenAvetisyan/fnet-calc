<script setup lang="ts">

const props = defineProps({
    fn: {
        type: Function,
        default: () => { },
    }
})
</script>

<template>
    <ion-button color="primary" @click="fn">
        <slot />
    </ion-button>
</template>
