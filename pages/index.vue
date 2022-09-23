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
    <ion-card>
      <ion-card-content>
        <grid>
          <row class="justify-center text-center self-center items-center content-center">
            <i-col class="max-w-lg">
              <ion-label color="primary" position="floating align-bottom" class="font-bold text-size-1rem">
                Սակագին
              </ion-label>
              <InputEntry v-model="price" />
            </i-col>
            <i-col class="max-w-sm">
              <ion-label color="primary" position="fixed" class="font-bold text-size-1rem">
                Զեղչ %
              </ion-label>
              <InputEntry v-model="percent" :max="100" :max-length="3" />
            </i-col>
            <i-col class="max-w-md">
              <ion-label color="primary" position="fixed" class="font-bold text-size-1rem">
                Գումար
              </ion-label>
              <InputEntry :value="useRoundUp(priceAfterDiscount, 1)" class="font-bold" readonly />
            </i-col>
          </row>
        </grid>
      </ion-card-content>
    </ion-card>
    
    <CalculatorView :price="price" :percent="percent" :price-after-discount="priceAfterDiscount" />
  </NuxtLayout>
</template>
