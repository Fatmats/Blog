<template>
  <div>
    <div v-if="show">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide
          caption="First slide"
          img-src="https://picsum.photos/1024/480/?image=10"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Second Slide"
          img-src="https://picsum.photos/1024/480/?image=12"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Third Slide"
          img-src="https://picsum.photos/1024/480/?image=22"
        ></b-carousel-slide>
      </b-carousel>
    </div>

    <div class="row">
      <div
        class="card mt-5"
        style="width: 18rem"
        v-for="i in list"
        :key="i.title"
      >
        <img class="card-img-top" :src="i.thumbnail" :alt="i.previewText" />
        <div class="card-body">
          <h5 class="card-title">{{ i.title }}</h5>
          <h6 class="card-title">{{ i.author }}</h6>
          <p class="card-text">
            {{ i.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      list: [],
      show:"",
      cooki:this.$cookies.get("caursel")
    };
  },
  computed: {
  
  },
  watch:{
     
  },
  methods: {
    ...mapActions(["ActionGetPosts"]),
    GetApı() {
      this.ActionGetPosts().then((res) => {
        let data = res.data;
        for (let key in data) {
          this.list.push(data[key]);
        }
        console.log(this.list);
      });
    },
  },
  created() {
    this.GetApı();
      this.show= JSON.parse(this.cooki)
   
    console.log("creat" + this.show);
  },
};
</script>

<style scoped>
.row {
  margin-left: 0px !important;
  margin-right: 0px !important;
  margin-top: 5rem;
}
.card {
  margin-left: 15px;
  width: 18rem;
  height: 29rem;
  overflow: hidden;
  white-space: pre-wrap;
}
.card-title {
  text-overflow: ellipsis !important;
}
.card-img-top {
  max-height: 256px;
}
#carousel-fade {
  position: relative;
  top: 0px;
}
</style>