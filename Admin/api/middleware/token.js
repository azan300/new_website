const {db} = require("../utils/firebase");


const validateIdentifier = async (req, res, next) => {
  const {id} = req.query;
  if (!id) return next();
  const detail = await db.collection("users").doc(id).get();
  console.log(detail.data());
  req.token = detail.data();
  next();
};


module.exports = {
  validateIdentifier
}