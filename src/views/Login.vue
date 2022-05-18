<template>
  <v-layout row wrap>
    <v-flex md12>
      <br />
      <v-layout row wrap>
        <v-flex xs12 md4></v-flex>
        <v-flex xs12 md4>
          <v-card :disabled="loading" elevation="0">
            <!-- <div align="center" style="position: relative; top: 10px">
              <h3>Online Exam-app</h3>
            </div> -->
            <v-card-text>
              <v-layout >
                <v-flex x12 md2></v-flex>
                <v-flex x12 md8>
                  <v-form ref="form" lazy-validation autocomplete="off">
                    <div
                      align="center"
                      style="cursor: pointer"
                      class="headline"
                    >
                      <br />
                      <h3>Login</h3>
                      <!-- Connexion -->
                    </div>
                    <br />
                    <v-text-field
                      v-model="svData.email"
                      autofocus
                      outlined
                      label="E-mail"
                      append-icon="email"
                      :rules="[
                        (v) => !!v || 'Ce champ est requis',
                        (v) =>
                          /.+@.+\..+/.test(v) || 'Doit être un email valide',
                      ]"
                      placeholder="E-mail"
                    ></v-text-field>

                    <v-text-field
                      placeholder="Password"
                      label="Password"
                      v-model="svData.password"
                      :type="show1 ? 'text' : 'password'"
                      outlined
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :rules="[(v) => !!v || 'Ce champ est requis']"
                      @click:append="show1 = !show1"
                    ></v-text-field>
                    <!-- <div style="position: relative; top: -20px">
                      <a href="">Mot de passe oublier ?</a>
                    </div> -->
                    <v-btn
                      dark
                      :loading="loading"
                      color="primary"
                      block
                      @click="validate"
                    >
                      <v-icon left>exit_to_app</v-icon>
                      Connexion</v-btn
                    >
                    <br />
                  </v-form>
                </v-flex>
                <v-flex x12 md2></v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex sx12 md4></v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    svData: {
      email: "ijambo@gmail.com",
      password: "090912",
    },
    loading: false,
    show1: false,
  }),
  computed: {
    ...mapGetters(["api", "safeApi", "userData"]),
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        fetch(`${this.api}/login_admin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(this.svData),
        })
          .then((res) => res.json())
          .then(({ data }) => {
            if (data.isLogin) {
              //logged in
              localStorage.setItem("userData", JSON.stringify(data));
              window.location.href = "/users";
            }
            if (data.isLogin === false) {
              console.log(data.msg);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style >
.v-toolbar__content {
  border-bottom: 1px solid #dadce0;
}
</style>