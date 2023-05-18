<template>
  <div class="tide-content tide-content--station">
    <template slot="aboveContent">
      <rpl-divider />
    </template>
    <div class="vp-station__section">
      <h2>Contact details</h2>
      <dl class="vp-station-description-list">
        <vp-station-description-list-item term="Address" v-if="page.field_street_address">
          {{ page.field_street_address }},<br>
          {{ page.field_suburb }} {{ page.field_state.name }} {{ page.field_postcode }}<br>
          <vp-station-external-link :href="page.field_google_maps_url.uri" v-if="page.field_google_maps_url">Get
            directions</vp-station-external-link>
        </vp-station-description-list-item>
        <vp-station-description-list-item term="Phone" v-if="page.field_phone">
          <a class="vp-station-description-list-item__link" :href="page.field_phone.uri">{{ page.field_phone.title }}</a>
        </vp-station-description-list-item>
        <vp-station-description-list-item term="Fax" v-if="page.field_fax">
          {{ page.field_fax }}
        </vp-station-description-list-item>
        <vp-station-description-list-item term="Email" v-if="page.field_email">
          <a class="vp-station-description-list-item__link" :href="page.field_email.uri">{{ page.field_email.title }}</a>
        </vp-station-description-list-item>
        <vp-station-description-list-item term="Station code" v-if="page.field_station_code">
          {{ page.field_station_code }}
        </vp-station-description-list-item>
        <vp-station-description-list-item term="Opening hours"
          v-if="page.field_opening_hours || page.field_opening_hours_notice">
          {{ page.field_opening_hours }}
          <div class="vp-station-description-list-item__supporting-text" v-if="page.field_opening_hours_notice">{{
            page.field_opening_hours_notice }}</div>
        </vp-station-description-list-item>
      </dl>
    </div>
    <div class="vp-station__section" v-if="page.field_specialty_services_or_faci.length">
      <h3>Specialty services or facilities</h3>
      <ul class="vp-station-list">
        <li v-for="service, key in page.field_specialty_services_or_faci" :key="key">{{ service.name }}</li>
      </ul>
    </div>
    <div class="vp-station__section" v-if="page.field_accessibility.length">
      <h3>Accessibility</h3>
      <ul>
        <li v-for="accessibility, key in page.field_accessibility" :key="key">{{ accessibility.name }}</li>
      </ul>
    </div>
    <div class="vp-station__section" v-if="hasProsecutionUnit">
      <h2>Prosecution Unit</h2>
      <p v-for="notice, key in page.field_prosecution_unit_notice" :key="key">{{ notice }}</p>
      <div v-if="hasProsecutionUnitGeneral">
        <h3>General</h3>
        <dl class="vp-description-list">
          <vp-station-description-list-item term="Phone" v-if="page.field_prosecution_unit_phone">
            <a class="vp-station-description-list-item__link" :href="page.field_prosecution_unit_phone.uri">{{ page.field_prosecution_unit_phone.title }}</a>
          </vp-station-description-list-item>
          <vp-station-description-list-item term="Fax" v-if="page.field_prosecution_unit_fax">
            {{ page.field_prosecution_unit_fax }}
          </vp-station-description-list-item>
          <vp-station-description-list-item term="Email" v-if="page.field_prosecution_unit_email">
            <a class="vp-station-description-list-item__link" :href="page.field_prosecution_unit_email.uri">{{ page.field_prosecution_unit_email.title }}</a>
          </vp-station-description-list-item>
        </dl>
      </div>
      <div v-if="hasCaseConference">
        <h3>Case Conference</h3>
        <dl class="vp-description-list">
          <vp-station-description-list-item term="Phone" v-if="page.field_case_conference_phone">
            <a class="vp-station-description-list-item__link" :href="page.field_case_conference_phone.uri">{{ page.field_case_conference_phone.title }}</a>
          </vp-station-description-list-item>
          <vp-station-description-list-item term="Email" v-if="page.field_case_conference_email">
            <a class="vp-station-description-list-item__link" :href="page.field_case_conference_emailuri">{{ page.field_case_conference_emailtitle }}</a>
          </vp-station-description-list-item>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { RplDivider } from '@dpc-sdp/ripple-global'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import VpStationExternalLink from '../components/VpStationExternalLink.vue';
import VpStationDescriptionListItem from '../components/VpStationDescriptionListItem.vue';

export default {
  components: {
    // RplBreadcrumbs,
    // RplPageLayout,
    RplCol,
    RplRow,
    RplDivider,
    VpStationExternalLink,
    VpStationDescriptionListItem
  },
  props: {
    page: {
      type: Object
    },
  },
  computed: {
    hasProsecutionUnit() {
      return this.page.field_prosecution_unit_notice.length || this.hasProsecutionUnitGeneral || this.hasCaseConference
    },
    hasProsecutionUnitGeneral() {
      return this.page.field_prosecution_unit_email || this.page.field_prosecution_unit_fax || this.page.field_prosecution_unit_phone
    },
    hasCaseConference() {
      return this.page.field_case_conference_email || this.page.field_case_conference_phone
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$vp-station-section-margin: rem(32px);
$vp-station-list-margin: rem(24px);

.vp-station {
  &__section {
    margin-bottom: $vp-station-section-margin;
  }
  &-description-list,
  &-list {
    margin-top: $vp-station-list-margin;
    margin-bottom: $vp-station-list-margin;
  }
}
</style>
