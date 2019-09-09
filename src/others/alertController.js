export default {
    successAddAlert() {
        return this.$ionic.alertController
          .create({
            header: 'Success',
            message: 'Account successfully added',
            buttons: ['OK'],
          })
          .then(a => a.present())
      },

      successEditAlert() {
        return this.$ionic.alertController
          .create({
            header: 'Success',
            message: 'Account successfully edited',
            buttons: ['OK'],
          })
          .then(a => a.present())
      },

    formAlert() {
        return this.$ionic.alertController
          .create({
            header: 'Alert',
            message: 'Please fill the fields with * mark',
            buttons: ['OK'],
          })
          .then(a => a.present())
      },

      errorPayAlert() {
        return this.$ionic.alertController
          .create({
            header: 'Alert',
            message: 'Please enter valid price',
            buttons: ['OK'],
          })
          .then(a => a.present())
      },
  
      deleteAlertConfirm() {
        return this.$ionic.alertController
          .create({
            header: 'Alert',
            message: 'Are you sure you want to delete this account?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
              },
              {
                text: 'Yes',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Okay')
                },
              },
            ],
          })
          .then(a => a.present())
      },
}