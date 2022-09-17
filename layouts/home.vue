<script setup>
import { add } from 'ionicons/icons'
</script>

<template>
  <ion-app align="content-center">
    <ion-page class="ion-padding-start">
      <ion-header class="flex text-center items-center">
        <ion-toolbar>
          <Logos mb-6 />
        </ion-toolbar>
      </ion-header>
      <ion-content class="px-10 w-full text-center ion-justify-content-center">
        <!-- <main class="text-center h-screen container"> -->
        <slot> </slot>
        <!-- </main> -->
        </ion-content>
    </ion-page>
    <ion-footer pos="bottom-0 fixed" align="items-center content-center">asd
      <slot name="footer"></slot>
    </ion-footer>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button>
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-app>
</template>
