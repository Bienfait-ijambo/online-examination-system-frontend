<template>
  <v-layout>
    <v-flex md12>
      <!-- dialog start here -->
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="dialog"
        persistent
        max-width="400px"
      >
        <v-card :loading="loading" :disabled="loading">
          <v-form ref="form" lazy-validation aria-autocomplete="off">
            <v-toolbar flat>
              <span style="color: #d30e6c; font-size: 20px; font-weight: bold"
                >Utilisateur</span
              >
              <v-spacer></v-spacer>
              <v-btn depressed text small fab @click="dialog = false">
                <v-icon>close</v-icon>
              </v-btn></v-toolbar
            >

            <v-card-text>
              <v-layout>
                <v-flex md="12">
                  <v-text-field
                    label="Name"
                    prepend-inner-icon="person"
                    outlined
                    required
                    dense
                    v-model="svData.name"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-text-field
                label="E-mail"
                prepend-inner-icon="email"
                outlined
                dense
                hint="on utilisera pour envoyer des mail"
                v-model="svData.email"
              ></v-text-field>

              <v-select
                label="User-type"
                prepend-inner-icon="card_travel"
                outlined
                :items="userType"
                item-text="user_type"
                dense
                v-model="svData.user_type"
              ></v-select>
              <v-text-field
                label="Password"
                prepend-inner-icon="lock"
                outlined
                dense
                type="password"
                v-model="svData.password"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn @click="dialog = false" small depressed text>
                fermer
              </v-btn>
              <v-btn
                :loading="loading"
                small
                color="primary"
                dark
                @click="validate"
              >
                <span> {{ edit ? "Modifier" : "Enregistrer" }}</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <!-- dialog end here -->
      <h2>Utilisateurs</h2>

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
            @keyup="searchUsers"
            style="max-width: 250px"
            placeholder="Recherche..."
            prepend-inner-icon="search"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6"></v-col>
        <v-col cols="12" md="1">
          <v-btn
            style="float: right"
            @click="showModal"
            fab
            small
            color="primary"
            dark
          >
            <v-icon large>add</v-icon>
          </v-btn>
        </v-col>
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
                      <td>
                        <b>Image</b>
                      </td>
                      <th class="text-left">
                        <b>Name</b>
                      </th>

                      <th class="text-left">
                        <b>E-mail</b>
                      </th>
                      <th class="text-left">
                        <b>Role</b>
                      </th>

                      <th class="text-left">
                        <b> Action </b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in fetchData" :key="data.id">
                      <td>
                        <img
                          alt="Vue logo"
                          width="50"
                          style="border-radius: 50px"
                          src="../../assets/avatar.png"
                        />
                        <!-- <userImage
                          :width="50"
                          :height="50"
                          :image="data.image"
                        /> -->
                      </td>
                      <td>{{ data.name }}</td>

                      <td>
                        <a :href="'mailto:' + data.email">{{ data.email }}</a>
                      </td>
                      <td>{{ data.user_type }}</td>

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
                            <v-list-item link @click="editData(data.id)">
                              <v-list-item-icon>
                                <v-icon>edit</v-icon>
                              </v-list-item-icon>
                              <v-list-item-title style="margin-left: -20px"
                                >Modifier</v-list-item-title
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
// import { mapGetters } from "vuex";
// import userList from '../components/userList'
// import userImage from "../../components/userImage";
import _ from "lodash";
export default {
  data: () => ({
    page: 0 + 1,
    fetchData: null,
    query: "",
    loading: false,
    //end api
    dialog: false,

    //server data
    svData: {
      name: "",
      email: "",
      user_type: "",
      password: "",
    },
    edit: false,
    userType: [{ user_type: "Admin" }],
    pagination: {
      current: 0,
      total: 0,
    },
  }),
  methods: {
    validate() {
      this.loading = true;
      this.postData(`register`, JSON.stringify(this.svData))
        .then(({ data }) => {
          this.showMsg(data.message);
          this.edit = false;
          this.onPageChange();
          this.resetObj(this.svData);
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },

    urlString() {
      let current = this.page;
      return this.query != ""
        ? `list_users?search=${ this.query}&filter_by_type=Admin&size=1&page=${(current = 0)}`
        : `list_users?search=${this.query}&filter_by_type=Admin&size=10&page=${ current - 1 }`;
    },
    onPageChange() {
      this.getData(this.urlString()).then(({ data }) => {
        this.fetchData = data.data.rows;
        this.pagination.current = data.currentPage;
        this.pagination.total = data.totalPages;
      });
    },
    searchUsers: _.debounce(function () {
      this.onPageChange(this.urlString());
    }, 300),

    showModal() {
      this.dialog = true;
      this.resetObj(this.svData);
      this.edit = false;
    },
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
