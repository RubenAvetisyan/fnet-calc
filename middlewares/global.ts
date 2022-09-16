export default defineNuxtRouteMiddleware((to) => {
  // Set the layout on the route you are navigating _to_
  setPageLayout('home')
})