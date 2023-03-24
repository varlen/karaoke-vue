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
    <div class="repo-container">
      <a href="https://github.com/varlen/karaoke-vue"><b-icon icon="github"></b-icon></a>
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

.repo-container {
  text-align: center;
}

.repo-container > a {
  color: black;
  padding-bottom: 2vh;
}
</style>