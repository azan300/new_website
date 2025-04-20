const { db } = require("../utils/firebase");


exports.saveToken = async (req, res) => {
  const { access_token, refresh_token, expiry_date } = req.body;
  const { uid, email, name } = req.user;

  const userRef = db.collection("users").doc(uid);

  try {
    await userRef.set(
      {
        email,
        name: name || "",
        access_token,
        refresh_token,
        expiry_date: expiry_date || Date.now() + 3600 * 1000, // optional
        updated_at: new Date().toISOString(),
      },
      { merge: true }
    );

    res.json({ message: "Gmail tokens saved successfully", uid });
  }
  catch (error) {
    console.error("Error saving tokens:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}