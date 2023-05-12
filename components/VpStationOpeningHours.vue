<template>
  <div class="vp-station-opening-hours">
    <div class="vp-station-opening-hours__hours">{{ openingHours }}</div><div v-if="openingHoursNotice" class="vp-station-opening-hours__notice">{{ openingHoursNotice }}</div> 
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
<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-opening-hours {
  @include rpl_typography_font('xs', 1.25rem, 'regular');
}
</style>
