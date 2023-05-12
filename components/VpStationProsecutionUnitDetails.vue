<template>
  <div class="vp-station-prosecution-unit-details" v-if="prosecutionUnit">
    <div class="vp-station-locator__subheading" v-if="prosecutionUnit.puGeneralPhone || prosecutionUnit.puGeneralFax || prosecutionUnit.puGeneralEmail">Prosecution Unit - General</div>
    <div v-if="prosecutionUnit.puGeneralPhone">Phone: <a class="vp-station-locator__link" :href="prosecutionUnit.puGeneralPhone">{{ puGeneralPhoneLabel }}</a></div>
    <div v-if="prosecutionUnit.puGeneralFax">Fax: {{ prosecutionUnit.puGeneralFax }}</div>
    <div v-if="prosecutionUnit.puGeneralEmail">Email: <a class="vp-station-locator__link vp-station-locator__email" :href="prosecutionUnit.puGeneralEmail">{{ puGeneralEmailLabel }}</a></div>
    <div class="vp-station-locator__subheading" v-if="prosecutionUnit.puCcPhone || prosecutionUnit.puCcEmail">Prosecution Unit - Case conference</div>
    <div v-if="prosecutionUnit.puCcPhone">Phone: <a class="vp-station-locator__link" :href="prosecutionUnit.puCcPhone">{{ puCcPhoneLabel }}</a></div>
    <div v-if="prosecutionUnit.puCcEmail">Email: <a class="vp-station-locator__link vp-station-locator__email" :href="prosecutionUnit.puCcEmail">{{ puCcEmailLabel }}</a></div>
  </div>
</template>

<script>
export default {
  props: {
    prosecutionUnit: Object,
  },
  computed: {
    puGeneralPhoneLabel () {
      return this.prosecutionUnit.puGeneralPhone?.replace('tel:', '')
    },
    puGeneralEmailLabel () {
      return this.prosecutionUnit.puGeneralEmail?.replace('mailto:', '')
    },
    puCcPhoneLabel () {
      return this.prosecutionUnit.puCcPhone?.replace('tel:', '')
    },
    puCcEmailLabel () {
      return this.prosecutionUnit.puCcEmail?.replace('mailto:', '')
    }
  },
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-prosecution-unit-details {
  .vp-station-locator__subheading {
    margin-top: rem(12px);
  }
}
</style>
