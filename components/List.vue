<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <ion-list align="content-center items-center" class="w-full text-center">
    <ion-list-header class="text-center">
      <slot name="headtext" />
    </ion-list-header>
  </ion-list>

  <slot v-for="(item) in items">
    <ion-item color="medium">
      <ion-label class="ion-text-wrap ion-text-start">
        <span class="text-size-1.3rem">{{ item }}</span>
      </ion-label>
    </ion-item>
  </slot>
</template>
