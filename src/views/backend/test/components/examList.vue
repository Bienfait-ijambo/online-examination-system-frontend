<template>
  <v-layout>
    <v-flex md12>
      <!-- dialog start here -->

      <br />
      <v-layout>
        <v-col cols="12" md="1">
          <v-btn :loading="loading" @click="onPageChange" fab small>
            <v-icon>autorenew</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            flat
            outlined
            clearable
            rounded
            solo
            dense
            v-model="query"
            @keyup="search"
            style="max-width: 250px"
            placeholder="Recherche..."
            prepend-inner-icon="search"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6"></v-col>
        <v-col cols="12" md="1"> </v-col>
        <v-flex md12> </v-flex>
      </v-layout>

      <v-layout>
        <v-flex md12>
          <v-card>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        <b>Exams</b>
                      </th>
                      <th class="text-left">
                        <b>Duration</b>
                      </th>
                      <th class="text-left">
                        <b>Total Question</b>
                      </th>
                      <th class="text-left">
                        <b>Right Question</b>
                      </th>
                      <th class="text-left">
                        <b>Date</b>
                      </th>

                      <th class="text-left">
                        <b> Action </b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in fetchData" :key="data.id">
                      <td>{{ data.Subject.subjectName }}</td>
                      <td>{{ data.duration }}</td>
                      <td>{{ data.total_question }}</td>
                      <td>{{ data.right_question }}</td>
                      <td>{{ data.createdAt | formatDate }}</td>

                      <td>
                        <v-menu
                          bottom
                          rounded
                          offset-y
                          transition="scale-transition"
                        >
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" small fab depressed text>
                              <v-icon>more_horiz</v-icon>
                            </v-btn>
                          </template>

                          <v-list dense width="">
                            <v-list-item
                              link
                              @click="goToQuestionPage(data.id,data.Subject.subjectName)"
                            >
                              <v-list-item-icon>
                                <v-icon>description</v-icon>
                              </v-list-item-icon>
                              <v-list-item-title style="margin-left: -20px"
                                >Questions</v-list-item-title
                              >
                            </v-list-item>

                            <v-list-item
                              link
                              @click="
                                passDataToForm(
                                  data.id,
                                  data.Subject.id,
                                  data.duration,
                                  data.total_question,
                                  data.right_question,
                                  data.bad_question
                                )
                              "
                            >
                              <v-list-item-icon>
                                <v-icon>edit</v-icon>
                              </v-list-item-icon>
                              <v-list-item-title style="margin-left: -20px"
                                >Modifier</v-list-item-title
                              >
                            </v-list-item>
                            <v-list-item link @click="deleteSubject(data.id)">
                              <v-list-item-icon>
                                <v-icon>delete</v-icon>
                              </v-list-item-icon>
                              <v-list-item-title style="margin-left: -20px"
                                >supprimer</v-list-item-title
                              >
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex md12
          ><br /><br />
          <div align="center">
            <v-pagination
              circle
              color="primary"
              v-model="page"
              :length="pagination.total"
              @input="onPageChange"
            ></v-pagination>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import _ from "lodash";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    page: 0 + 1,
    fetchData: null,
    query: "",
    loading: false,
    pagination: {
      current: 0,
      total: 0,
    },
  }),
  computed: {
    ...mapGetters(["examData", "editExam"]),
  },
  methods: {
    goToQuestionPage(id,examName) {
      this.$store.state.Question.questionData.examId = id;
      this.$store.state.Question.examName = examName;
      this.$router.push("/questions");
    },
    urlString() {
      let current = this.page;
      return this.query != ""
        ? `get_exams?search=${this.query}&size=10&page=${(current = 0)}`
        : `get_exams?search=${this.query}&size=10&page=${current - 1}`;
    },
    onPageChange() {
      this.loading = true;
      this.getData(this.urlString())
        .then(({ data }) => {
          this.fetchData = data.data.rows;
          this.pagination.current = data.currentPage;
          this.pagination.total = data.totalPages;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    passDataToForm(
      id,
      courseId,
      duration,
      total_question,
      right_question,
      bad_question
    ) {
      Object.assign(this.examData, {
        id: id,
        courseId: courseId,
        duration: duration,
        total_question: total_question,
        right_question: right_question,
        bad_question: bad_question,
      });

      this.$router.push("/exam_page");
      this.$store.state.Exam.editExam = true;
    },
    deleteSubject(id) {
      this.confirmMsg().then(() => {
        this.deleteData(`delete_exam/${id}`).then(({ data }) => {
          this.showMsg(data.message);
          this.onPageChange();
        });
      });
    },
    search: _.debounce(function () {
      this.onPageChange(this.urlString());
    }, 300),
  },
  created() {
    this.onPageChange();
  },
};
</script>

<style scoped>
span {
  font-size: 15px;
}
</style>
