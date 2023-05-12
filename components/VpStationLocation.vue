<template>
  <div class="vp-station-location">
    <div class="vp-station-locator__subheading">{{ title }}</div>
    <div class="vp-station-location__address">
      <div v-if="streetAddress">{{ streetAddress }}</div>
      <div>
        <span class="vp-station-location__suburb" v-if="suburb">{{ suburb }} </span>
        <span class="vp-station-location__state" v-if="state">{{ state }} </span>
        <span class="vp-station-location__postcode" v-if="postcode">{{ postcode }}</span>
      </div>
      <vp-station-external-link :href="directionsUrl" v-if="directionsUrl">
        Get directions
      </vp-station-external-link>
    </div>
    <div class="vp-station-location__accessibility" v-if="accessibility">
      <vp-station-list :items="accessibility" title="Accessibility"></vp-station-list>
    </div>

  </div>
</template>

<script>
import { RplLink } from '@dpc-sdp/ripple-link';
import VpStationList from './VpStationList.vue';
import VpStationExternalLink from './VpStationExternalLink.vue';

export default {
  components: {
    RplLink,
    VpStationList,
    VpStationExternalLink
  },
  props: {
    accessibility: Array,
    title: String,
    streetAddress: String,
    suburb: String,
    state: String,
    postcode: String,
    latLng: String
  },
  computed: {
    address () {
      return [this.streetAddress, this.suburb, this.state, this.postcode].join(', ')
    },
    directionsUrl () {
      const googleUrl = `https://maps.google.com/`
      const qs = () => {
        const latLng = `ll=${this.latLng}`
        const query = `q=${this.address}`
        if (this.latLng && this.address) {
          return `${latLng}&${query}`
        } else if (this.address) {
          return query
        } else if (latLng) {
          return latLng
        }
      }
      return `${googleUrl}?${qs()}`
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-location {
  font-size: rpl-font-size(xs);
  line-height: rem(20px);

  &__accessibility {
    display: none;

    @include rpl_breakpoint('l') {
      display: block;
    }
  }
}
</style>
