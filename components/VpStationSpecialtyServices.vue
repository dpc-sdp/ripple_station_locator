<template>
  <div class="vp-station-specialty-services">
    <div class="vp-station-locator__subheading vp-station-locator__subheading--mobile" v-if="services">Specialty service or facility</div>
    <vp-station-unordered-list :items="services"  class="vp-station-specialty-services__services"></vp-station-unordered-list>
    <vp-station-unordered-list :items="accessibility" title="Accessibility" class="vp-station-specialty-services__accessibility"></vp-station-unordered-list>
    <vp-station-prosecution-unit-details :prosecutionUnit="prosecutionUnit" class="vp-station-specialty-services__prosecution-unit"></vp-station-prosecution-unit-details>
  </div>
</template>

<script>
import VpStationUnorderedList from '@dpc-sdp/ripple-station-locator/components/VpStationUnorderedList.vue';
import VpStationProsecutionUnitDetails from './VpStationProsecutionUnitDetails.vue';

export default {
  components: {
    VpStationUnorderedList,
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
  &__services {
    display: none;

    @include rpl_breakpoint('l') {
      display: block;
    }
  }
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
