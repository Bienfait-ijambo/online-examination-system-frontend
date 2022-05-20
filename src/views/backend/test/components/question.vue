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
          <createQuestion />
        </v-flex>
        <v-flex md1 xs12></v-flex>
        <v-flex md6 xs12>
          <v-card>
            <v-card-title
              >What is dependy injection ?
              <v-spacer></v-spacer>
              <v-btn depressed small fab>
                <v-icon>edit</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <ol style="line-height: 35px; font-size: 16px">
                <li>PayPal extended the tools they were using</li>
                <li>PayPal extended the tools they were using</li>
                <li>PayPal extended the tools they were using</li>
                <li>PayPal extended the tools they were using</li>
                <li>PayPal extended the tools they were using</li>
              </ol>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import createQuestion from "./components/createQuestion";
export default {
  components: {
    createQuestion,
  },
  computed: {
    ...mapGetters(["examId", "examName"]),
  },
};
</script>