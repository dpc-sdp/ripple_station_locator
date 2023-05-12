<template>
  <div class="vp-station-locator">
    <rpl-form :formData="searchForm" class="vp-station-locator__form" :submitHandler="onSearchSubmit"
      :submitFormOnClear="true" :scrollToMessage="false"></rpl-form>

    <rpl-tabs class="vp-station-locator__tabs" :tabs="tabs" :activeTab="activeTab" @rpl-tab-switch="switchTab" />
    <div class="vp-station-locator__map" v-if="activeTab === 'map'">Map view</div>
    <div class="vp-station-locator__list" v-if="activeTab === 'list'">
      <rpl-search-results-layout :searchResults="stationLocatorProps.results" :count="total">
        <template v-slot:results="resultsProps">
          <rpl-col cols="full">
            <rpl-complex-data-table :columns="stationLocatorProps.columns" :items="resultsProps.searchResults"></rpl-complex-data-table>
          </rpl-col>
        </template>
        <template slot="noresults">
          <div class="vp-station-locator__no-results">
            <slot name="noresults">
              <h3>Sorry, no police stations match your search.</h3>
              <p>Try again with different search criteria.</p>
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
import { mapTableRows } from './middleware.js'

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
                  values: [
                    {
                      id: 'Crime Investigations Unit (CIU)',
                      name: 'Crime Investigations Unit (CIU)'
                    },
                    {
                      id: 'Crime Prevention Officer (CPO)',
                      name: 'Crime Prevention Officer (CPO)'
                    },
                    {
                      id: 'Crime Scene Services (CSS)',
                      name: 'Crime Scene Services (CSS)'
                    },
                    {
                      id: 'Divisional Intilligence Unit (DIU)',
                      name: 'Divisional Intilligence Unit (DIU)'
                    },
                    {
                      id: 'Family Violence Investigations Unit (FVIU)',
                      name: 'Family Violence Investigations Unit (FVIU)'
                    },
                    {
                      id: 'Family Violence Liaison Officer (FVLO)',
                      name: 'Family Violence Liaison Officer (FVLO)'
                    },
                    {
                      id: 'Farm Crime Liaison Officer (FCLO)',
                      name: 'Farm Crime Liaison Officer (FCLO)'
                    },
                    {
                      id: 'Fingerprint office',
                      name: 'Fingerprint office'
                    },
                    {
                      id: 'Highway Patrol (HWP)',
                      name: 'Highway Patrol (HWP)'
                    },
                    {
                      id: 'Justice of the Peace',
                      name: 'Justice of the Peace'
                    },
                    {
                      id: 'LGBTIQ+ Liaison Officer (LLO)',
                      name: 'LGBTIQ+ Liaison Officer (LLO)'
                    },
                    {
                      id: 'Neighbourhood Watch',
                      name: 'Neighbourhood Watch'
                    },
                    {
                      id: 'Pro-active Policing Unit (PPU)',
                      name: 'Pro-active Policing Unit (PPU)'
                    },
                    {
                      id: 'Prosecutions Unit',
                      name: 'Prosecutions Unit'
                    },
                    {
                      id: 'Protective services officers (PSO)',
                      name: 'Protective services officers (PSO)'
                    },
                    {
                      id: 'Regional Firearms Officers',
                      name: 'Regional Firearms Officers'
                    },
                    {
                      id: 'Regional Response Unit',
                      name: 'Regional Response Unit'
                    },
                    {
                      id: 'Registered Sex Offenders Management Unit',
                      name: 'Registered Sex Offenders Management Unit'
                    },
                    {
                      id: 'Sexual Offences and Child Abuse Investigation Team (SOCIT)',
                      name: 'Sexual Offences and Child Abuse Investigation Team (SOCIT)'
                    },
                    {
                      id: 'Traffic Management Unit (TMU)',
                      name: 'Traffic Management Unit (TMU)'
                    },
                    {
                      id: 'Victim Assistance Support Officers',
                      name: 'Victim Assistance Support Officers'
                    },
                    {
                      id: 'Water Police Search and Rescue Squad',
                      name: 'Water Police Search and Rescue Squad'
                    },
                    {
                      id: 'Youth Resource Officer',
                      name: 'Youth Resource Officer'
                    }
                  ],
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
        items: [
          {
            'suburb': {
              'suburb': 'Dandenong',
              'test': 'Green hat'
            },
            'location': 'Dandenong Police Station',
            'opening_hours': 'Non-24 Hours',
            'contact': 'eildon.uni@police.vic.gov.au',
            'specialty_services': 'Blah'
          },
          {
            'suburb': 'Dandenong',
            'location': 'Dandenong Police Station',
            'opening_hours': 'Non-24 Hours',
            'contact': 'eildon.uni@police.vic.gov.au',
            'specialty_services': 'Blah'
          },
          {
            'suburb': 'Dandenong',
            'location': 'Dandenong Police Station',
            'opening_hours': 'Non-24 Hours',
            'contact': 'eildon.uni@police.vic.gov.au',
            'specialty_services': 'Blah'
          },
          {
            'suburb': 'Dandenong',
            'location': 'Dandenong Police Station',
            'opening_hours': 'Non-24 Hours',
            'contact': 'eildon.uni@police.vic.gov.au',
            'specialty_services': 'Blah'
          }
        ],
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
        // tableResultsMiddleware: [
        //   advancedSearchFilters,
        //   filterByOpen,
        //   customSort,
        //   sortByDistance,
        //   pagination,
        //   mapTableRows
        // ],
        // mapResultsMiddleware: [advancedSearchFilters, filterByOpen],
        // onModelUpdateHook: async function () {
        //   const suburb = this.getModelValue('suburb', this.searchForm.model)
        //   if (suburb && suburb.hasOwnProperty('id')) {
        //     const { lat, lng } = await getSuburbLatLong(suburb)
        //     if (lat && lng) {
        //       this.searchForm.model.suburb.lat = lat
        //       this.searchForm.model.suburb.lng = lng
        //     }
        //     const distanceSortOpt = {
        //       id: 'sortByDistance',
        //       name: 'Shortest distance'
        //     }
        //     this.sortValues = [distanceSortOpt, ...this.sortOptions]
        //     this.sort = 'sortByDistance'
        //     this.page = 1
        //     if (this.submitOnFormUpdate) {
        //       this.fetchData()
        //     }
        //   } else {
        //     this.sortValues = [ ...this.sortOptions]
        //     this.sort = this.sortOptions[0].id
        //     this.page = 1
        //     if (this.submitOnFormUpdate) {
        //       this.fetchData()
        //     }
        //   }
        // },
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
      // if (tab === 'map') {
      //   this.$nextTick(() => {
      //     this.mapInstance.updateSize()
      //   })
      // }
    },
    onClearForm() {
      // if (this.onModelUpdateHook && typeof this.onModelUpdateHook === 'function') {
      //   this.$nextTick(() => {
      //     this.onModelUpdateHook()
      //   })
      // }
      this.handleEvent('clear-form')
    },
    onSearchSubmit() {
      // this.appliedFilters = JSON.parse(JSON.stringify(this.searchForm.model))
      // if (this.onSearchSubmitHook) {
      //   this.onSearchSubmitHook(this.appliedFilters)
      // } else {
      //   if (this.$refs.searchresults) {
      //     VueScrollTo.scrollTo(this.$refs.searchresults.$el, 500, { offset: -50 })
      //   }
      //   this.page = 1
      // }
      this.fetchData()
      this.handleEvent('form-submit')
    },
    async onModelUpdate (newVal, schema) {
      // if (this.onModelUpdateHook && typeof this.onModelUpdateHook === 'function') {
      //   this.onModelUpdateHook()
      // } else {
      //   this.page = 1
      //   if (this.submitOnFormUpdate) {
      //     this.fetchData()
      //   }
      // }
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
        const { data, status } = await this.$axios.post(`${BASE_URL}/dsl`, {
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
          }
        })
        if (status === 200 && data && data.hits && data.hits.total && data.hits.total && data.hits.total.value && Array.isArray(data.hits.hits)) {
          this.total = data.hits.total.value
          this.stationLocatorProps.results = mapTableRows(data)
        }
        // ChDataListingEventBus.$emit('fetch', { status: 'ok' })
      } catch (error) {
        console.error(error)
        this.stationLocatorProps.results = []
        this.total = 0
        // ChDataListingEventBus.$emit('fetch', { status: 'error' })
      }

      // if (this.enableMap) {
      //   this.setMapData()
      // }
      // if (this.enableTable) {
      //   this.setTableData()
      // }
      if (showLoading) {
        setTimeout(() => {
          this.loading = false
        }, 200)
      }
    },
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
}
</style>
