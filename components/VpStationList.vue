<template>
  <div class="vp-station-list">
    <div class="vp-station-locator__subheading vp-station-list__title" v-if="title && items">{{ title }}</div>
    <ul class="vp-station-list__list" v-if="items">
      <li class="vp-station-list__list-item" v-for="item, key in items" :key="key">{{ item }}</li>
    </ul>
  </div>

</template>

<script>
export default {
  props: {
    title: String,
    items: Array
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-list {
  &__title {
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

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
