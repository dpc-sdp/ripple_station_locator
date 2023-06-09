<template>
  <div class="tide-content tide-content--station vp-station">
    <rpl-row>
      <rpl-col :colsBp="{ l: 7 }">
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
          <ul>
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
      </rpl-col>
      <rpl-col :colsBp="{ l: 4 }" :push="{ l: 1 }">
        <rpl-related-links :links="relatedLinks" :title="relatedLinksTitle"></rpl-related-links>
      </rpl-col>
    </rpl-row>
    <rpl-row>
      <rpl-col>
        <gmap-embed :apiKey="apiKey" mapMode="place" :title="`Google Map for ${page.title}`" :place="address" v-bind="apiKey"></gmap-embed>
      </rpl-col>
    </rpl-row>
  </div>
</template>

<script>
import GmapEmbed from '../components/GmapEmbed.vue'
import { RplDivider } from '@dpc-sdp/ripple-global'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplRelatedLinks from '@dpc-sdp/ripple-related-links'
import VpStationExternalLink from '../components/VpStationExternalLink.vue'
import VpStationDescriptionListItem from '../components/VpStationDescriptionListItem.vue'
import { config } from '../config'

export default {
  components: {
    GmapEmbed,
    RplCol,
    RplRow,
    RplDivider,
    RplRelatedLinks,
    VpStationExternalLink,
    VpStationDescriptionListItem
  },
  props: {
    page: {
      type: Object
    },
  },
  data () {
    return {
      relatedLinks: [
        {
          url: config.STATION_LOCATOR_LINK_URL,
          text: config.STATION_LOCATOR_LINK_TEXT
        }
      ],
      relatedLinksTitle: config.RELATED_LINKS_TITLE,
      apiKey: config.GOOGLE_WEB_API_KEY
    }
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
    },
    address() {
      return this.page.field_street_address + ', ' + this.page.field_suburb + ' ' + this.page.field_state.name + ' ' + this.page.field_postcode
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$vp-station-desktop-section-margin: rem(40px);
$vp-station-mobile-section-margin: rem(24px);
$vp-station-list-margin: rem(24px);
$vp-station-content-top-padding: rem(36px);
$vp-station-banner-top-padding: rem(92px);
$vp-station-banner-bottom-padding: rem(100px);

.vp-station {
  color: rpl_color('extra_dark_neutral');

  &__section {
    @include rpl-breakpoint('l') {
      margin-bottom: $vp-station-desktop-section-margin;
    }

    margin-bottom: $vp-station-mobile-section-margin;

    h2 {
      margin-top: 0;
    }

    ul, dl {
      margin-top: $vp-station-list-margin;
      margin-bottom: $vp-station-list-margin;
    }
  }
}

.rpl-updated-date {
  display: none;
}

.rpl-above-content {
  background: rpl_color('white') none no-repeat center;
  background-size: 0;
}

.rpl-hero-banner {
  @include rpl-breakpoint('l') {
    padding-top: $vp-station-banner-top-padding;
    padding-bottom: $vp-station-banner-bottom-padding;
  }

  border-bottom: 1px solid rpl_color('grey_2');
}

.rpl-content {
  @include rpl-breakpoint('l') {
    padding-top: $vp-station-content-top-padding;
  }
  @include rpl-breakpoint('xl') {
    padding-top: $vp-station-content-top-padding;
  }
}
</style>
