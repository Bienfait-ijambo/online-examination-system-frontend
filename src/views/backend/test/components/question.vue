<template>
  <v-layout>
    <v-flex md12>
      <v-layout>
        <v-flex md12>
          <h2>
            {{ examName }}
          </h2>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex md5 xs12>
          <createQuestion v-on:onPageChange="onPageChange" />
        </v-flex>
        <v-flex md1 xs12></v-flex>
        <v-flex md6 xs12>
          <v-layout>
            <v-flex md11>
              <v-text-field
                prepend-inner-icon="search"
                dense
                outlined
                rounded
                solo
                @keyup="search"
                v-model="query"
                placeholder="Search for question..."
              ></v-text-field>
            </v-flex>
            <v-flex md1>
              <v-btn @click="onPageChange" :loading="loading" fab small>
                <v-icon>autorenew</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>

          <v-card v-for="data in fetchData" :key="data.id" class="mb-1">
            <v-card-title>
              <v-textarea
                dense
                :value="data.question_title"
                rows="1"
                filled
            
                style="width: 450px; color: black"
              ></v-textarea>

              <v-spacer></v-spacer>
              <v-btn @click="editQuestion(data.id, data.question_title)" depressed small fab>
                <v-icon small>edit</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-subtitle> Options
                <v-btn  style="float:right;" outlined small icon color="red"  dark >
                    <v-icon small>add_task</v-icon>
                </v-btn>
                 </v-card-subtitle>
            <v-card-text>
              <ul
                style="line-height: 35px; font-size: 16px; list-style: none"
                v-for="option in data.Options"
                :key="option.id"
              >
                <li>
                  <v-text-field
                    dense
                    :value="option.option_title"
                    append-icon="edit"
                  ></v-text-field>
                </li>
              </ul>
            </v-card-text>
          </v-card>

            <v-pagination
              circle
              color="primary"
              v-model="page"
              :length="pagination.total"
              @input="onPageChange"
            ></v-pagination>
            <br><br>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "lodash";
import createQuestion from "./components/createQuestion";
export default {
  components: {
    createQuestion,
  },
  data() {
    return {
      page: 0 + 1,
      fetchData: null,
      query: "",
      loading: false,
      pagination: {
        current: 0,
        total: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["examId", "examName"]),
  },
  methods: {

     editQuestion(id,question_title) {
      this.loading = true;
      this.putData(`question`, JSON.stringify({id:id,examId:this.examId, question_title:question_title}))
        .then(({ data }) => {
          this.showMsg(data.message);
          this.loading = false;
        })
        .catch(() => (this.loading = false))
    },

    urlString() {
      let current = this.page;
      return this.query != ""
        ? `options?search=${this.query}&examId=${
            this.examId
          }&size=5&page=${(current = 0)}`
        : `options?search=${this.query}&examId=${this.examId}size=5&page=${
            current - 1
          }`;
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
    search: _.debounce(function () {
      this.onPageChange(this.urlString());
    }, 300),
  },
  created() {
    this.onPageChange();
  },
};
</script>