<template>
  <div class="page-header">
    <div class="header-inner">
      header msg 1 2
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

<style lang="scss" scoped>
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
    box-sizing: border-box;
    margin: 0 auto;
    padding: 15px 5px;
  }
}
</style>


