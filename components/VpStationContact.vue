<template>
  <div class="vp-station-contact">
    <div class="vp-station-locator__subheading vp-station-locator__subheading--mobile">Contact</div>
    <div v-if="phone">Phone: <a class="vp-station-locator__link" :href="phone">{{ phoneLabel }}</a></div>
    <div v-if="fax">Fax: {{ fax }}</div>
    <div v-if="email">Email: <a class="vp-station-locator__link vp-station-locator__email" :href="email">{{ emailLabel }}</a></div>
    <div v-if="stationCode">Station code: {{ stationCode }}</div>
    <vp-station-prosecution-unit-details :prosecutionUnit="prosecutionUnit" class="vp-station-contact__prosecution-unit"></vp-station-prosecution-unit-details>
  </div>
</template>

<script>
import VpStationProsecutionUnitDetails from './VpStationProsecutionUnitDetails.vue';

export default {
  components: {
    VpStationProsecutionUnitDetails
  },
  props: {
    phone: String,
    fax: String,
    email: String,
    prosecutionUnit: Object,
    stationCode: String
  },
  computed: {
    phoneLabel () {
      return this.phone?.replace('tel:', '')
    },
    emailLabel () {
      return this.email?.replace('mailto:', '')
    },
  },
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-contact {
  .vp-station-locator__subheading {
    margin-top: rem(12px);
  }

  &__prosecution-unit {
    display: none;

    @include rpl_breakpoint('l') {
      display: block;
    }
  }
}
</style>
