function handleError(req, res) {
  
}

function getErrorMessage(err) {
  console.log(err);
  if (err?.message) return err.message;
  if (typeof err === "string") return err;
  return "An error occurred";
}

export default { handleError, getErrorMessage };
