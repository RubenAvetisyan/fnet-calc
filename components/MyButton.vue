<script setup lang="ts">
import { calendar } from 'ionicons/icons'

const props = defineProps({
  identity: {
    type: String as () => Identifire,
    default: 'endDate',
  },
})

const { toggleIsEndDate } = useCalendarStore()

type Identifire = 'endDate' | 'startDate'

const onclick = () => {
  toggleIsEndDate(props.identity)
}
</script>

<template>
  <ion-button @click.stop="onclick">
    <template #start>
      <ion-icon :icon="calendar" />
    </template>
    <slot />
  </ion-button>
</template>
