<script setup lang="ts">
const route = useRoute()
console.log('route: ', route);
const ionRouter = useIonRouter()
// definePageMeta({
//   alias: ['/hi', '/next'],
// })
</script>

<template><div></div>
<!-- <IonContent class="ion-padding">
    <Logos mb-6 />
    <IonButton @click="ionRouter.push('/home')">
          Goto About Page
        </IonButton>
  </IonContent> -->
</template>
