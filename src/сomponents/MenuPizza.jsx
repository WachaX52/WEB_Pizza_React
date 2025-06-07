import React from "react";
import { ShoppingCart } from "lucide-react";
import "./Menu.css";

const Menu = ({ addToCart }) => {
  const pizzas = [
    {
      name: "Карбонара",
      price: 350,
      img: `${import.meta.env.BASE_URL}img/carbonara.jpg`,
      alt: "carbonara"
    },
    {
      name: "Пепероні",
      price: 340,
      img: `${import.meta.env.BASE_URL}img/peperoni.jpg`,
      alt: "peperoni"
    },
    {
      name: "Чотири сири",
      price: 300,
      img: `${import.meta.env.BASE_URL}img/chees.jpg`,
      alt: "chess"
    },
    {
      name: "Гавайська",
      price: 250,
      img: `${import.meta.env.BASE_URL}img/gavai.jpg`,
      alt: "gavai"
    },
    {
      name: "Шинка",
      price: 195,
      img: `${import.meta.env.BASE_URL}img/vetchina.jpg`,
      alt: "vetchina"
    }
  ];
  

  return (
    <div className="menu-container">
      <h2 className="menu-title">🍕 Наше меню 🍕</h2>
      <div className="menu-grid">
        {pizzas.map((pizza, index) => (
          <div key={index} className="pizza-card">
            <img src={pizza.img} alt={pizza.alt} className="pizza-img" />
            <div className="pizza-info">
              <h3 className="pizza-name">{pizza.name}</h3>
              <p className="pizza-price">{pizza.price} грн</p>
              <button className="add-to-cart-btn" onClick={() => addToCart(pizza)}>
                <ShoppingCart size={22} />
                До корзини
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
