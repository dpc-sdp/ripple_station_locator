<template>
  <div class="app-gmap-embed">
    <iframe
      :title="title"
      referrerpolicy="no-referrer-when-downgrade"
      :src="mapLink"
      allowfullscreen>
    </iframe>
  </div>
</template>

<script>
// See: https://developers.google.com/maps/documentation/embed/embedding-map
export default {
  props: {
    mapMode: { type: String, default: 'place' }, // view or place
    apiKey: { type: String, default: process.env.GOOGLE_WEB_API_KEY },
    place: { type: String, default: 'Melbourne' }, // required for mapMode:place
    center: { type: String, default: '-37.81609,144.960904' }, // required for mapMode:view
    zoom: { type: Number, default: 15 }, // 0 to 21
    maptype: { type: String, default: 'roadmap' }, // roadmap or satellite
    region: { type: String, default: 'AU' },
    title: { type: String, default: 'Google Map' }
  },
  computed: {
    mapLink () {
      const params = {
        q: this.place,
        center: this.center,
        zoom: this.zoom,
        maptype: this.maptype,
        region: this.region
      }

      if (this.mapMode === 'place') {
        if (this.place === 'Melbourne') {
          console.warn('GmapEmbed: The place prop should be added to this map.')
        }

        // A place can also have a center parameter, but if none has been supplied, delete the default.
        if (this.center === '-37.81609,144.960904') {
          delete params.center
        }
      }

      if (this.mapMode === 'view') {
        // If map mode is view, a place will throw an error.
        delete params.q

        if (this.center === '-37.81609,144.960904') {
          console.warn('GmapEmbed: The center prop should be added to this map.')
        }
      }

      const paramsQuery = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&')

      return `https://www.google.com/maps/embed/v1/${this.mapMode}?key=${this.apiKey}&${paramsQuery}`
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.app-gmap-embed {
  iframe {
    width: 100%;
    height: 596px;
    border: 0;
    margin: rem(40px) 0;
  }
}
</style>
