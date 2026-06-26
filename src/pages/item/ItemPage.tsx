import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./item.module.css";
import axios from "axios";

interface ItemRawData {
  data: {
    name: string;
    rank: string;
    class: string;
    region: string;
    description: string;
    image: string;
    image_alt: string;
    characteristics: {
      [key: string]: string;
      Вес: string;
      Прочность: string;
      "Макс. прочность": string;
      "Скорость передвижения": string;
      Урон: string;
      "Объем магазина": string;
      "Максимальная дистанция": string;
      Скорострельность: string;
      Перезарядка: string;
      "Тактическая перезарядка": string;
      "Эргономика оружия": string;
      Разброс: string;
      "Разброс от бедра": string;
      "Вертикальная отдача": string;
      "Горизонтальная отдача": string;
      Доставание: string;
      Прицеливание: string;
    };
    damage_multipliers: {
      [key: string]: string;
      "Урон в голову": "х1,25";
      "Урон по конечностям": "х0,7";
    };
    overheat_info: Record<string, string>;
    damage_value: Record<string, string>;
    additional_characteristics: Record<string, string>;
  };
  timestamp: number;
}

function getColorForValue(value: string): string {
  const regex = /[+-]?\d+[,.]?\d*/g;
  const matches = value.match(regex);
  if (!matches) return '#ffffff'; 

  const numbers = matches
    .map(s => parseFloat(s.replace(',', '.')))
    .filter(n => !isNaN(n));

  if (numbers.length === 0) return '#ffffff';

  const allPositive = numbers.every(n => n >= 0);
  const allNegative = numbers.every(n => n < 0);

  if (allPositive) return '#4caf50'; 
  if (allNegative) return '#f44336'; 
  if (!regex) return '#ffffff'
  return '#ffffff'; 
}

export function ItemPage() {
  const { category, item_name } = useParams<{
    category: string;
    item_name: string;
  }>();
  const [itemData, setItemData] = useState<ItemRawData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchItems = async () => {
      if (!category || !item_name) return;
      try {
        setLoading(true);
        const url = `http://127.0.0.1:5000/item/${category}/${encodeURIComponent(item_name)}/raw`;
        const response = await axios.get<ItemRawData>(url);
        setItemData(response.data);
        setError(null);
      } catch (err) {
        console.error("Полная ошибка:", err);
        if (axios.isAxiosError(err)) {
          console.error("Ответ сервера:", err.response?.data);
          console.error("Статус:", err.response?.status);
          console.error("Заголовки:", err.response?.headers);
          setError(
            `Ошибка ${err.response?.status}: ${err.response?.data?.detail || err.message}`,
          );
        } else {
          setError("Неизвестная ошибка: " + String(err));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category, item_name]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка {error}</div>;
  if (!itemData) return <div>404 NOT FAUND</div>;

  const { data } = itemData;
  const isArtifact = data.category === 'Артефакты' || data.class === 'Артефакты';
  return (
    <div className={styles.main}>
      <article className={styles.about_the_subject}>
        <div className={styles.name}>
          <h2 className={styles.item_name}>{data.name}</h2>
          <button className={styles.button}>Добавить в сравнение</button>
        </div>
        <div className={styles.rank_img}>
          <div className={styles.rank}>
            {data.rank && (
              <p>
                Ранг:<span className={styles.meaning}>{data.rank}</span>
              </p>
            )}
            <p>
              Класс:<span className={styles.meaning}>{data.class}</span>
            </p>
            <p>
              Регион:<span className={styles.meaning}>{data.region}</span>
            </p>
          </div>
          <div className={styles.img}>
            <img src={data.image} alt={data.image_alt} />
          </div>
        </div>
        <div className={styles.title}>
          {data.description && <p>{data.description}</p>}
        </div>
      </article>
      <article className={styles.specifications}>
        <h2>Характеристики</h2>
        {data.characteristics &&
          Object.entries(data.characteristics).map(([key, value]) => (
            <li className={styles.Main_features} key={key}>
              <p>
                {key}:<span style={{color: isArtifact ? getColorForValue(value) : 'white' }}>{value}</span>
              </p>
            </li>
          ))}
        {data.damage_multipliers &&
          Object.keys(data.damage_multipliers).length > 0 && (
            <article className={styles.damage_multipliers}>
              <p>Множитель урона</p>

              {Object.entries(data.damage_multipliers).map(([key, value]) => (
                <li key={key}>
                  <p>
                    {key}: <span>{value}</span>
                  </p>
                </li>
              ))}
            </article>
          )}
        {data.additional_characteristics && <h3>Доп. характеристики</h3>}

        {data.additional_characteristics &&
          Object.entries(data.additional_characteristics).map(
            ([key, value]) => (
              <li key={key}>
                <p>
                  {key}:<span style={{color: isArtifact ? getColorForValue(value) : 'white' }}>{value}</span>
                </p>
              </li>
            ),
          )}
      </article>
    </div>
  );
}
