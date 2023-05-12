<template>
  <div>
    <span class="vp-station-opening-hours__hours">{{ openingHours }}</span><span v-if="openingHoursNotice" class="vp-station-opening-hours__notice">{{ openingHoursNotice }}</span> 
  </div>
</template>

<script>
export default {
  props: {
    openingHours: String,
    openingHoursNotice: String
  }
}
</script>
