// export const mapTableRows = (ctx, next) => {
//   if (ctx.results && Array.isArray(ctx.results)) {
//     ctx.results = ctx.results.map(result => {
//       return [
//         result['Suburb'],
//         testingDetails.addressWithSiteName(result, true),
//         testingDetails.siteType(result, true),
//         testingDetails.hours(result, true),
//         testingDetails.waitTime(result, true),
//         [
//           [
//             {
//               items: [
//                 testingDetails.openingHours(result),
//                 // testingDetails.testTracker(result),
//                 testingDetails.requirements(result),
//                 testingDetails.gettingThere(result),
//                 testingDetails.ageLimit(result),
//                 testingDetails.toilets(result),
//                 testingDetails.siteFacilities(result),
//                 testingDetails.attendance(result),
//                 testingDetails.contact(result)
//               ].filter(itm => itm)
//             }
//           ]
//         ]
//       ]
//     })
//   }
//   next()
// }

export const mapTableRows = (data) => {
  if (data.hits && data.hits.hits) {
    return data.hits.hits.map(station => {
      const result = station._source
      return {
        'suburb': stationSuburb(result),
        'location': stationLocation(result),
        'opening_hours': stationOpeningHours(result),
        'contact': stationContact(result),
        'specialty_services': stationSpecialtyServices(result)
      }
    })
  }
}

export const stationSuburb = (result) => {
  return {
    'suburb': result.field_suburb.toString(),
    'url': result.url.toString()
  }
}

export const stationLocation = (result) => {
  return {
    'title': result.title?.toString(),
    'streetAddress': result.field_street_address?.toString(),
    'suburb': result.field_suburb?.toString(),
    'state': result.field_state_name?.toString(),
    'postcode': result.field_postcode?.toString(),
    'accessibility': result.field_accessibility_name
  }
}

export const stationOpeningHours = (result) => {
  return {
    'openingHours': result.field_opening_hours?.toString(),
    'openingHoursNotice': result.field_opening_hours_notice?.toString()
  }
}

export const stationContact = (result) => {
  return {}
}

export const stationSpecialtyServices = (result) => {
  return {
    'services': result.field_specialty_services_or_faci_name,
    'accessibility': result.field_accessibility_name
  }
}
