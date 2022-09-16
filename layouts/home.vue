<template>
  <ion-app align="content-center">
    <ion-header>
      <Logos mb-6 />
    </ion-header>

    <main class="py-20 px-10 text-center">
      <slot />
      <div class="mt-5 mx-auto text-center opacity-25 text-sm">
        [sdf]
      </div>
    </main>
    <Footer />
  </ion-app>
</template>
