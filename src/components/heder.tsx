import { BrowserRouter as Route, Link } from "react-router-dom";
import styles from "./heder.module.css";
import logo from "../assets/image.png";

export function Heder() {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <nav>
        <Link to="/items">Придметы</Link>
        <div className={styles.dropdown}>
          <a className={styles.dropbtn}>Инструменты</a>
          <div className={styles.dropdown_content}>
            <Link to="/tools/build-calculator">Калькулятор сборок</Link>
            <a href="#">Интерактивная карта</a>
          </div>
        </div>
        <a href="#">Сообщество</a>
      </nav>
      <a href="#" className={styles.login}>
        Вход
      </a>
    </header>
  );
}
