<template>
  <div class="vp-station-description-list-item">
    <dt class="vp-station-description-list-item__term">{{ term }}{{ separator }}</dt>
    <dd class="vp-station-description-list-item__description">
      <slot></slot>
    </dd>
  </div>
</template>

<script>
import { RplLink } from '@dpc-sdp/ripple-link';
export default {
  components: {
    RplLink
  },
  props: {
    term: String,
    separator: {
      type: String,
      default: ':'
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-description-list-item {
  margin-bottom: $rpl-space-4;

  @include rpl_breakpoint('l') {
    display: flex;
    flex-direction: row;
  }

  &__term {
    @include rpl_typography_font('s', 1.5rem, 'bold');
    @include rpl_text_color(rpl_color('extra_dark_neutral'));

    @include rpl_breakpoint('l') {
      width: rem(140px);
    }
  }

  &__description {
    @include rpl_text_color(rpl_color('extra_dark_neutral'));

    margin-left: 0;
  }

  &__link {
    @include rpl_text_color(rpl_color('extra_dark_neutral'));
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  &__supporting-text {
    @include rpl_typography_font('xs', rem(19.6px), 'regular');
    @include rpl_text_color(rpl_color('dark_neutral'));
  }
}
</style>
