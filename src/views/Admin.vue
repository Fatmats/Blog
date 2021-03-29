<template>
  <div>
    <div class="container row">
      <router-link class="a" :to="{ name: 'Form' }">
        <h2>Yazı Ekle</h2>
      </router-link>
      <router-link class="a" :to="{ name: 'Makeup' }">
        <h2>Kişiselleştir</h2></router-link
      >
    </div>
    <hr />

    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
.row {
  margin-top: 9rem;
}
.a {
  margin-left: 6rem;
  color: #aaa;
}
.a:hover {
  color: slategrey;
  text-decoration: overline;
}
</style>