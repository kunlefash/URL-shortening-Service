import Layout from "../components/Layout";
import style from "../styles/login.module.scss";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FirebaseContext } from "../logic/context";

function Login() {
  const router = useRouter();
  // context
  const { signUserIn } = useContext(FirebaseContext);
  //State
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      const result = await signUserIn(email, password);
      router.push("/");
    }
    email ? setEmailError(null) : setEmailError(true);
    password ? setPasswordError(null) : setPasswordError(true);
  }

  return (
    <Layout pageTitle="Login">
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
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

          <button>Login</button>

          <span>
            Don't have an account? <Link href="/signup">Sign up</Link>
          </span>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
