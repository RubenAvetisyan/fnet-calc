<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    deafult: false,
  },
})
</script>

<template>
  <ion-modal :is-open="isOpen">
    <ion-content class="ion-padding">
      <ion-item>
        <slot />
      </ion-item>
    </ion-content>
  </ion-modal>
</template>
