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

// const router = useRouter()
const go = () => {
  // if (name.value)
  // router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const placeholder = ref('')

// const { $emit } = useNuxtApp()

// watch(() => props.modelValue, (n) => {
//   $emit('ionInput', n)
// })
</script>

<template><!-- @keydown.enter="go" -->
<ion-input id="input" type="number" v-model="modelValue" :value="defaultValue || num" :placeholder="placeholder"
  autocomplete="off" p="x-4 y-2" m="t-5 x-1" text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700"
  outline="none active:none" :max="max" :maxlength="maxLength"
  @input="(event: any) => $emit('update:modelValue', +event.target.value)"
  ></ion-input>
</template>
