export default {
 
  methods: {
   
    showMsg(msg) {
      this.$toasted.show(msg, {
        icon: "info",
        action: {
          text: "Fermer",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
        theme: "toasted-primary",
        position: "bottom-right",
        duration: 8000,
      });
    },

    showError(msg) {
      this.$toasted.show(msg, {
        icon: "info",
        action: {
          text: "Fermer",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
        theme: "bubble",
        position: "bottom-right",
        duration: 8000,
      });
    },

    confirmMsg() {
      return new Promise((resolve, reject) => {
        this.$swal
          .fire({
            title: "êtes-vous sûr ?",
            text: "Voulez-vous vraiment supprimer !",
            icon: "warning",
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continuer !",
            denyButtonText: `Annuler`,
          })
          .then((result) => {
            if (result.isConfirmed) {
              resolve(result.isConfirmed);
            } else if (result.isDenied) {
              reject(result.isDenied);
            }
          });
      });
    },
  },
};
