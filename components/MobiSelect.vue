<script setup lang="ts">
import { calendar } from 'ionicons/icons'
const props = defineProps({
  modelValue: {
    type: Number,
    // default: () => ([])
  },
  values: { type: Array<number>, default: () => ([11, 16, 21]), required: true },
  label: { type: String, default: '' }
})

const reference = computed(() => {
  return props.modelValue
})

const date = ref(useFormatISO)
</script>

<template><ion-list>
  <ion-item id="selectdate" color="primary" lines="inset">
    <ion-icon :icon="calendar" slot="end"></ion-icon>
    <ion-label v-if="label">{{label}}</ion-label>
    <ion-select color="premium" :value="modelValue" @ionChange="(event: any) => {
      $emit('update:modelValue', event.detail.value)
    }">
      <ion-select-option v-for="(value, i) in values" :key="i" :value="value" class="capitalize">
        {{value}}
      </ion-select-option>
    </ion-select>
  </ion-item>

  <ion-item lines="none">
    <ion-label color="warning"><span class="text-size-0.8rem">ակտիվ օրերի քանակ՝ {{ reference }}</span></ion-label>
  </ion-item>
  </ion-list>
</template>
