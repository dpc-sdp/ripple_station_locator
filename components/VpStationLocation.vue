<template>
  <div class="vp-station-location">
    <div class="vp-station-locator__subheading">{{ title }}</div>
    <div class="vp-station-location__address">
      <div v-if="streetAddress">{{ streetAddress }},</div>
      <div>
        <span class="vp-station-location__suburb" v-if="suburb">{{ suburb }} </span>
        <span class="vp-station-location__state" v-if="state">{{ state }} </span>
        <span class="vp-station-location__postcode" v-if="postcode">{{ postcode }}</span>
      </div>
    </div>
    <div class="vp-station-location__accessibility" v-if="accessibility">
      <div class="vp-station-locator__subheading">Accessibility</div>
      <ul class="vp-station-location__list">
        <li class="vp-station-location__list-item" v-for="item in accessibility">{{ item }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import { RplLink } from '@dpc-sdp/ripple-link';

export default {
  components: {
    RplLink
  },
  props: {
    accessibility: Array,
    title: String,
    streetAddress: String,
    suburb: String,
    state: String,
    postcode: String
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
    margin-top: $rpl-space-4;

    .vp-station-locator__subheading {
      margin-bottom: rem(6px);
    }
  }
  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    &-item {
      margin-bottom: rem(6px);
    }
  }
}
</style>
