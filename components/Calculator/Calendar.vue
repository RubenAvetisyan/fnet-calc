<template>
  <ion-datetime :id="id" ref="datetime" size="cover" locale="hy" :presentation="dateAndTime ? 'date-time' : 'date'"
    :first-day-of-week="1" :multiple="multiple" :value="modelValue" :show-default-buttons="true" done-text="Հաստատել"
    cancel-text="Թողնել նույնը"
    :min="min"
    :dayValues="dayValues"
    :is-date-enabled="isDateEabled"
    :title="title"
    @ionChange="(event: any) => $emit('update:modelValue', event.detail.value)">
    <span v-if="title" slot="title">{{title}}</span>
  </ion-datetime>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, default: '' },
  title: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    // default: () => ([])
  },
  dateAndTime: { type: Boolean, default: false },
  min: {
    type: String,
    default: undefined
  },
  dayValues: {
    type: String,
    default: undefined
  },
  isDateEabled: Function,
  default: () => true
})

const datetime = ref()
</script>
