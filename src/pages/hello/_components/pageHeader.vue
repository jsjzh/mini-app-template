<template>
  <div class="page-header">
    <div class="header-inner">
      <a href="/hello">
        <img class="logo" src="~assets/image/logo.png" alt="logo">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "page-header",
  data() {
    return {
      pageName: "page-header"
    };
  }
};
</script>

<style lang="scss">
.page-header {
  background-color: #f60;
  position: fixed;
  z-index: 999;
  height: 55px;
  top: 0;
  left: 0;
  right: 0;
  .header-inner {
    max-width: 800px;
    margin: 0 auto;
    padding: 15px 5px;
    a {
      color: hsla(0, 0%, 100%, 0.8);
      line-height: 24px;
      transition: color 0.15s ease;
      display: inline-block;
      vertical-align: middle;
      font-weight: 300;
      letter-spacing: 0.075em;
      margin-right: 1.8em;
      .logo {
        width: 24px;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>



