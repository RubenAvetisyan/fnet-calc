import MobileDetect from 'mobile-detect'

export efault defineNuxtPlugin({ req }) => {
  const md = new MobileDetect(req.headers['user-agent'])
  const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile'
  const isTablet = md.tablet() !== null || md.mobile() === 'UnknownTablet'
  const isDesktop = !isMobile && !isTablet
  
  return {
    provide: {
      isMobile,
      isTablet,
      isDesktop,
    }
  }
}
