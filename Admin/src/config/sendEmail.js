import axios from "axios";

const sendEmail = async (to, subject, message) => {
  try {
    const response = await axios.post("http://localhost:5000/send-email", {
      to,
      subject,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
