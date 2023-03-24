<template>
  <div class="grid-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  justify-items: stretch;
  grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
}
</style>