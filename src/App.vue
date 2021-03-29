<template>
  <div id="app">
    <div id="nav">
      <Header />
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Header from "./components/Header";

export default {
  components: {
    Header,
  },
  methods: {
    ...mapActions(["ActionGetColor"]),

    async getColor() {
      await this.ActionGetColor().then((result) => {
        const { bgcolor } = result.data;
        document.body.style.background = `url(${bgcolor})`;
      });
    },
  },
  created() {
    this.getColor();
    
  },
};
</script>
<style lang="scss">
body {
  background-size: cover!important;
}
</style>
