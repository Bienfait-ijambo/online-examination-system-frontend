import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () =>
      import(/* webpackChunkName: "users" */ "../views/backend/users.vue"),
  },

  {
    path: "/subjects",
    name: "subjects",
    component: () =>
      import(
        /* webpackChunkName: "subjects" */ "../views/backend/subjects.vue"
      ),
  },
  {
    path: "/exam_page",
    name: "exam_page",
    component: () =>
      import(/* webpackChunkName: "exam" */ "../views/backend/test/exam.vue"),
    children: [
      {
        path: "/",
        component: () =>
          import(
            /* webpackChunkName: "createExam" */ "../views/backend/test/components/createExam.vue"
          ),
      },
      {
        path: "/exam_list",
        component: () =>
          import(
            /* webpackChunkName: "examList" */ "../views/backend/test/components/examList.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
