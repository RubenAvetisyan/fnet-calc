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
    <Suspense>
      <!-- <PageView /> -->
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <grid class="flex justify-between  mx-auto px-5">
      <i-col size="4" class="basis-1/2 mx-auto max-w-md">
        <ion-label position="floating align-bottom" class="text-purple-700 font-bold text-size-1rem">Սակագնային
        </ion-label>
        <InputEntry class="max-w-md" v-model="price" />
      </i-col>
      <i-col size="3" class="basis-1/2 max-w-sm mx-auto">
        <ion-label position="fixed" class="text-purple-700 font-bold text-size-1rem">Զեղչ %`</ion-label>
        <InputEntry class="w-25" v-model="percent" :max="100" :max-length="3" />
      </i-col>
      <i-col size="3">
        <ion-label position="floating align-bottom" class="text-purple-700 font-bold text-size-1rem">Գումար
        </ion-label>
        <grid>
          <row>
            <i-col class="font-bold">{{priceAfterDiscount}}</i-col>
          </row>
        </grid>
      </i-col>
    </grid>

    <CalculatorView class="w-full grid grid-cols-1 mt-2 rounded-md border overflow-hidden flex-1 bg-purple-200"
      :price="price" :percent="percent" :price-after-discount="priceAfterDiscount" :billdays="billdays" />

  </NuxtLayout>
</template>
