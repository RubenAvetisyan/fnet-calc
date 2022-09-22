<template>
  <ion-datetime :id="id" :name="id" ref="datetime" size="cover" locale="hy" :presentation="dateTime"
    :first-day-of-week="1" :multiple="multiple" :value="modelValue" :show-default-buttons="true" done-text="Հաստատել"
    cancel-text="Թողնել նույնը" :min="min" :max="maxDate" :dayValues="dayValues" :is-date-enabled="isDateEabled"
    :title="title" @ionChange="(event: any) => $emit('update:modelValue', event.detail.value)">
    <span v-if="title" slot="title">{{title}}</span>
    <ion-buttons slot="buttons">
      <ion-button color="primary" @click="cancel()">Թողնել նույնը</ion-button>
      <ion-button color="primary" @click="confirm()">Հաստատել</ion-button>
    </ion-buttons>
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
  max: {
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
  confirm: {
    type: Function,
    default: () => { }
  },
  cancel: {
    type: Function,
    default: () => { }
  }
})

const datetime = ref()
const reset = () => {
  datetime.value.$el.reset()
};
const cancel = () => {
  props.cancel()
  datetime.value.$el.cancel()
};
const confirm = () => {
  props.confirm()
  datetime.value.$el.confirm()
};

const dateTime = computed(() => props.dateAndTime ? 'date-time' : 'date')


const maxDate = computed(() => {
  if (props.max) return props.max

  const nextMonth = useAddMonths(new Date(), 1)
  const nextMonthISO = useFormatISO(useSetDate(nextMonth, useGetDate(useEndOfMonth(nextMonth))))

  return nextMonthISO
})
</script>
