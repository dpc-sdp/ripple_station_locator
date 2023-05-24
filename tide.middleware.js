import { config } from './config'

export default function station (context, pageData) {
  if (!pageData.tidePage || pageData.tidePage.type !== 'node--station') {
    return pageData
  }

  // Hide sidebar
  pageData.tideLayout.sidebar = false

  // Breadcrumbs
  if (pageData.tidePage.breadcrumbs) {
    const linkInBreadcrumbs = pageData.tidePage.breadcrumbs.find(({ url }) => url === config.STATION_LOCATOR_LINK_URL)
    if (!linkInBreadcrumbs) {
      pageData.tidePage.breadcrumbs.splice(1, 0, { text: config.STATION_LOCATOR_LINK_TEXT, url: config.STATION_LOCATOR_LINK_URL })
    }
  }

  // Banner
  if (pageData.tidePage.appHeroBanner && pageData.tidePage.appHeroBanner.data) {
    pageData.tidePage.appHeroBanner.data.backgroundGraphic = null
    pageData.tidePage.appHeroBanner.data.showLinks = false
  }
}
