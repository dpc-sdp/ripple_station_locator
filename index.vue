<template>
  <div class="vp-station-locator">
    <rpl-tabs class="vp-station-locator__tabs" :tabs="tabs" :activeTab="activeTab" @rpl-tab-switch="switchTab" />
    <div class="vp-station-locator__map" v-if="activeTab === 'map'">Map view</div>
    <div class="vp-station-locator__list" v-if="activeTab === 'list'">
      <rpl-complex-data-table caption="test 123" is-row-oriented v-bind="stationLocatorProps" :rowHeaders="true"></rpl-complex-data-table>
    </div>
  </div>
</template>

<script>
import { RplSearchResultsLayout } from '@dpc-sdp/ripple-search'
import { RplComplexDataTable } from '@dpc-sdp/ripple-data-table'
import RplTabs from '@dpc-sdp/ripple-tabs/Tabs.vue'

export default {
  name: 'RplStationLocator',
  props: {
  },
  components: {
    RplComplexDataTable,
    RplSearchResultsLayout,
    RplTabs
  },
  data () {
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
      stationLocatorProps: {
        dataSet: 'testing_sites',
        enableMap: true,
        columns: [
          {
            label: 'Suburb',
            component: () => import('./components/VpStationSuburb.vue')
          },
          'Location',
          'Contact',
          'Opening hours',
          'Specialty service or facility'
          // {
          //   label: 'Location',
          //   component: () => import('./components/VpStationLocation.vue')
          // },
          // {
          //   label: 'Contact',
          //   component: () => import('./components/VpStationContact.vue')
          // },
          // {
          //   label: 'Opening hours',
          //   component: () => import('./components/VpStationOpeningHours.vue')
          // },
          // {
          //   label: 'Specialty service or facility',
          //   component: () => import('./components/VpStationSpecialtyServices.vue')
          // }
        ],
        items: [
          ['yo', 'ye', 'ya', 'yi', 'yu'],
          ['no', 'ne', 'na', 'ni', 'nu']
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
        // searchForm: {
        //   model: {
        //     suburb: '',
        //     advancedFilters: ''
        //   },
        //   schema: {
        //     groups: [
        //       {
        //         fields: [
        //           {
        //             type: 'rplAutocomplete',
        //             values: [],
        //             label: 'Search by suburb or postcode',
        //             styleClasses: ['ch-form__element'],
        //             model: 'suburb',
        //             placeholder: 'Search'
        //           },
        //           {
        //             type: 'rplselect',
        //             values: [
        //               {
        //                 id: 'drivethrough',
        //                 name: 'Drive-through clinic'
        //               },
        //               {
        //                 id: 'walkin',
        //                 name: 'Walk-in clinic'
        //               },
        //               {
        //                 id: 'opennow',
        //                 name: 'Open now'
        //               },
        //               {
        //                 id: 'testtracker',
        //                 name: 'Testing Registration Form site'
        //               },
        //               {
        //                 id: 'nogp',
        //                 name: 'No GP referral required'
        //               },
        //               {
        //                 id: 'pathology',
        //                 name: 'Pathology collection centre'
        //               },
        //               {
        //                 id: 'commonwealth',
        //                 name: 'GP Respiratory Clinic'
        //               },
        //               {
        //                 id: 'ratsavailable',
        //                 name: 'Rapid antigen test kits available'
        //               },
        //               {
        //                 id: 'ndisprogram',
        //                 name: 'Free rapid antigen test kits for people with a disability'
        //               },
        //               {
        //                 id: 'disabilityaccess',
        //                 name: 'Options for access for people with disability'
        //               }
        //             ],
        //             multiselect: true,
        //             label: 'Advanced search',
        //             placeholder: 'All site types',
        //             styleClasses: ['ch-form__element'],
        //             model: 'advancedFilters'
        //           },
        //           {
        //             type: 'rplsubmitloader',
        //             buttonText: 'Search',
        //             styleClasses: ['ch-es-search-action'],
        //             loading: false
        //           }
        //         ]
        //       },
        //       {
        //         fields: [
        //           {
        //             type: 'rplclearform',
        //             buttonText: 'Clear search filters',
        //             visible: showClearOnDirtyForm,
        //             styleClasses: ['form-group--center']
        //           }
        //         ]
        //       }
        //     ]
        //   },
        //   formOptions: {
        //     validateAfterLoad: true,
        //     validateAfterChanged: true
        //   },
        //   formState: {}
        // }
      }
    }
  },
  methods: {
    handleEvent (eventName, value) {
    },
    switchTab (tab) {
      this.activeTab = tab
      this.handleEvent('tab-change', tab)
      // if (tab === 'map') {
      //   this.$nextTick(() => {
      //     this.mapInstance.updateSize()
      //   })
      // }
    },
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
</style>
