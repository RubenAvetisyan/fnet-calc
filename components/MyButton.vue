<script setup lang="ts">
import { calendar } from 'ionicons/icons';

const { toggleIsEndDate } = useCalendarStore()

type Identifire = 'endDate' | 'startDate'

const props = defineProps({
    identity: {
        type: String as () => Identifire,
        default: 'endDate',
    }
})

const onclick = () => {
    toggleIsEndDate(props.identity)
}
</script>

<template>
    <ion-button @click.stop="onclick">
        <ion-icon slot="start" :icon="calendar"></ion-icon>
        <slot />
    </ion-button>
</template>
