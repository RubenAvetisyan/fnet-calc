<template>
  <NuxtLayout name="home">
  
    <ion-content>
      <Suspense>
        <!-- <PageView /> -->
        <template #fallback>
          <div op50 italic>
            <span animate-pulse>Loading...</span>
          </div>
        </template>
      </Suspense>
      <div class="flex justify-around w-full mx-auto">
        <InputEntry class="flex-initial mx-auto w-full" v-model="price" />
        <InputEntry class="flex-initial mx-auto w-15" v-model="percent" :max="100" :max-length="3" />
      </div>
      <div class="grid grid-cols-7 mt-2 rounded-md border overflow-hidden flex-1 bg-gray-200">
        <CalculatorView class="w-full" :price="price" :percent="percent" :billdays="billdays"></CalculatorView>
      </div>
      </ion-content>
  </NuxtLayout>
</template>

<script setup lang="ts">
const price = ref(5000)
const percent = ref(0)
const billdays = [11, 16, 21]
</script>
