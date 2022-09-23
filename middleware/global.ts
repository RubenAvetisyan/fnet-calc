export default defineNuxtRouteMiddleware((_) => {
  // Set the layout on the route you are navigating _to_
  setPageLayout('home')
})
