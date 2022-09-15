import MobileDetect from 'mobile-detect'

export default defineNuxtPlugin((nuxtApp) => {
  const req = nuxtApp.ssrContext?.event.req
  if(!req) return
  const md = new MobileDetect(req.headers['user-agent'])
  const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile'
  console.log('isMobile: ', isMobile);
  const isTablet = md.tablet() !== null || md.mobile() === 'UnknownTablet'
  const isDesktop = !isMobile && !isTablet
  
  return {
    provide: {
      isMobile,
      isTablet,
      isDesktop,
    }
  }
})
