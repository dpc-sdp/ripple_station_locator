<template>
  <div class="vp-station-locator">
    <rpl-tabs class="vp-station-locator__tabs" :tabs="tabs" :activeTab="activeTab" @rpl-tab-switch="switchTab" />
    <div class="vp-station-locator__map" v-if="activeTab === 'map'">Map view</div>
    <div class="vp-station-locator__list" v-if="activeTab === 'list'">List view</div>
  </div>
</template>

<script>
import { RplSearchResultsLayout } from '@dpc-sdp/ripple-search'
import RplTabs from '@dpc-sdp/ripple-tabs/Tabs.vue'

export default {
  name: 'RplStationLocator',
  props: {
  },
  components: {
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
