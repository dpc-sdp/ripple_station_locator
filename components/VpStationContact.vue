<template>
  <div class="vp-station-contact">
    <div v-if="phone">Phone: <a class="vp-station-contact__link" :href="phone">{{ phoneLabel }}</a></div>
    <div v-if="fax">Fax: {{ fax }}</div>
    <div v-if="email">Email: <a class="vp-station-contact__link vp-station-contact__email" :href="email">{{ emailLabel }}</a></div>
    <div v-if="stationCode">Station code: {{ stationCode }}</div>
    <div class="vp-station-locator__subheading" v-if="puGeneralPhone || puGeneralFax || puGeneralEmail">Prosecution Unit - General</div>
    <div v-if="puGeneralPhone">Phone: <a class="vp-station-contact__link" :href="puGeneralPhone">{{ puGeneralPhoneLabel }}</a></div>
    <div v-if="puGeneralFax">Fax: {{ puGeneralFax }}</div>
    <div v-if="puGeneralEmail">Email: <a class="vp-station-contact__link vp-station-contact__email" :href="puGeneralEmail">{{ puGeneralEmailLabel }}</a></div>
    <div class="vp-station-locator__subheading" v-if="puCcPhone || puCcEmail">Prosecution Unit - Case conference</div>
    <div v-if="puCcPhone">Phone: <a class="vp-station-contact__link" :href="puCcPhone">{{ puCcPhoneLabel }}</a></div>
    <div v-if="puCcEmail">Email: <a class="vp-station-contact__link vp-station-contact__email" :href="puCcEmail">{{ puCcEmailLabel }}</a></div>
  </div>
</template>

<script>
export default {
  props: {
    phone: String,
    fax: String,
    email: String,
    puGeneralPhone: String,
    puGeneralFax: String,
    puGeneralEmail: String,
    puCcPhone: String,
    puCcEmail: String,
    stationCode: String
  },
  computed: {
    phoneLabel () {
      return this.phone?.replace('tel:', '')
    },
    emailLabel () {
      return this.email?.replace('mailto:', '')
    },
    puGeneralPhoneLabel () {
      return this.puGeneralPhone?.replace('tel:', '')
    },
    puGeneralEmailLabel () {
      return this.puGeneralEmail?.replace('mailto:', '')
    },
    puCcPhoneLabel () {
      return this.puCcPhone?.replace('tel:', '')
    },
    puCcEmailLabel () {
      return this.puCcEmail?.replace('mailto:', '')
    }
  },
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.vp-station-contact {
  .vp-station-locator__subheading {
    margin-top: rem(12px);
  }
  &__link {
    color: rpl-color('extra_dark_neutral');
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
  &__email {
    word-break: break-all;
  }
}
</style>
