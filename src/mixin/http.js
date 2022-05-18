// import { reject, resolve } from "core-js/fn/promise";
import axios from "axios";
// import { Promise } from "core-js/library/web/timers";
export default {
  data: () => ({
    
    baseUrl: "http://localhost:8080/",
    apiBaseURL: "http://localhost:5000/api",
    userInfo: localStorage.getItem("userData"),
  }),

  methods: {
    verifyToken() {
      let getToken = JSON.parse(this.userInfo);
      if (getToken != null) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.token}`,
          },
        };
        return config;
      }
    },

    async getData(url) {
      const config = this.verifyToken();
      return await new Promise((resolve, reject) => {
        axios
          .get(`${this.apiBaseURL}/${url}`, config)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            if (error.response.status === 401) {
              localStorage.removeItem("userData");
              window.location.reload();
            }
          });
      });
    },

    postData(url,data) {
      const config = this.verifyToken();
      return new Promise((resolve, reject) => {
        axios
          .post(`${this.apiBaseURL}/${url}`,data,config)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            const { message } = error.response.data.error;
            this.showError(message.replaceAll('"', " "));
            reject(message)
          });
      });
    },

    
    deleteData(url,data) {
      const config = this.verifyToken();
      return new Promise((resolve, reject) => {
        axios
          .delete(`${this.apiBaseURL}/${url}`,data,config)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            const { message } = error.response.data.error;
            this.showError(message.replaceAll('"', " "));
            reject(message)
          });
      });
    },

    putData(url,data){
      const config = this.verifyToken();
      return new Promise((resolve, reject) => {
        axios
          .put(`${this.apiBaseURL}/${url}`,data,config)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            const { message } = error.response.data.error;
            this.showError(message.replaceAll('"', " "));
            reject(message)
          });
      });
    },




    resetObj(svData) {
      for (let key in svData) {
        svData[key] = "";
      }
    },
  },
};
