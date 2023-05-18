<template>
  <div class="tide-content tide-content--station">
    <h2>Contact details</h2>
    <dl class="vp-description-list">
      <div class="vp-description-list__item" v-if="page.field_street_address">
        <dt>Address</dt>
        <dd>
          {{ page.field_street_address }},<br>
          {{ page.field_suburb }} {{ page.field_state.name }} {{ page.field_postcode }}<br>
          <vp-station-external-link :href="page.field_google_maps_url.uri" v-if="page.field_google_maps_url">Get directions</vp-station-external-link>
        </dd>
      </div>
      <div class="vp-description-list__item" v-if="page.field_phone">
        <dt>Phone</dt>
        <dd>
          <a class="vp-station__link" :href="page.field_phone.uri">{{ page.field_phone.title }}</a>
        </dd>
      </div>
      <div class="vp-description-list__item" v-if="page.field_fax">
        <dt>Fax</dt>
        <dd>
          {{ page.field_fax }}
        </dd>
      </div>
      <div class="vp-description-list__item" v-if="page.field_email">
        <dt>Email</dt>
        <dd>
          <a class="vp-station__link" :href="page.field_email.uri" v-if="page.field_email">{{ page.field_email.title }}</a>
        </dd>
      </div>
      <div class="vp-description-list__item" v-if="page.field_station_code">
        <dt>Station code</dt>
        <dd>
          {{ page.field_station_code }}
        </dd>
      </div>
      <div class="vp-description-list__item" v-if="page.field_opening_hours || page.field_opening_hours_notice">
        <dt>Opening hours</dt>
        <dd>
          {{ page.field_opening_hours }}
          <div class="vp-description-list__supporting-text" v-if="page.field_opening_hours_notice">{{ page.field_opening_hours_notice }}</div>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import VpStationExternalLink from '../components/VpStationExternalLink.vue';

export default {
  components: {
    RplCol,
    RplRow,
    VpStationExternalLink
  },
  props: {
    page: {
      type: Object
    },
  },
  computed: {
    // contactDetails () {
    //   let contactDetailsList = []
    //   contactDetailsList.push({
    //     term: 'Address',
    //     description: `${this.page.field_street_address},
    //     <br />${this.page.field_suburb} ${this.page.field_postcode} ${this.page.field_state}`,
    //   })
    //   if (this.page.field_station_code) {
    //     contactDetailsList.push({
    //       term: 'Station code',
    //       description: this.page.field_station_code
    //     })
    //   }
    //   if (this.page.field_email) {
    //     contactDetailsList.push({
    //       term: 'Email',
    //       description: this.page.field_email
    //     })
    //   }
    //   return contactDetailsList
    // }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.tide-content--station {
  .vp-description-list {
    &__item {

    }
    &__supporting-text {
      @include rpl_typography_font('xs', rem(19.6px), 'regular');
      @include rpl_text_color(rpl_color('dark_neutral'));
    }
  }
  .vp-station {
    &__link {
      @include rpl_text_color(rpl_color('extra_dark_neutral'));
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
