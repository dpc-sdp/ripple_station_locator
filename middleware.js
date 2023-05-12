export const mapTableRows = (data) => {
  if (data.hits && data.hits.hits) {
    return data.hits.hits.map(station => {
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

export const stationSuburb = (result) => {
  return {
    suburb: result.field_suburb.toString(),
    url: result.url.toString()
  }
}

export const stationLocation = (result) => {
  return {
    title: result.title?.toString(),
    streetAddress: result.field_street_address?.toString(),
    suburb: result.field_suburb?.toString(),
    state: result.field_state_name?.toString(),
    postcode: result.field_postcode?.toString(),
    accessibility: result.field_accessibility_name
  }
}

export const stationContact = (result) => {
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

export const stationOpeningHours = (result) => {
  return {
    openingHours: result.field_opening_hours?.toString(),
    openingHoursNotice: result.field_opening_hours_notice?.toString()
  }
}

export const stationSpecialtyServices = (result) => {
  return {
    services: result.field_specialty_services_or_faci_name,
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
