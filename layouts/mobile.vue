<template>
    <main class="py-20 px-10 text-center">
        <IonApp>
            <IonPage class="text-gray:80">
                <IonHeader :translucent="true">
                    <IonToolbar>
                        <IonButtons slot="end">
                            <slot name="header-buttons" />
                            <IonButton>LOGOUT</IonButton>
                        </IonButtons>
                        <!-- <IonTitle>Home</IonTitle>
                                                                                    <IonBadge>Ruben</IonBadge> -->
                        <Logos mb-6 />
                    </IonToolbar>
                </IonHeader>
                <!-- page content will appear here -->
                <slot />
                <IonFooter>
                    <Footer />
                </IonFooter>
            </IonPage>
        </IonApp>
    </main>
</template>

<script setup>
useHead({
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover',
})
</script>
