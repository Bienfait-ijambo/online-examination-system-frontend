<template>
  <div>
    <v-tabs>
      <v-tab to="/exam_page"> <v-icon>add</v-icon> create exam</v-tab>
      <v-tab to="/exam_list"> <v-icon>description</v-icon> exam list</v-tab>
      <v-tab to="/exam_detail"> <v-icon left>dashboard</v-icon>detail</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>