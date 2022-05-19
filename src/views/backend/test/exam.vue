<template>
  <div>
    <v-tabs>
      <v-tab to="/exam_page"> <v-icon>add</v-icon> create exam</v-tab>
      <v-tab to="/exam_list"> <v-icon>description</v-icon> exam list</v-tab>
      <v-tab to="/questions" v-show="examId==''?false:true"> <v-icon left>extension</v-icon>Question</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['examId'])
  }
};
</script>