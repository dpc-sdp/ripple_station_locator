<template>
  <div class="tide-content tide-content--station">
    <rpl-col cols="full">
      <rpl-markup :html="page.body.processed" />
    </rpl-col>
  </div>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplMarkup from '@dpc-sdp/ripple-markup'

export default {
  components: {
    RplCol,
    RplRow,
    RplMarkup
  },
  props: {
    page: {
      type: Object
    },
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.tide-content--station {

}
</style>
