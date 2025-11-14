export const getErrorMessage = (err) => {
  let message = "";

  if (err?.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "Duplicate key error";
        break;
      default:
        message = "Something went wrong";
    }
  } else if (err?.errors) {
    for (const errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  } else if (err?.message) {
    message = err.message;
  }

  return message;
};

const errorHandler = { getErrorMessage };
export default errorHandler;
