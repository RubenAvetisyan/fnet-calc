<template>
  <ion-modal :is-open="isOpen">
    <ion-content class="ion-padding">
      <ion-item>
        <slot></slot>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    deafult: false
  }
})
</script>
