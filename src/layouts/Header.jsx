import { Link } from "react-router-dom";

import styles from "./Header.module.css"

const Header = () => {
    return(
        <header className={styles.header}>
            <div>
                <Link to={"/"}><img className={styles.logo} src="divar.svg" alt="logo" /></Link>
                <span>
                    <img src="location.svg" alt="location" />
                    <p>مشهد</p>
                </span>
            </div>
            <div>
                <Link to={"/auth"}>
                    <span>
                        <img src="profile.svg" alt="profile" />
                        <p>دیوار من</p>
                    </span>
                </Link>
                <Link to={"/dashboard"} className={styles.button}>ثبت اگهی</Link>
            </div>
        </header>
    )
}
export default Header;