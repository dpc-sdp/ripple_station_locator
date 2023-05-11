<template>
  <ul class="vp-station-specialty-services" v-if="services">
    <li class="vp-station-specialty-services__item" v-for="service in services">{{ service }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    services: Array
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-specialty-services {
  list-style-type: none;
  margin: 0;
  padding: 0;

  &__item {
    font-size: rpl-font-size(xs);
    line-height: rem(20px);
    margin-bottom: rem(6px);
  }
}
</style>
