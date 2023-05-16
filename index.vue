<template>
  <div class="vp-station-locator">
    <div class="vp-station-locator__form" ref="searchForm">
    <rpl-form :formData="searchForm" class="vp-station-locator__form" :submitHandler="onSearchSubmit"
      :submitFormOnClear="true" :scrollToMessage="false"></rpl-form>
    </div>

    <rpl-tabs class="vp-station-locator__tabs" :tabs="tabs" :activeTab="activeTab" @rpl-tab-switch="switchTab" />
    <div class="vp-station-locator__map" v-if="activeTab === 'map'">Map view</div>
    <div class="vp-station-locator__list" v-if="activeTab === 'list'">
      <rpl-search-results-layout :searchResults="stationLocatorProps.results" :pager="pager" :count="total" @pager-change="getPaginatedResults" :loading="loading" v-if="!loading">
        <template v-slot:results="resultsProps">
          <rpl-col cols="full">
            <rpl-complex-data-table :columns="stationLocatorProps.columns" :items="resultsProps.searchResults"></rpl-complex-data-table>
          </rpl-col>
        </template>
        <template slot="noresults">
          <div class="vp-station-locator__no-results">
            <slot name="noresults">
              <h3 class="vp-station-locator__no-results__heading">Sorry, no police stations match your search.</h3>
              <p class="vp-station-locator__no-results__supporting-text">Try again with different search criteria.</p>
            </slot>
          </div>
        </template>
      </rpl-search-results-layout>
    </div>
  </div>
</template>

<script>
import { RplCol } from '@dpc-sdp/ripple-grid'
import { RplComplexDataTable } from '@dpc-sdp/ripple-data-table'
import { RplForm, RplFormEventBus } from '@dpc-sdp/ripple-form'
import { RplSearchResultsLayout, RplSearchResultsTable } from '@dpc-sdp/ripple-search'
import RplTabs from '@dpc-sdp/ripple-tabs/Tabs.vue'
import { mapTableRows } from './middleware'
import { config } from './config'

