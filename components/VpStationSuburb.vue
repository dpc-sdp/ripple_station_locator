<template>
  <rpl-link :href="url"><span class="heading-xs">{{ suburb }}</span></rpl-link>
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
