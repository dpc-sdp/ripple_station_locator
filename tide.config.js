module.exports = {
  include: {
    station: [
      'field_accessibility', 
      'field_specialty_services_or_faci',
      'field_state'
    ]
  },
  mapping: {
    landingPageComponents: {
      'paragraph--station_locator': {
        component: 'ripple-station-locator',
        props: {}
      },
    }
  }
}
