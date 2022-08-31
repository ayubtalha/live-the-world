export const formValidation = {
  required: function (name) {
    return {
      required: true,
      message: `${name} is required.`,
    };
  },
  isEmail: function () {
    return {
      validator: (_, value) => {
        // eslint-disable-next-line
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!regEmail.test(value)) {
          return Promise.reject('Invalid Email');
        }
        return Promise.resolve();
      },
    };
  },
};
