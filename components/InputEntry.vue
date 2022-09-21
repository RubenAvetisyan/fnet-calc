<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    default: undefined
  },
  maxLength: {
    type: Number,
    default: undefined
  },
  defaultValue: {
    type: Number,
    default: undefined
  }
})

const num = ref(0)

const placeholder = ref('')
</script>

<template>
<ion-input id="input" type="number" inputmode="number" color="medium" v-model="modelValue" :value="defaultValue || num"
  :placeholder="placeholder"
  autocomplete="off" p="x-4 y-2" m="t-1 x-1" text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700"
  outline="none active:none" :max="max" :maxlength="maxLength"
  @input="(event: any) => $emit('update:modelValue', +event.target.value)"
  ></ion-input>
</template>
