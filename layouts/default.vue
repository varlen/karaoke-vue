<template>
  <div class="base">
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/"
        >
          <h2>Karaokê</h2>
        </a>

        <div class="navbar-burger" @click="showMenu = !showMenu">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-2 section" v-if="showMenu">

        <p class="menu-label is-hidden-touch">
          Menu
        </p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of visibleMenuItems"
            :key="key"
          >
            <NuxtLink
              :to="item.to"
              exact-active-class="is-active"
            >
              <b-icon :icon="item.icon" /> {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </aside>

      <div class="container column is-10 expand-height">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  created () {
  },
  computed: {
    visibleMenuItems () {
      return this.items
    }
  },
  data () {
    return {
      showMenu: false,
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'W8 Bar',
          icon: 'beer',
          to: { name: 'w8' }
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.expand-height {
  min-height: 96vh;
  max-height: 96vmin;
}
</style>