import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import styles from "/src/pages/items.module.css";

const itemCategories = [
  {
    id: 0,
    name: "Оружие",
    key: "weapons",
    route: "/items/weapons",
  },
  {
    id: 1,
    name: "Броня",
    key: "armor",
    route: "/items/armor",
  },
  {
    id: 2,
    name: "Артефакты",
    key: "artifacts",
    route: "/items/artifacts",
  },
  {
    id: 3,
    name: "Обвесы",
    key: "attachments",
    route: "/items/attachments",
  },
  {
    id: 4,
    name: "Устройства",
    key: "devices",
    route: "/items/devices",
  },
  {
    id: 5,
    name: "Контейнеры",
    key: "containers",
    route: "/items/containers",
  },
  {
    id: 6,
    name: "Рюкзаки",
    key: "backpacks",
    route: "/items/backpacks",
  },
  {
    id: 7,
    name: "Другое",
    key: "other",
    route: "#",
    disabled: true,
  },
];

export function ItemsPage() {
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalItems: 0,
    totalCategories: 8,
  });

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/counts", {
          timeout: 5000,
          headers: {
            Accept: "application/json",
          },
        });

        const transformedData = {};
        let totalItems = 0;

        if (response.data && response.data.categories) {
          Object.entries(response.data.categories).forEach(([key, value]) => {
            const count = value.count || 0;
            transformedData[key] = count;
            totalItems += count;
          });
        }

        setCategoryData(transformedData);
        setStats({
          totalItems,
          totalCategories: Object.keys(transformedData).length,
        });

        console.log("✅ Данные получены:", transformedData);
        setError(null);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError(`Не удалось загрузить данные: ${err.message}`);

        const mockData = {
          weapons: 325,
          armor: 18,
          artifacts: 20,
          attachments: 20,
          devices: 16,
          containers: 20,
          backpacks: 20,
          other: 0,
        };

        let totalMock = 0;
        Object.values(mockData).forEach((count) => (totalMock += count));

        setCategoryData(mockData);
        setStats({
          totalItems: totalMock,
          totalCategories: 8,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchItemsData();
  }, []);

  if (loading)
    return (
      <div className="loading-page">
        <div className="spinner"></div>
        <p>Загрузка категорий...</p>
      </div>
    );

  if (error && Object.keys(categoryData).length === 0)
    return (
      <div className="error-page">
        <h2>Ошибка загрузки</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Повторить</button>
      </div>
    );

  return (
    <div className={styles.categories_page}>
      <h1>Предметы</h1>
      <div className={styles.categories}>
        {itemCategories.map((category) => {
          const itemCount = categoryData[category.key] || 0;
          const isDisabled = category.disabled || itemCount === 0;

          return (
            <Link
              key={category.id}
              to={isDisabled ? "#" : category.route}
              className={`category-card-link ${isDisabled ? "disabled" : ""}`}
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              <div className={`category-card ${isDisabled ? "disabled" : ""}`}>
                <article className={styles.category_card}>
                  <span className="count-unit"><h3>{category.name}</h3><p>{itemCount}ШТ.</p></span>
                </article>
                
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

