import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // убрали Route
import styles from "/src/pages/items.module.css";

const itemCategories = [ /* ... без изменений ... */ ];

export function ItemsPage() {
  const [categoryData, setCategoryData] = useState<Record<string, number>>({}); // явный тип
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // исправлен тип
  // stats удалён, так как не используется (либо оставьте с _)

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/counts", {
          timeout: 5000,
          headers: { Accept: "application/json" },
        });

        const transformedData: Record<string, number> = {};
        let totalItems = 0;

        if (response.data && response.data.categories) {
          Object.entries(response.data.categories).forEach(([key, value]) => {
            const count = (value as any)?.count || 0;
            transformedData[key] = count;
            totalItems += count;
          });
        }

        setCategoryData(transformedData);
        console.log("✅ Данные получены:", transformedData);
        setError(null);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`Не удалось загрузить данные: ${errorMessage}`);

        // mock-данные
        const mockData: Record<string, number> = {
          weapons: 325,
          armor: 18,
          artifacts: 20,
          attachments: 20,
          devices: 16,
          containers: 20,
          backpacks: 20,
          other: 0,
        };
        setCategoryData(mockData);
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

