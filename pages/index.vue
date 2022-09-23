<script setup lang="ts">
import { storeToRefs } from 'pinia';

useHead({
  htmlAttrs: {
    lang: 'hy',
  },
})

const { percent, price, priceAfterDiscount } = storeToRefs(useCalcStore())

</script>

<template>
  <NuxtLayout name="home">
    <grid>
      <row class="mx-auto">
        <i-col class="mx-auto max-w-xl">
          <ion-label color="primary" position="fixed align-bottom" class="font-bold text-size-1rem">
            Սակագին
          </ion-label>
          <InputEntry v-model="price" />
        </i-col>
        <i-col class="mx-auto max-w-xs sm:w-xs">
          <ion-label color="primary" position="fixed align-bottom" class="font-bold text-size-1rem">
            Զեղչ %
          </ion-label>
          <InputEntry v-model="percent" :max="100" :max-length="3" />
        </i-col>
        <i-col class="mx-auto  max-w-md sm:w-xs">
          <ion-label color="primary" position="fixed align-bottom" class="font-bold text-size-1rem">
            Գումար
          </ion-label>
          <InputEntry :value="useRoundUp(priceAfterDiscount, 1)" class="font-bold" readonly />
        </i-col>
      </row>
      </grid>

    <CalculatorView :price="price" :percent="percent" :price-after-discount="priceAfterDiscount" />
  </NuxtLayout>
</template>
