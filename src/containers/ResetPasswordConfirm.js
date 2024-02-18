import { useState } from "react";
import { Input, Form } from "reactstrap";
import { password_reset_confirm } from "../action/auth";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion";

const ResetPasswordConfirm = ({ password_reset_confirm }) => {
  const [inputs, setInputs] = useState({});
  const [requestSent, setRequestSent] = useState(false);

  const handleEventChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const params = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    const new_password = inputs.password;
    const re_new_password = inputs.re_password;
    const uid = params.uid;
    const token = params.token;
    password_reset_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
  };

  const navigate = useNavigate();
  if (requestSent) {
    return navigate("/");
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="container" style={{ marginTop: "20px" }}>
        <h2>Password reset confirm </h2>
        <Form className="mt-3" onSubmit={handleSubmit}>
          <Input
            className="mt-3"
            placeholder="new password.."
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleEventChange}
            required
          />
          <Input
            className="mt-3"
            placeholder="confirm new password.."
            type="password"
            name="re_password"
            value={inputs.re_password || ""}
            onChange={handleEventChange}
            required
          />
          <button className="btn btn-primary mt-3" type="submit">
            {" "}
            Reset Password
          </button>
        </Form>
      </div>
    </motion.div>
  );
};

export default connect(null, { password_reset_confirm })(ResetPasswordConfirm);
