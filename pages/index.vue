<template>
  <section class="hero">
    <div class="hero-body">
      <p class="title">
        Catálogos de Karaokê
      </p>
      <b-button tag="router-link"
          style="width:100%"
          to="/w8"
          type="is-primary"
          size="is-large">
          W8 Bar
          <p class="venue-location"><b-icon icon="map-marker" size="is-small"></b-icon>  Vila Isabel</p>
      </b-button>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'IndexPage',
  components: {
    Card
  }
}
</script>

<style scoped>
.venue-location {
  font-size:small;
  font-weight:normal;
}
</style>