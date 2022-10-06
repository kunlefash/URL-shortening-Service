import React, { useContext } from "react";
import Layout from "../components/Layout";
import style from "../styles/login.module.scss";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FirebaseContext } from "../logic/context";

function Signup() {
  //context
  const { registerUser } = useContext(FirebaseContext);

  //router
  const router = useRouter();

  //State
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //------------- FORM SUBMITION-----------//
  async function handleSubmit(e) {
    e.preventDefault();

    if (email && password && userName) {
      await registerUser(email, password, userName);
      router.push("/");
    }
    email ? setEmailError(null) : setEmailError(true);
    password ? setPasswordError(null) : setPasswordError(true);
  }

  return (
    <Layout>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          {/* userName */}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="john doe_2"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className={style.email_error}>Email error</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="******"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className={style.password_error}>Password error</p>
          )}

          <button>Create</button>

          <span>
            Have an account? <Link href="/login">Login</Link>
          </span>
        </form>
      </div>
    </Layout>
  );
}

export default Signup;
