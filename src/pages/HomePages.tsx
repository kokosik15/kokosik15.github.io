import { Link } from "react-router-dom";
import styles from "../pages/home.module.css";

export function HomePage() {
  return (
    <main>
      <article className={styles.greeting}>
        <h1>Добро пожаловать на STALCRAFT: X WIKI</h1>
        <p>
          Все необходимое в одном месте создавайте сборки, исследуйте карту,
          анализируйте эффективность оружия и это не всё!
        </p>
      </article>
      <article className={styles.nav}>
        <Link to="/">
          <div className={styles.bottomn}>
            <h3>Сравнение сборок</h3>
            <p>
              Мощный инструмент для сравнения сборок. Сравнивайте параметры,
              чтобы создать идеальный билд.
            </p>
          </div>
        </Link>
        <div className={styles.bottomn}>
          <h3>Калькулятор заточки снаряжения</h3>
          <p>
            Расчет стоимости ресурсов и валюты для улучшения снаряжения по
            системе гарантов.
          </p>
        </div>
        <div className={styles.bottomn}>
          <h3>Калькулятор модулей</h3>
          <p>
            Рассчитайте характеристики модулей для оружия в STALCRAFT: X и
            максимально прокачайте своё любимое снаряжение.
          </p>
        </div>
        <Link to="/tools/build-calculator">
          <div className={styles.bottomn}>
            <h3>Калькулятор сборок</h3>
            <p>
              Незаменимый ассистент новичка и бывалого игрока, который поможет
              вам создать собственную сборку с помощью лишь нескольких нажатий.
            </p>
          </div>
        </Link>
        <div className={styles.bottomn}>
          <h3>Интерактивная карта</h3>
          <p>
            Удобная карта, на которой расположены все точки интереса игры: зоны
            прикопов, тайники, события, аномалии и многое другое!
          </p>
        </div>
        <div className={styles.bottomn}>
          <h3>Калькулятор ТТК</h3>
          <p>
            Этот инструмент позволит вам сравнить время до убийства (TTK) и
            количество пуль до убийства (BTK) для любого сочетания оружия,
            боеприпасов и брони в игре.
          </p>
        </div>
        <div className={styles.bottomn}>
          <h3>Калькулятор сезонного пропуска</h3>
          <p>
            С помощью калькулятора сезонного пропуска вы можете посчитать,
            успеете ли вы достичь желаемого уровня до конца сезона.
          </p>
        </div>
        <div className={styles.bottomn}>
          <h3>Сравнение предметов</h3>
          <p>
            Сравнивайте предметы и находите лучшее снаряжение, чтобы
            доминировать в бою.
          </p>
        </div>
        <div className={styles.bottomn}>
          <h3>Торговая площадка</h3>
          <p>
            Торгуйте с другими игроками, избегая платы за размещение объявлений
            на внутри- игровом аукционе!
          </p>
        </div>
      </article>
      <article className={styles.guidelines}>
        <h2>Руководства</h2>
        <div className={styles.nav_greeting}>
          <article>
            <img src="/src/assets/1747197283-279325-zeleni-ru 1.png" alt="" />
            <h2>«Морок и морока»</h2>
            <p>
              Прохождение задания «Морок и морока» с подробными объяснениями.
            </p>
            <span className={styles.bottomn_clock}>
              <a href="#">
                <img src="/src/svg/price-tag-svgrepo-com 1.svg" alt="" />
                <p>Гайды</p>
              </a>
              <span>
                <img src="/src/svg/clock-svgrepo-com 1.svg" alt="" />
                <p>31.03.2026</p>
              </span>
            </span>
          </article>
          <article>
            <img src="/src/assets/1729667391-614623-image 1.png" alt="" />
            <h2>«Барон Черного Рынка» </h2>
            <p>
              Прохождение задания «Морок и морока» с подробными объяснениями.
            </p>
            <span className={styles.bottomn_clock}>
              <a href="#">
                <img src="/src/svg/price-tag-svgrepo-com 1.svg" alt="" />
                <p>Гайды</p>
              </a>
              <span>
                <img src="/src/svg/clock-svgrepo-com 1.svg" alt="" />
                <p>31.03.2026</p>
              </span>
            </span>
          </article>
          <article>
            <img src="/src/assets/084d5e6619-Компот0 1.png" alt="" />
            <h2>«Компот на полдник»</h2>
            <p>
              Прохождение задания «Компот на полдник» с подробными объяснениями.
            </p>
            <span className={styles.bottomn_clock}>
              <a href="#">
                <img src="/src/svg/price-tag-svgrepo-com 1.svg" alt="" />
                <p>Гайды</p>
              </a>
              <span>
                <img src="/src/svg/clock-svgrepo-com 1.svg" alt="" />
                <p>24.03.2026</p>
              </span>
            </span>
          </article>
        </div>
      </article>
    </main>
  );
}
