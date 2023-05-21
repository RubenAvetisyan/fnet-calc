<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    defult: 'input'
  },
  modelValue: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    default: undefined,
  },
  maxLength: {
    type: Number,
    default: undefined,
  },
  defaultValue: {
    type: Number,
    default: undefined,
  },
})

const num = ref(0)

const placeholder = ref('')

const oninput = (value: number) => {
  if (!props.max)
    return value

  const isinvalid = value > props.max || value < 0 || Number.isNaN(value)

  const result = isinvalid ? 0 : value
  return result
}
</script>

<template>
    <ion-input :id="id" :value="modelValue || num" type="number" inputmode="number" color="medium"
            :placeholder="placeholder" autocomplete="off" text="center" bg="transparent" border="~ rounded" b-indigo-300
    outline="none active:none" :max="max" :maxlength="maxLength"
    @input="(event: any) => $emit('update:modelValue', oninput(parseInt(event.target.value)))" />
</template>
