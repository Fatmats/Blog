<template>
  <div class="ml-5">
    <hr />
    <form class="container form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Yazar</label>
        <input
          v-model="post.author"
          type="text"
          class="form-control"
          placeholder="Yazar adını giriniz..."
        />
      </div>
      <div class="form-group">
        <label>Başlık</label>
        <input
          v-model="post.title"
          type="text"
          class="form-control"
          placeholder="Yazının başlığını giriniz..."
        />
      </div>
      <div class="form-group">
        <label>Görsel Bağlantısı</label>
        <input
          v-model="post.thumbnail"
          type="text"
          class="form-control"
          placeholder="Yazının görselini giriniz..."
        />
      </div>
      <div class="form-group">
        <label>Önizleme Metni</label>
        <input
          v-model="post.previewText"
          type="text"
          class="form-control"
          placeholder="Yazının önizleme metnini giriniz..."
        />
      </div>
      <div class="form-group">
        <label>Yazı</label>
        <textarea
          v-model="post.content"
          cols="30"
          rows="5"
          class="form-control"
        ></textarea>
      </div>
      <button @click="$router.push('/')" class="btn btn-danger mr-4">İptal</button>
      <button  type="submit" class="btn btn-info">
        Kaydet
      </button>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      post: {
        author: "",
        content: "",
        previewText: "",
        thumbnail: "",
        title: "",
        updatedDate: "",
      },
    };
  },
  methods: {
    ...mapActions(["ActionSetPost"]),
  async  onSubmit() {
     await this.ActionSetPost({ ...this.post }).then(()=>{
       this.post=""
     });
    },
  },
};
</script>

<style >
.form{
  background-color: honeydew;
      border-radius: 9px;
    padding: 40px;
}
</style>