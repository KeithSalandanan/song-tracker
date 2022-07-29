<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&family=Rubik:wght@300&display=swap');
#app {
  font-family: 'Rubik', 'Avenir', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #1E1E1E;
}

.text-title{
  font-family: 'Montserrat';
  font-weight: 800;
}
</style>
