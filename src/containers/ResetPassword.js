import React, { useState } from "react";
import { Input, Form } from "reactstrap";
import { reset_password } from "../action/auth";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion";

const ResetPassword = ({ reset_password }) => {
  const [input, setInput] = useState();
  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    reset_password(input);
    setRequestSent(true);
  };

  const navigate = useNavigate();
  if (requestSent) {
    return navigate("/password/reset/confirm/:uid/:token");
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
        <h2>Request Password Reset </h2>
        <Form className="mt-3" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
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

export default connect(null, { reset_password })(ResetPassword);
