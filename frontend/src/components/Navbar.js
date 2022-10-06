import Link from "next/link";
import { useContext, useState } from "react";
import { FirebaseContext } from "../logic/context";
import style from "../styles/Navbar.module.scss";
import cx from "classnames";

function Navbar() {
  // --------------CONTEXT------------//
  const { userStatus, signUserOut } = useContext(FirebaseContext);

  const LoggedOutLinks = () => {
    return (
      <>
        <li className={style.login_link}>
          <Link href="/login">Login</Link>
        </li>
      </>
    );
  };

  const LoggedInLinks = () => {
    return (
      <>
        <li>
          <Link href="savedLinks">Saved urls</Link>
        </li>
        <li onClick={signUserOut}>
          <Link href="/">Log out</Link>
        </li>
      </>
    );
  };

  // NAVBAR STATE
  const [show, setShow] = useState(false);

  return (
    <nav className={style.nav}>
      <div className={style.logo}>
        <span>Lil Link</span>
      </div>
      <div className={style.menu_btn} onClick={() => setShow(!show)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={cx(style.nav_links, show ? style.show : style.hide)}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {/* if user is signed in, show logged in links and if user
        is signed out show logged out links */}
        {userStatus ? <LoggedInLinks /> : <LoggedOutLinks />}
      </ul>
    </nav>
  );
}

export default Navbar;