export default {
  name: 'RplStationLocator',
  components: {
    RplCol,
    RplComplexDataTable,
    RplForm,
    RplSearchResultsLayout,
    RplSearchResultsTable,
    RplTabs
  },
  data() {
    return {
      activeTab: 'list',
      tabs: [
        {
          label: 'List view',
          key: 'list',
          icon: 'list'
        },
        {
          label: 'Map view',
          key: 'map',
          icon: 'map_marker'
        }
      ],
      total: 0,
      distance: [5, 100],
      specialtyservices: [],
      store: [],
      loading: false,
      pager: {
        totalSteps: 0,
        initialStep: 1,
        stepsAround: 2
      },
      open24hours: false,
      searchForm: {
        model: {
          suburb: '',
          advancedFilters: ''
        },
        schema: {
          groups: [
            {
              fields: [
                // {
                //   type: 'rplAutocomplete',
                //   values: [],
                //   label: 'Search by suburb or postcode',
                //   styleClasses: ['vp-form__element'],
                //   model: 'suburb',
                //   placeholder: 'Search'
                // },
                // {
                //   type: 'rplslider',
                //   label: 'Filter by distance',
                //   model: 'distance',
                //   hint: '5km to 100km',
                //   step: 1,
                //   suffix: 'km',
                //   min: 5,
                //   max: 100,
                // },
                {
                  type: 'rplselect',
                  values: config.SPECIALTY_SERVICE_OPTIONS,
                  multiselect: true,
                  label: 'Specialty services or facilities',
                  placeholder: 'Select service/facility',
                  styleClasses: ['vp-form__element'],
                  model: 'specialtyservices'
                }
              ]
            },
            {
              fields: [
                {
                  type: 'rplcheckbox',
                  inlineLabel: 'Locations open 24 hours',
                  model: 'open24hours',
                }
              ]
            },
            {
              fields: [
                {
                  type: 'rplclearform',
                  buttonText: 'Clear search filters',
                  // visible: showClearOnDirtyForm,
                  styleClasses: ['form-group--center']
                }
              ]
            },
            {
              fields: [
                {
                  type: 'rplsubmitloader',
                  buttonText: 'Search',
                  styleClasses: ['vp-es-search-action'],
                  loading: false
                }
              ]
            }
          ]
        },
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        },
        formState: {}
      },
      stationLocatorProps: {
        enableMap: true,
        columns: [
          {
            label: 'Suburb',
            key: 'suburb',
            component: () => import('./components/VpStationSuburb.vue')
          },
          {
            label: 'Location',
            key: 'location',
            component: () => import('./components/VpStationLocation.vue')
          },
          {
            label: 'Contact',
            key: 'contact',
            component: () => import('./components/VpStationContact.vue')
          },
          {
            label: 'Opening hours',
            key: 'opening_hours',
            component: () => import('./components/VpStationOpeningHours.vue')
          },
          {
            label: 'Specialty service or facility',
            key: 'specialty_services',
            component: () => import('./components/VpStationSpecialtyServices.vue')
          },
        ],
        results: [],
        sortOptions: [
          {
            id: 'Suburb',
            name: 'A-Z by suburb'
          },
          {
            id: 'Site_Name',
            name: 'A-Z by location'
          },
          {
            id: 'Delay',
            name: 'Shortest wait time'
          }
        ],
        submitOnFormUpdate: true,
      }
    }
  },
  mounted() {
    this.fetchData()
    if (this.submitOnFormUpdate) {
      RplFormEventBus.$on('model-updated', this.onModelUpdate)
    }
    RplFormEventBus.$on('clear-form', this.onClearForm)
  },
  methods: {
    handleEvent(eventName, value) {
    },
    switchTab(tab) {
      this.activeTab = tab
      this.handleEvent('tab-change', tab)
    },
    onClearForm() {
      this.handleEvent('clear-form')
    },
    onSearchSubmit() {
      this.fetchData()
      this.handleEvent('form-submit')
    },
    getPaginatedResults (paginationStepChangedEvent) {
      this.loading = true
      if (!paginationStepChangedEvent) {
        // Initial page load, set up defaults
        this.pager.initialStep = 1
        // this.commitSearchOptions()
      } else {
        // Pagination component was clicked
        this.scrollToTop()
        this.pager.initialStep = paginationStepChangedEvent
      }
      let resultSet = this.doSort
      resultSet = this.doFilter
      this.total = resultSet.length ? resultSet.length : 0

      this.pager.totalSteps = Math.ceil(resultSet.length / config.RESULTS_PER_PAGE)
      let beginning = (this.pager.initialStep === 1) ? 0 : ((this.pager.initialStep - 1) * config.RESULTS_PER_PAGE)
      let end = beginning + config.RESULTS_PER_PAGE
      this.stationLocatorProps.results = mapTableRows(resultSet.slice(beginning, end))
      this.loading = false
    },
    async onModelUpdate (newVal, schema) {
      this.handleEvent('form-update', { value: newVal, field: schema })
    },
    async fetchData(showLoading = true) {
      if (showLoading) {
        this.loading = true
      }
      let params = {}
      if (this.serverSideFiltering) {
        params = this.getRequestParams()
      } else {
        params.limit = 9999
      }

      const BASE_URL = this.$nuxt.context.$tideSearchApi.baseUrl
      try {
        const { data, status } = await this.$axios.post(`${BASE_URL}dsl`, {
          "query": {
            "bool": {
              "must": [
                {
                  "match": {
                    "type": "station"
                  }
                },
                {
                  "match": {
                    "field_node_site": "4"
                  }
                }
              ]
            }
          },
          "size": params.limit
        })
        if (status === 200 && data && data.hits && data.hits.total && data.hits.total && data.hits.total.value && Array.isArray(data.hits.hits)) {
          // this.total = data.hits.total.value
          // this.pager.totalSteps = Math.ceil(this.total / config.RESULTS_PER_PAGE)
          this.store = data.hits.hits
          if (data.hits.total.value) {
            this.getPaginatedResults()
          }
        }
      } catch (error) {
        console.error(error)
        this.store = []
        this.total = 0
      }

      if (showLoading) {
        setTimeout(() => {
          this.loading = false
        }, 200)
      }
    },
    scrollToTop () {
      this.$refs.searchForm.scrollIntoView({behavior: 'smooth'})
    }
  },
  computed: {
    doFilter () {
      return this.store
    },
    doSort () {
      return this.store
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$vp-form-padding-mob: rem(20px);
$vp-form-padding-desk: $rpl-space-4;
$vp-form-element-spacing: $rpl-space-4;

.vp-station-locator {
  &__form {
    padding: $vp-form-padding-mob;

    @include rpl_breakpoint('l') {
      padding: $vp-form-padding-desk;
      padding-top: rem(24px);
      padding-bottom: $vp-form-padding-desk / 2;
    }

    background-color: #f5f5f8;
    border-radius: $rpl-space;
    margin-bottom: rem(75px);

    fieldset {
      margin: 0 0 ($vp-form-element-spacing / 2) 0;
      display: flex;
      flex-direction: column;

      @include rpl_breakpoint('l') {
        flex-direction: row;
        align-items: flex-start;
        margin-left: -$vp-form-element-spacing / 2;
        margin-right: -$vp-form-element-spacing / 2;
      }
    }

    .vp-es-search-action,
    [type=submit] {
      width: 100%;
    }

    .form-group {
      width: 100%;
      flex: 1 1;

      @include rpl_breakpoint('l') {
        margin: 0 $vp-form-element-spacing / 2;
      }

      &--center {
        width: auto;
        margin: auto;
        flex: none;
      }

      @include rpl_breakpoint_down('l') {
        margin-bottom: rem(20px);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .rpl-select__trigger {
      background-color: #fff;
      border-color: #d7dbe0;
    }

    .rpl-select--open {
      .rpl-select__trigger {
        border-color: #274b93;
      }
    }

    .rpl-checkbox__box {
      background-color: #fff;
      border-color: #d7dbe0;
    }
  }

  &__subheading {
    @include rpl_typography_font('xs', 1.25rem, 'bold');

    &--mobile {
      display: block;

      @include rpl-breakpoint('l') {
        display: none;
      }
    }
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

  .rpl-complex-data-table {
    @include rpl-breakpoint('l') {
      table-layout: fixed;
    }

    &__value {
      display: flex;
      flex-direction: column;
    }

    &__label {
      display: none;
    }
  }

  &__no-results {
    &__heading {
      margin-bottom: rem(10px);
    }
    &__supporting-text {
      @include rpl_typography_font('l', 1.6875rem, 'regular');

      margin-top: 0;
    }
  }
}
</style>
