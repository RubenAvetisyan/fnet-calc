<script setup lang="ts">
import { storeToRefs } from 'pinia';

definePageMeta({ auth: false })

useHead({
  htmlAttrs: {
    lang: 'hy',
  }
})

const { percent, price, priceAfterDiscount } = storeToRefs(useCalcStore())

</script>

<template>
  <NuxtLayout name="home">
    <grid>
      <row mx-auto>
        <i-col mx-auto max-w-xl>
          <ion-label position="fixed align-bottom" font-bold text-size-1rem text-brand-primary>
            Սակագին
          </ion-label>
          <InputEntry id="price" v-model="price" />
        </i-col>
        <i-col mx-auto max-w-xs sm:w-xs>
          <ion-label position="fixed align-bottom" font-bold text-size-1rem text-brand-primary>
            Զեղչ %
          </ion-label>
          <InputEntry id="percent" v-model="percent" :max="100" :max-length="3" />
        </i-col>
        <i-col mx-auto max-w-md sm:w-xs>
          <ion-label position="fixed align-bottom" font-bold text-size-1rem text-brand-primary>
            Գումար
          </ion-label>
          <InputEntry id="after-discont" :value="useRoundUp(priceAfterDiscount, 1)" class="font-bold" readonly />
        </i-col>
      </row>
    </grid>

    <CalculatorView :price="price" :percent="percent" :price-after-discount="priceAfterDiscount" />
  </NuxtLayout>
</template>
