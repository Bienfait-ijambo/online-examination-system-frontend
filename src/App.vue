<template>
  <v-app>
    <v-navigation-drawer
      clipped
      v-model="drawer"
      app
      width="250"
   
    >
      <v-list dense shaped>
        <v-subheader>MENU</v-subheader>

        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <!-- <img :src="`${baseURL}/images/avatar.png`" alt="user_image" /> -->
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ userData.name }} </v-list-item-title>
              <v-list-item-subtitle>{{ userData.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

    
        <v-list-group
          v-for="list in listGroup"
          :key="list.id"
          :value="false"
          no-action
          group
        >
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>{{ list.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{ list.text }}</v-list-item-title>
          </template>

          <v-list-item-group>
            <v-list-item
              v-for="submenu in list.items"
              :key="submenu.id"
              :to="submenu.href"
            >
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <span>{{ submenu.text }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>
      </v-list>
      <!--start  list-->

      <!--end list-->

      <v-divider></v-divider>

      <v-list dense nav shaped>
        <v-list-item-group>
          <v-list-item
            style="text-decoration: none"
            v-for="link in sublinks"
            :key="link.text"
            :to="link.href"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }} </v-list-item-title>
          </v-list-item>

          <v-list-item style="text-decoration: none" @click="logout">
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Déconnexion </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- second list group  -->
    </v-navigation-drawer>

    <!--end navigation drawer-->

    <v-app-bar
      elevation="1"
      clipped-left
      app
      flat
      v-show="userData == 'null' ? false : true"
    >
      <v-toolbar-title>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <span style="font-weight: bold">Test</span>

        <!-- <img
          style="position: relative; top: 12px"
          width="90"
          :src="`${baseURL}/images/logo.png`"
          alt=""
        /> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <mainSearch /> -->
      <v-spacer></v-spacer>

      <v-btn @click="changeTheme" small fab depressed>
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>

      <!-- <avatarUser /> -->
      <!-- 
      <v-progress-linear
        v-show="isProcessing"
        :indeterminate="isProcessing"
        absolute
        bottom
        color="primary"
      ></v-progress-linear> -->
    </v-app-bar>

    <!-- #eef1f3  -->
    <v-main app dark :style="bgColor">
      <v-container>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
      <!-- <task ref="Task"/> -->
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {},

  data: () => ({
    sp: true,
    drawer: true,
   
    themeIcon: "dark_mode",
    lightBg: "background: rgb(246 248 250)",
    darkBg: "background:rgb(40, 42, 54)",
    bgColor: "background: rgb(246 248 250)",
    listGroup: [
      {
        text: "Test",
        icon: "assignment",
        items: [
          { text: "Exam", href: "/exam_page" },
          { text: "Subjects", href: "/subjects" },
        ],
      },
      {
        text: "User",
        icon: "supervised_user_circle",
        items: [{ text: "User", href: "/users" }],
      },
    ],

    sublinks: [
      { icon: "help", text: "Aide", href: "/apps/help_page" },
      { icon: "settings", text: "Paramètre", href: "/apps/setting_page" },
    ],
  }),

  computed: {
    ...mapGetters(["userData"]),
  },
  methods: {
    ...mapActions(["logout"]),

    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      !this.$vuetify.theme.dark ? this.lightMode() : this.darkMode();
    },
    lightMode() {
      this.themeIcon = "dark_mode";
      this.bgColor = this.lightBg;
    },
    darkMode() {
      this.themeIcon = "light_mode";
      this.bgColor = this.darkBg;
    },
  },
  created() {
    const userData = this.userData;
     if(userData =='null'){
       this.$router.push('/')
     }
  },
};
</script>
<style >
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.v-toolbar__content {
  border-bottom: 1px solid #dadce0;
}
*::-webkit-scrollbar {
  width: 6px;
  height: 12px;
}
*::-webkit-scrollbar-thumb {
  background-color: #dadce0;
}
*::-webkit-scrollbar-thumb:hover {
  background-color: rgb(117 117 117);
  cursor: pointer;
}
*::-webkit-scrollbar-track-piece {
  background-color: silver-dark;
}
</style>
