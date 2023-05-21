<template>
  <ion-app align="content-center">
    <ion-page class="ion-padding-start">
      <ion-header class="flex text-center items-center mb-1">
        <ion-toolbar>
          <Logos />
        </ion-toolbar>
      </ion-header>
      <ion-content color="light dark:dark" :fullscreen="true"
        class="ion-padding h-full items-center content-center text-center self-center px-10 w-full text-center ion-justify-content-center">
        <slot />
      </ion-content>
      <ion-footer v-if="$slots.footer" color="medium" pos="bottom-0 fixed" align="items-center content-center">
        <slot name="footer" />
      </ion-footer>
      </ion-page>
    </ion-app>
</template>
