export const handleSaveError = (error, data, next) => {
  console.log(error.code);
  console.log(error.name);

  const { code, name } = error;
  // error.status = 400;

  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};
export const handleUpdateValide = function (next) {
  this.options.runValidators = true;
  next();
};
