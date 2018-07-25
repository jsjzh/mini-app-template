<template>
  <div id="app">
    <page-header />
    <page-container />
    <!-- <a href="/world">to world</a> -->
    <!-- <img src="~assets/image/logo.png"> -->
  </div>
</template>

<script>
import pageHeader from "./_components/pageHeader";
import pageContainer from "./_components/pageContainer";

export default {
  name: "App",
  components: { pageContainer, pageHeader }
};
</script>

<style lang="scss">
// $bg-color: red;
// #app {
//   background-color: $bg-color;
// }
</style>