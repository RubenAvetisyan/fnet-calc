<script setup lang="ts">
const props = defineProps({
  id: { type: String, default: '' },
  title: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    // default: () => ([])
  },
  dateAndTime: { type: Boolean, default: false },
  min: {
    type: String,
    default: undefined,
  },
  max: {
    type: String,
    default: undefined,
  },
  dayValues: {
    type: String,
    default: undefined,
  },
  isDateEabled: {
    type: Function,
    default: () => true,
  },
})

const { toggleIsEndDate } = useCalendarStore()

type Identifire = 'endDate' | 'startDate'

const datetime = ref()
const reset = () => {
  datetime.value.$el.reset()
}

const cancel = <T extends Identifire>(name: T) => {
  toggleIsEndDate(name)
  datetime.value.$el.cancel()
}

const confirm = <T extends Identifire>(name: T) => {
  toggleIsEndDate(name)
  datetime.value.$el.confirm()
}

const dateTime = computed(() => props.dateAndTime ? 'date-time' : 'date')

const maxDate = computed(() => {
  if (props.max)
    return props.max

  const nextMonth = useAddMonths(new Date(), 1)
  const nextMonthISO = useFormatISO(useSetDate(nextMonth, useGetDate(useEndOfMonth(nextMonth))))

  return nextMonthISO
})
</script>

<template>
  <ion-datetime
    :id="id" ref="datetime" :name="id" size="cover" locale="hy" :presentation="dateTime"
    :first-day-of-week="1" :multiple="multiple" :value="modelValue" :show-default-buttons="true" done-text="Հաստատել"
    cancel-text="Թողնել նույնը" :min="min" :max="maxDate" :day-values="dayValues" :is-date-enabled="isDateEabled"
    :title="title" @ion-change="(event: any) => $emit('update:modelValue', event.detail.value)"
  >
    <template #title>
      <span v-if="title">{{ title }}</span>
    </template>
    <template #buttons>
      <ion-buttons>
        <ion-button color="primary" @click="cancel(id as Identifire)">
          Թողնել նույնը
        </ion-button>
        <ion-button color="primary" @click="confirm(id as Identifire)">
          Հաստատել
        </ion-button>
      </ion-buttons>
    </template>
  </ion-datetime>
</template>
