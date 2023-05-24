// Format phone number for display.
export const formatPhoneLabel = (phone) => {
  const label = phone?.replace('tel:', '')
  if (label && label.length === 10) {
    return '(' + label.substr(0, 2) + ') ' + label.substr(2, 4) + ' ' + label.substr(6, 4)
  }
  else {
    return label
  }
}

// Format email for display.
export const formatEmailLabel = (email) => {
  return email?.replace('mailto:', '')
}
