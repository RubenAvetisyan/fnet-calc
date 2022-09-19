<template>
  <ion-app align="content-center">
    <ion-page class="ion-padding-start">
      <ion-header class="flex text-center items-center mb-4">
        <ion-toolbar>
          <Logos mb-6 />
        </ion-toolbar>
      </ion-header>
      <ion-content
        class="sm:prose h-full items-center content-center text-center self-center px-10 w-full text-center ion-justify-content-center">
        <slot> </slot>
      </ion-content>
      <ion-footer v-if="$slots.footer" color="medium" pos="bottom-0 fixed" align="items-center content-center" class="mt-5">
        <slot name="footer"></slot>
      </ion-footer>
    </ion-page>
  </ion-app>
</template>
