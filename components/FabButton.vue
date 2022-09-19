<script setup>
import { personOutline } from 'ionicons/icons'
</script>

<template>
  <ion-fab vertical="top" horizontal="end" slot="fixed">
    <ion-fab-button color="tertiary" size="small">
      <ion-icon :icon="personOutline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>
