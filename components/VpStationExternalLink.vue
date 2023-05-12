<template>
  <rpl-link
    class="vp-station-external-link"
    :href="url"
    target="_blank"
  >
    <slot>
      {{label}}
    </slot>
    <span class="rpl-visually-hidden"> Opens in new window</span>
    <rpl-icon class="vp-station-external-link__icon" symbol="external_link" color="primary" size="m" />
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'
import { isRelativeUrl } from '@dpc-sdp/ripple-global/utils/helpers'

export default {
  name: 'VpStationExternalLink',
  components: {
    RplLink,
    RplIcon
  },
  props: {
    label: String,
    href: String
  },
  computed: {
    url () {
      if (this.href) {
        if (isRelativeUrl(this.href)) {
          return `//${this.href}`
        }
        return this.href
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
.vp-station-external-link {
  color: rpl-color('primary');
  @include rpl_typography_ruleset(('xs', 1.5em, 'bold'));
  &__icon {
    height: $rpl-space-3 !important;
    width: $rpl-space-3 !important;
  }
  &:focus {
    outline-color: rpl-color('primary');
  }
}
</style>
