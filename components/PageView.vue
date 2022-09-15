<script setup lang="ts">
const ionRouter = useIonRouter()

const { data } = await useFetch('/api/pageview')

const time = useTimeAgo(computed(() => data.value.startAt))
</script>

<template>
  <IonPage class="text-gray:80">
    <div>
      <IonHeader :translucent="true">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton>LOGOUT</IonButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
          <IonBadge>Ruben</IonBadge>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <Logos mb-6 />
        <span font-500 text-gray>{{ data.pageview }}</span>
        page views since
        <span text-gray>{{ time }}</span>
        <IonButton @click="ionRouter.push(`/hi/${encodeURIComponent('IonButton')}`)">
          Goto About Page
        </IonButton>
        </IonContent>
    </div>
  </IonPage>
</template>
