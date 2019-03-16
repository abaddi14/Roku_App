
import UsersComponent from './components/UsersComponent.js';
import LoginComponent from './components/LoginComponent.js';
import AdminComponent from './components/AdminComponent.js';
import UserHomeComponent from './components/UserHomeComponent.js';

let router = new VueRouter({

  routes: [
      { path: '/', redirect: { name: "login"} },
      { path: '/login', name: "login", component: LoginComponent },
      { path: '/users', name: 'users', component: UsersComponent },
      { path: '/userhome', name: "home", component: UserHomeComponent, props: true },
      { path: '/admin', name: 'admin', component: AdminComponent }
  ]
});

const vm = new Vue({

  data: {
    socItems: [

      {link:"http://www.twitter.com", id: "twitter", class: "fab fa-twitter"},
      {link:"http://www.facebook.com", id: "facebook", class: "fab fa-facebook-square"},
      {link:"http://www.instagram.com", id: "instagram", class: "fab fa-instagram"},
      {link:"https://www.youtube.com/", id: "instagram", class: "fab fa-youtube"},

    ],
    authenticated: false,
    administrator: false,

    genericMessage: "Hello",

    mockAccount: {
      username: "user",
      password: "password"
    },

    user: [],
    toastmessage: "Login failed!"
  },

  created: function() {
    if (localStorage.getItem("cachedUser")) {
      let user = JSON.parse(localStorage.getItem("cachedUser"));
      this.authenticated = true;
      this.$router.push({ name: "home", params: { currentuser: user }});
    } else {
      this.$router.push({ path: "/login"} );
    }
  },

  methods: {
    setAuthenticated(status, data) {
      this.authenticated = status;
      this.user = data;
    },

    popError(errorMsg) {
      $('.toast').toast('show');
    },

    logout() {

      if (localStorage.getItem("cachedUser")) {
        localStorage.removeItem("cachedUser");
      }
      this.$router.push({ path: "/login" });
      this.authenticated = false;


    }
  },

  router: router
}).$mount("#app");

router.beforeEach((to, from, next) => {
  console.log('router guard fired!', to, from, vm.authenticated);

  if (vm.authenticated == false) {
    next("/login");
  } else {
    next();
  }


});
