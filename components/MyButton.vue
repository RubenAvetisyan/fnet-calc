<script setup lang="ts">
import { calendar } from 'ionicons/icons';

const props = defineProps({
    fn: {
        type: Function,
        default: () => { },
    }
})
</script>

<template>
    <ion-button @click="fn">
        <ion-icon slot="start" :icon="calendar"></ion-icon>
        <slot />
    </ion-button>
</template>
