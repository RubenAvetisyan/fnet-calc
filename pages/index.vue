<script setup>
const ionRouter = useIonRouter()

const imageUrl = ref(null)
const doCamera = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  imageUrl.value = image.webPath;

  // Can be set to the src of an image now
  // imageElement.src = imageUrl;
}

definePageMeta({
  alias: ['/'],
})

// const { $isMobile } = useNuxtApp()
</script>

<template>
  <IonPage class="text-gray:80">
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="end">
          <IonButton>LOGOUT</IonButton>
        </IonButtons>
        <!-- <IonTitle>Home</IonTitle>
                                                <IonBadge>Ruben</IonBadge> -->
        <Logos mb-6 />
        </IonToolbar>
        </IonHeader>
        <IonContent align="center" flex="row" class="ion-padding">
          <IonButton flex="col" @click="ionRouter.push(`/hi/next`)">
            Next Page
          </IonButton>
          <IonButton flex="col" @click="doCamera">
            Camera
          </IonButton>
          <IonImg :src="imageUrl"></IonImg>
        </IonContent>
        </IonPage>
</template>
