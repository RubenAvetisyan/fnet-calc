<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>

<template>
  <ion-list align="content-center items-center" class="w-full text-center">
    <ion-list-header class="text-center">
      <slot name="headtext">
      </slot>
    </ion-list-header>
  </ion-list>

  <slot v-for="(item, index) in items">
    <ion-item class="text-center">
      <!-- <ion-avatar slot="start">
      <img src="./avatar-finn.png" />
    </ion-avatar> -->
      <ion-label> {{item}} </ion-label>
    </ion-item>
  </slot>
</template>
