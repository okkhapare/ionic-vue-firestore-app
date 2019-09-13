<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>User Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <form>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-label>Email</ion-label>
              <ion-input
                type="email"
                id="email"
                @input="email = $event.target.value"
                :value="email"
              ></ion-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-label>Password</ion-label>
              <ion-input
                type="password"
                id="password"
                @input="password = $event.target.value"
                :value="password"
              ></ion-input>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-content>
    <ion-button type="submit" @click="onSubmit()" expand="full">Login</ion-button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "UserLogin",

  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    onSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$ionic.alertController
              .create({
                header: "Success",
                message: "Successfully Logged In!",
                buttons: ["OK"]
              })
              .then(a => a.present());
            this.$router.go({ path: this.$router.path });
          },
          err => {
            return this.$ionic.alertController
              .create({
                header: "Alert",
                message: err,
                buttons: ["OK"]
              })
              .then(a => a.present());
          }
        );
    }
  }
};
</script>

<style scoped>
ion-content {
  /* --background: #3880ff !important; */
  font-family: Montserrat !important;
}

ion-col {
  padding: 15px 0px !important;
}

ion-title {
  font-family: Montserrat !important;
  font-size: 18px !important;
  letter-spacing: 1px !important;
  color: #737373 !important;
}

ion-label {
  font-size: 16px !important;
  margin: 0px 10px !important;
}

ion-input {
  font-family: Montserrat !important;
  border: 1px solid !important;
  border-radius: 25px !important;
  margin: 10px 0px !important;
  padding-left: 15px !important;
}

ion-input:focus {
  border: 1px solid green;
}

ion-button {
  font-family: Montserrat !important;
  font-size: 16px;
}
</style>