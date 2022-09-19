<script setup lang="ts">

const props = defineProps({
    fn: {
        type: Function,
        default: () => { },
    }
})
</script>

<template>
    <ion-button color="tertiary" :fill="'outline'" class="text-purple-700" @click="fn">
        <slot />
    </ion-button>
</template>
