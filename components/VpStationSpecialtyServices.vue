<template>
  <div class="vp-station-specialty-services">
    <vp-station-list :items="services"></vp-station-list>
    <vp-station-list :items="accessibility" title="Accessibility" class="vp-station-specialty-services__accessibility"></vp-station-list>
    <vp-station-prosecution-unit-details :prosecutionUnit="prosecutionUnit" class="vp-station-specialty-services__prosecution-unit"></vp-station-prosecution-unit-details>
  </div>
</template>

<script>
import VpStationList from './VpStationList.vue';
import VpStationProsecutionUnitDetails from './VpStationProsecutionUnitDetails.vue';

export default {
  components: {
    VpStationList,
    VpStationProsecutionUnitDetails
  },
  props: {
    services: Array,
    // For mobile display.
    prosecutionUnit: Object, 
    accessibility: Array
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-specialty-services {
  &__prosecution-unit {
    @include rpl_breakpoint('l') {
      display: none;
    }
  }
  &__accessibility {
    @include rpl_breakpoint('l') {
      display: none;
    }
  }
}
</style>
