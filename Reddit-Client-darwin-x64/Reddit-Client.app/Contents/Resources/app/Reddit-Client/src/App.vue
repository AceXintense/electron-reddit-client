<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
      name: 'app',
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
    background-color: #263238;
  }
  .container-fluid, .container-fluid .row, .container-fluid .row .col-sm-3, .container-fluid .row .col-sm-9 {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #263238;
    margin: 0;
  }
</style>
