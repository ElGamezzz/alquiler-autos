<template>
  <div>
    <Navigation />
    <router-view></router-view>
    
  </div>
</template>

<script >

import Navigation from '@/Navigation.vue'

export default{
  name: 'App',
  components: {
    Navigation
  },
}
</script>

<style lang = "scss">
  @import './scss/App.scss';
</style>
