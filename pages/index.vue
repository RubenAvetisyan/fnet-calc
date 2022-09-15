<script setup>
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton
} from "@ionic/vue"

const router = useRouter();

const { $isMobile } = useNuxtApp()
</script>

<template>
  <div>
    <Logos mb-6 />
    <IonPage v-if="$isMobile">
      <IonHeader :translucent="true">
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <h1>WELCOME HOME on IOS AND ANDROID</h1>
        <IonButton @click="router.push('/about')">
          Goto About Page
        </IonButton>
      </IonContent>
    </IonPage>
    <Suspense v-else>
      <PageView />
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </div>
</template>
