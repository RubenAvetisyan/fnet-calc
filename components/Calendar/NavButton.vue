<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: ''
  }
})

</script>

<template>
  <ion-icon v-if="icon" :icon="icon" slot="" end></ion-icon>
  <!-- <IonButton bg="#fff" class="p-1">
    <slot v-else />
  </IonButton> -->
</template>
