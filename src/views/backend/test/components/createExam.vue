<template>
  <div>
    <br /><br />

    <v-layout>
      <v-flex md4>
        <v-card :loading="loading" :disabled="loading">
          <v-form ref="form" lazy-validation aria-autocomplete="off">
            <v-card-title> New exam </v-card-title>
            <v-card-text>
              <v-layout>
                <v-flex md="12">
                  <v-autocomplete
                    label="Subject"
                    prepend-inner-icon="description"
                    outlined
                    v-model="examData.courseId"
                    :items="subjects"
                    item-value="id"
                    item-text="subjectName"
                    required
                    dense
                  ></v-autocomplete>
                  <v-select
                    label="Time"
                    outlined
                    v-model="examData.duration"
                    item-value="value"
                    item-text="value"
                    :items="time"
                    required
                    dense
                  ></v-select>
                  <v-select
                    label="Number of Question"
                    outlined
                    :items="question"
                    v-model="examData.total_question"
                    item-value="value"
                    item-text="value"
                    required
                    dense
                  ></v-select>
                  <v-select
                    label="Good answer"
                    outlined
                    :items="goodMark"
                    v-model="examData.right_question"
                    item-value="value"
                    item-text="value"
                    required
                    dense
                  ></v-select>
                  <v-select
                    label="Wrong answer"
                    outlined
                    :items="wrongAnwer"
                    v-model="examData.bad_question"
                    item-value="value"
                    item-text="value"
                    required
                    dense
                  ></v-select>
                  
                  
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                :loading="loading"
                small
                color="primary"
                dark
                @click="validate"
              >
                <span> {{ this.editExam ? "Edit" : "Save" }}</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      edit: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["examData", "subjects", "question", "time", "goodMark","editExam","wrongAnwer"]),
  },
  methods: {
    ...mapActions(["getSubject"]),
    validate() {
      if (!this.editExam) this.register()
      else
      this.updateData()
    },

    register() {
      this.loading = true;
      this.postData(`new_exam`, JSON.stringify(this.examData))
        .then(({ data }) => {
          this.showMsg(data.message);
          this.resetObj(this.examData);
          this.loading = false;
           this.$store.state.Exam.editExam = false;
        })
        .catch(() => (this.loading = false));
    },
    updateData() {
      this.loading = true;
      this.putData(`update_exam`, JSON.stringify(this.examData))
        .then(({ data }) => {
          this.showMsg(data.message);
          this.$store.state.Exam.editExam = false;
          this.resetObj(this.examData);
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
  },
  created() {
    this.getSubject();
   
  },
};
</script>