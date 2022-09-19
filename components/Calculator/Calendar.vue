<template>
  <ion-datetime id="datetime" ref="datetime" size="cover" locale="hy" :presentation="!dateAndTime ? 'date-time' : 'date'"
    :first-day-of-week="1" :multiple="false" :value="modelValue" :show-default-buttons="true" done-text="Հաստատել"
    cancel-text="Թողնել նույնը"
    :min="min"
    @ionChange="(event: any) => $emit('update:modelValue', event.detail.value)">
    <span slot="title">Նշել միացման օրվա ամսաթիվը</span>
  </ion-datetime>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Array<number>,
    // default: () => ([])
  },
  id: { type: String, default: '' },
  dateAndTime: { type: Boolean, default: () => true },
  min: {
    type: String,
    default: undefined
  }
})

const datetime = ref()

const confirm = () => datetime.value.$el.confirm()
</script>
