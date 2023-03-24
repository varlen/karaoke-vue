<template>
    <div class="card">
      <header class="card-header has-text-centered card-title">
        <p class="card-header-title has-text-white">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content ">
          <slot />
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'BuefyCard',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.card-title {
  background: #891934;
  color: #ddd!
}

.card {
  margin: .5rem;
}
</style>