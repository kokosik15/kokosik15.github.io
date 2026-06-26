import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styles from "./items_.module.css";

interface Item {
  name: string;
  rank: string;
  class: string;
  image: string;
}

interface ApiResponse {
  items: Item[];
  total: number;
  category: string;
}

const rankStyles: Record<string, { color: string; icon: string }> = {
  Отмычка: { color: "#808080" },
  Новичок: { color: "#9deb9d" },
  Сталкер: { color: "#9f9fed" },
  Ветеран: { color: "#bf5bad" },
  Мастер: { color: "#ea9d9e" },
  Легенда: { color: "#ffe792" },
};

export function ArmorPage() {
  const category = "armor";
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `http://127.0.0.1:5000/items/${category}`,
        );
        setItems(response.data.items);
        setError(null);
      } catch (err) {
        const axiosError = err as AxiosError;
        const errorMessage =
          axiosError.response?.data?.detail || axiosError.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [category]);

  const getRankStyle = (rank: string): React.CSSProperties => {
    return rankStyles[rank] ? { color: rankStyles[rank].color } : {};
  };

  if (loading) return <div className="loader">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <main>
      <h2>Категория: {category}</h2>
      <div className={styles.items_}>
        {items.map((item) => (
          <Link
            key={item.name}
            to={`/item/${category}/${encodeURIComponent(item.name)}/raw`}
            className={styles.item_card}
          >
            <img
              src={item.image}
              alt={item.name}
              onError={(e) => (e.currentTarget.src = "/placeholder.png")}
            />
            <div className={styles.text}>
              <h3 style={getRankStyle(item.rank)}>{item.name}</h3>
              <p>{item.class}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
