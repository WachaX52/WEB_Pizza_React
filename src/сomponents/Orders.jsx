import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:7008/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      Modal.error({
        title: "Помилка",
        content: "Не вдалося завантажити замовлення.",
      });
    }
  };

  const markAsDone = async (id) => {
    Modal.confirm({
      title: "Позначити як готове?",
      content: "Це замовлення буде видалене.",
      okText: "Так",
      cancelText: "Скасувати",
      onOk: async () => {
        try {
          await fetch(`http://localhost:7008/order/${id}`, {
            method: "DELETE",
          });
          setOrders((prev) => prev.filter((order) => order.id !== id));
          Modal.success({
            title: "Готово",
            content: "Замовлення завершено.",
          });
        } catch (error) {
          Modal.error({
            title: "Помилка",
            content: "Не вдалося видалити замовлення.",
          });
        }
      },
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-title">📋 Замовлення персоналу</h2>
      {orders.length === 0 ? (
        <p>Немає активних замовлень</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-name">{order.name}</div>
              <div className="order-phone">{order.phone}</div>
            </div>
            <ul className="order-items">
              {order.cart.map((item, idx) => (
                <li key={idx}>
                  {item.name} – {item.price} грн
                </li>
              ))}
            </ul>
            <div className="order-total">Сума: {order.total} грн</div>
            <button className="ready-btn" onClick={() => markAsDone(order.id)}>
              ✅ Готове
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
