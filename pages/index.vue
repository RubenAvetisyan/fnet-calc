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
        <InputEntry class="flex-initial mx-auto w-full" :default-alue="5000" @input="price=$event" />
        <InputEntry class="flex-initial mx-auto w-15" :max="100" :max-length="3" :default-alue="100" />
      </div>
      <div className="grid grid-cols-7 mt-2 rounded-md border overflow-hidden flex-1 bg-gray-200">
        <CalendarView class="w-full"></CalendarView>
        {{price}}
      </div>
      </ion-content>
  </NuxtLayout>
</template>

<script setup lang="ts">
const price = ref(0)
console.log('price: ', price);
</script>
