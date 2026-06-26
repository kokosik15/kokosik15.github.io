import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";

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

export function ArtifactsPage() {
  const category = "artifacts"
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

    if (category) {
      fetchItems();
    }
  }, [category]);

  if (loading) return <div className="loader">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <main>
      <h2>Категория: {category}</h2>
      <div className={styles.items_}>
          {items.map((item, idx) => (
            
        <Link to={`/item/${category}/${encodeURIComponent(item.name)}/raw`} key={idx} className={styles.item_card}>
            
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => (e.currentTarget.src = "/placeholder.png")}
              />
              <div className={styles.text}>
                <h3>{item.name}</h3>
                <p>{item.class}</p>
              </div>
            
            </Link>
          ))}
        
      </div>
    </main>
  );
};
