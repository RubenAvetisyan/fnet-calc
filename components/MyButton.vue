<script setup lang="ts">
import { AnyARecord } from 'dns';

const props = defineProps({
    fn: {
        type: Function,
        default: () => { },
        required: true
    }
})
</script>

<template>
    <ion-button bg m-3 text-sm btn :disabled="!fn" @click="()=>fn()">
        <slot />
    </ion-button>
</template>
