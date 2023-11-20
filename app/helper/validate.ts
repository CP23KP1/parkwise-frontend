export const validateEmail = (email: string) => {

};

export const validatePassword = (password: string) => {
  if (password.length >= 8) {
    return true;
  }
  return false;
};
