<template>
  <div class="container first">
    <div class="row">
      <div class="col">
        <label>Arkaplan Görseli: </label>
        <input
          type="text"
          class="form-control-text ml-md-5"
          placeholder="Görsel Bağlantisi Girin"
          v-model="outlook.bgcolor"
          @change="setColor"
        />
        <b-button
          size="sm"
          class="btn btn-secondary ml-md-2 mb-md-1"
          @click="getColor"
          >Basın</b-button
        >
      </div>
      <div class="form-check form-switch col">
        <label>Slaytı Aktif etmek İçin Basınız:</label>
        <b-button class="ml-md-5" variant="warning" @click="click" size="md">
          Slaytı aktif edin
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      outlook: {
        bgcolor: "",
      },
    };
  },
  methods: {
    ...mapActions(["ActionGetColor", "ActionPutColor"]),
    ...mapMutations(["MutationCaursel"]),
    async setColor() {
      await this.ActionPutColor({ ...this.outlook }).then((result) => {
        console.log(result);
         Vue.swal.fire({
        toast: true,
        title: "Arkaplan hazır lütfen butona basın",
        icon: "success",
        position: "top-end",
        timer: "3000",
        showConfirmButton: false,
      });
      });
    },
    async getColor() {
      await this.ActionGetColor().then((result) => {
        document.body.style.background = `url(${result.data.bgcolor})`;
        console.log(result.data);
      });
    },
    click() {
      this.MutationCaursel();
      Vue.swal.fire({
        toast: true,
        title: "Değişiklik Kaydedildi!!",
        icon: "success",
        position: "top-end",
        timer: "3000",
        showConfirmButton: false,
      });
    },
  },
  created() {
    this.getColor();
  },
};
</script>

<style >
.first {
  background-color: honeydew;
  border-radius: 5px;
}
.row {
  padding: 25px;
}
label {
  font-weight: bolder;
}
</style>