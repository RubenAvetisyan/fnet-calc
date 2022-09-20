<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "hy"
  }
})

const price = ref(5000)
const percent = ref(0)
const billdays = [11, 16, 21]

const priceAfterDiscount = computed(() => {
  const pp: number = unref(price)
  const pc: number = unref(percent)

  return pp - (pp * pc / 100)
})
</script>

<template>
  <NuxtLayout name="home">
    <!-- <Suspense>
                                      <PageView />
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense> -->
    <grid>
      <row class="ion-align-items-center">
        <i-col class="ion-align-self-start">
          <ion-label color="primary" position="floating align-bottom" class="font-bold text-size-1rem">Սակագին
          </ion-label>
          <InputEntry class="max-w-md" v-model="price" />
        </i-col>
        <i-col class="ion-align-self-center max-w-sm">
          <ion-label color="primary" position="fixed" class="font-bold text-size-1rem">Զեղչ %</ion-label>
          <InputEntry class="w-25" v-model="percent" :max="100" :max-length="3" />
        </i-col>
        <i-col class="ion-align-self-end">
          <ion-label color="primary" position="fixed" class="font-bold text-size-1rem">Գումար</ion-label>
          <InputEntry class="w-25 font-bold" v-model="priceAfterDiscount" readonly />
        </i-col>
      </row>
    </grid>

    <CalculatorView :price="price" :percent="percent" :price-after-discount="priceAfterDiscount" :billdays="billdays" />

    <!-- <template #footer></template> -->

  </NuxtLayout>
</template>
