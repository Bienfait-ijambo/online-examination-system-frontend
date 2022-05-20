<template>
  <v-card>
    <v-card-title> Question <v-spacer></v-spacer> </v-card-title>
    <v-card-text>
      <v-text-field v-model="questionData.question_title" label="Question" outlined dense></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="register" :loading="loading" dark> save </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["examId", "examName","questionData"]),
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    register() {
      this.loading = true;
      this.postData(`question`, JSON.stringify(this.questionData))
        .then(({ data }) => {
          this.showMsg(data.message);
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
  },
};
</script>