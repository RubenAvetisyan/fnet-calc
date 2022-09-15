<script setup lang="ts">
const route = useRoute()
console.log('route: ', route);
const ionRouter = useIonRouter()
definePageMeta({
  alias: ['/hi', '/next'],
})
</script>

<template><IonPage class="text-gray:80">
  <IonHeader :translucent="true">
    <IonToolbar>
      <IonButtons slot="end">
        <IonBackButton />
      </IonButtons>
    </IonToolbar>
  </IonHeader>

  <IonContent class="ion-padding">
    <Logos mb-6 />
    <!-- <IonButton @click="ionRouter.push('/home')">
          Goto About Page
        </IonButton> -->
  </IonContent>
  </IonPage>
</template>
