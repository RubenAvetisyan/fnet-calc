<template>
  <ion-datetime :id="id" :name="id" ref="datetime" size="cover" locale="hy"
    :presentation="dateAndTime ? 'date-time' : 'date'" :first-day-of-week="1" :multiple="multiple" :value="modelValue"
    :show-default-buttons="true" done-text="Հաստատել" cancel-text="Թողնել նույնը" :min="min" :max="nextMonthISO"
    :dayValues="dayValues" :is-date-enabled="isDateEabled" :title="title"
    @ionChange="(event: any) => $emit('update:modelValue', event.detail.value)">
    <span v-if="title" slot="title">{{title}}</span>
  </ion-datetime>
</template>

<script setup lang="ts">
import { getYear, getMonth, addMonths, endOfMonth, getDate, setDate, formatISO } from 'date-fns'

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
  isDateEabled: {
    type: Function,
    default: () => true
  },
  confirm: Function,
  cancel: Function
})

const datetime = ref()
const thisMonth = getMonth(Date.now())
const nextMonth = addMonths(new Date(), 1)
const nextMonthISO = formatISO(setDate(nextMonth, getDate(endOfMonth(nextMonth))))
console.log('nextMonthISO: ', nextMonthISO);
console.log('nextMonth: ', nextMonth);
const thisYear = [thisMonth, thisMonth + 1]
</script>
