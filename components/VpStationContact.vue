<template>
  <div class="vp-station-contact">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    phone: String,
    fax: String,
    email: String,
    pu_general_phone: String,
    pu_general_fax: String,
    pu_general_email: String,
    pu_cc_phone: String,
    pu_cc_email: String
  }
}
</script>
