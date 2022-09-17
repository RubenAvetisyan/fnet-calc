<template>
  <ion-item>
    <ion-label v-if="label">{{label}}</ion-label>
    <ion-select :value="modelValue" @ionChange="(event: any) => $emit('update:modelValue', event.detail.value)">
      <ion-select-option v-for="(value, i) in values" :key="i" :value="value" class="capitalize">
        {{value}}
      </ion-select-option>
    </ion-select>
  </ion-item>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number,
    // default: () => ([])
  },
  values: { type: Array, default: () => ([]), required: true },
  label: { type: String, default: '' }
})
</script>
