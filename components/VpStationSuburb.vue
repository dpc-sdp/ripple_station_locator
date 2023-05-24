<template>
  <rpl-link :href="url" class="vp-station-suburb">{{ suburb }}</rpl-link>
</template>

<script>
import { RplLink } from '@dpc-sdp/ripple-link';
export default {
  components: {
    RplLink
  },
  props: {
    suburb: String,
    url: String
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-suburb {
  @include rpl_typography_font('s', 1.25rem, 'bold');
  color: rpl-color('extra_dark_neutral');
  text-decoration: underline;
}
</style>
