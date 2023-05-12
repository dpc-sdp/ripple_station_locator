<template>
  <div class="vp-station-location">
    <div class="vp-station-location__accessibility" v-if="accessibility">
      <ul class="vp-station-accessibility">
        <li class="vp-station-accessibility__item" v-for="item in accessibility">{{ item }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    accessibility: Array
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-location {
  .vp-station-accessibility {
    list-style-type: none;
    margin: 0;
    padding: 0;

    &__item {
      font-size: rpl-font-size(xs);
      line-height: rem(20px);
      margin-bottom: rem(6px);
    }
  }
}
</style>
