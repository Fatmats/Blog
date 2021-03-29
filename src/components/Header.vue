<template>
  <b-navbar class="b-navbar" toggleable="lg">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link class="a" to="/anasayfa">Home </router-link>
        </b-nav-item>

        <b-nav-item>
          <router-link class="a" to="/auth">Giriş </router-link>
        </b-nav-item>
        <b-nav-item :class="logoutClass">
          <a @click="actionLogout" class="a" > Çikiş</a>
        </b-nav-item>
        <b-nav-item :class="logoutClass">
          <router-link class="a" to="/panel"> Panel</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <div>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
              type="search"
              aria-label="Search"
              v-model="text"
              @focus="open = !open"
              
            ></b-form-input>
            <div id="open" v-if="open">
              <div v-for="i in filtred" :key="i.title">
                <router-link 
                  class="list-group-item list-group-item-action"
                  :to="{ name: 'Search', params: { title: i.title } }"
                  >{{ i.title }}</router-link
                >
              </div>
            </div>
          </div>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      text: "",
      open: false,
      dataList: [],
    };
  },
  methods: {
    ...mapActions(["actionLogout", "ActionGetPosts"]),
    ...mapMutations(["SetText"]),

    fetch() {
      this.ActionGetPosts().then((res) => {
        let data = res.data;
        for (let key in data) {
          this.dataList.push(data[key]);
        }
      });
    },
  },
  computed: {
    logoutClass() {
      return {
        "d-none": !this.$store.getters.isAuth,
      };
    },
    filtred() {
      const regepx = new RegExp(this.text, "i");
      return this.dataList.filter((element) => {
        return element.title.match(regepx);
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style  scoped>
#open {
  width: 169px;
  background-color: white;
  height: 178px;
  position: absolute;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 10;
  overflow: overlay;
}
#open::-webkit-scrollbar-track {
 box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#open::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

#open::-webkit-scrollbar-thumb {
  background-color: #ffc1072b;
  border: 2px solid #ffcdba3b;
}
.b-navbar {
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 0px;
}

.a {
  display: block;
  padding: 15px;
  text-decoration: none;
  color: #aaa;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0 10px;
  position: relative;
  transition: all 2s;
  text-shadow: 2px 1px 3px #343a40;
}

.a:after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 0%;
  content: ".";
  color: transparent;
  background: rgba(224, 195, 28, 0.459);
  height: 1px;
  text-align: left;

  margin: 0;
  opacity: 0;
}
.a:hover {
  color: #fff;
  z-index: 1;
}
.a:hover:after {
  z-index: -10;
  animation: fill 1s forwards;
  opacity: 1;
}
@keyframes fill {
  0% {
    width: 0%;
    height: 1px;
  }
  50% {
    width: 100%;
    height: 1px;
  }
  100% {
    width: 100%;
    height: 100%;
    background: rgba(224, 195, 28, 0.459);
  }
}
</style>

 




