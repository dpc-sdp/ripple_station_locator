// Format station search results for display in table.
export const mapTableRows = (results) => {
  if (results) {
    return results.map(station => {
      const result = station._source
      return [
        stationSuburb(result),
        stationLocation(result),
        stationContact(result),
        stationOpeningHours(result),
        stationSpecialtyServices(result)
      ];
    })
  }
}

export const sortByDistance = (items, location) => {
  if (!Array.isArray(items))
    return []
  return items
}

export const sortByLocation = (items) => {
  if (!Array.isArray(items))
    return []
  const locationComparison = function (a, b) {
    return a._source?.title?.toString() < b._source?.title?.toString() ? -1 : a._source?.title?.toString() > b._source?.title?.toString() ? 1 : 0;
  }
  return items.sort(locationComparison)
}

export const sortBySuburb = (items) => {
  if (!Array.isArray(items))
    return []
  const suburbComparison = function (a, b) {
    return a._source?.field_suburb?.toString() < b._source?.field_suburb?.toString() ? -1 : a._source?.field_suburb?.toString() > b._source?.field_suburb?.toString() ? 1 : 0;
  }
  return items.sort(suburbComparison)
}

// Map station data for the Suburb column.
const stationSuburb = (result) => {
  return {
    suburb: result.field_suburb.toString(),
    url: result.url.toString()
  }
}

// Map station data for the Location column.
const stationLocation = (result) => {
  return {
    title: result.title?.toString(),
    streetAddress: result.field_street_address?.toString(),
    suburb: result.field_suburb?.toString(),
    state: result.field_state_name?.toString(),
    postcode: result.field_postcode?.toString(),
    latLng: result.field_geolocation_latlon?.toString(),
    accessibility: result.field_accessibility_name
  }
}

// Map station data for the Contact column.
const stationContact = (result) => {
  return {
    phone: result.field_phone?.toString(),
    fax: result.field_fax?.toString(),
    email: result.field_email?.toString(),
    stationCode: result.field_station_code?.toString(),
    prosecutionUnit: {
      puGeneralPhone: result.field_prosecution_unit_phone?.toString(),
      puGeneralFax: result.field_prosecution_unit_fax?.toString(),
      puGeneralEmail: result.field_prosecution_unit_email?.toString(),
      puCcPhone: result.field_case_conference_phone?.toString(),
      puCcEmail: result.field_case_conference_email?.toString()
    }
  }
}

// Map station data for the Opening Hours column.
const stationOpeningHours = (result) => {
  return {
    openingHours: result.field_opening_hours?.toString(),
    openingHoursNotice: result.field_opening_hours_notice?.toString()
  }
}

// Map station data for the Specialty column.
const stationSpecialtyServices = (result) => {
  return {
    services: result.field_specialty_services_or_faci_name?.sort(),
    // For mobile display.
    accessibility: result.field_accessibility_name,
    prosecutionUnit: {
      puGeneralPhone: result.field_prosecution_unit_phone?.toString(),
      puGeneralFax: result.field_prosecution_unit_fax?.toString(),
      puGeneralEmail: result.field_prosecution_unit_email?.toString(),
      puCcPhone: result.field_case_conference_phone?.toString(),
      puCcEmail: result.field_case_conference_email?.toString()
    }
  }
}
