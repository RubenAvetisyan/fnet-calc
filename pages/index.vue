<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "hy"
  }
})

const price = ref(5000)
const percent = ref(0)


const priceAfterDiscount = computed(() => {
  const pp: number = unref(price)
  const pc: number = unref(percent)

  return pp - (pp * pc / 100)
})
</script>

<template>
  <NuxtLayout name="home">
    <grid>
      <row class="ion-align-items-center">
        <i-col class="ion-align-self-start">
          <ion-label color="primary" position="floating align-bottom" class="font-bold text-size-1rem">Սակագին
          </ion-label>
          <InputEntry v-model="price" />
        </i-col>
        <i-col size="3" class="ion-align-self-center max-w-sm">
          <ion-label color="primary" position="fixed" class="font-bold text-size-1rem">Զեղչ %</ion-label>
          <InputEntry v-model="percent" :max="100" :max-length="3" />
        </i-col>
        <i-col class="ion-align-self-end">
          <ion-label color="primary" position="fixed" class="font-bold text-size-1rem">Գումար</ion-label>
          <InputEntry class="font-bold" v-model="priceAfterDiscount" readonly />
        </i-col>
      </row>
    </grid>
  
    <CalculatorView :price="price" :percent="percent" :price-after-discount="priceAfterDiscount" />
  </NuxtLayout>
</template>
