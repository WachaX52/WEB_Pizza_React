import React, { useState } from "react";
import { List, Button, Input, Modal } from "antd";
import "./Cart.css";

const Cart = ({ cart, removeFromCart }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const total = cart.reduce((acc, item) => acc + Number(parseInt(item.price)), 0);

  const validateName = (name) => {
    const regex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]{2,}$/;
    return regex.test(name.trim());
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\s+/g, '');
    const regex = /^(?:\+380\d{9}|0\d{9})$/;
    return regex.test(cleaned);
  };

  const saveOrder = async () => {
    if (!customerName || !customerPhone) {
      Modal.warning({
        title: "Заповніть всі поля",
        content: "Будь ласка, введіть ваше ім'я та номер телефону.",
      });
      return;
    }

    if (!validateName(customerName)) {
      Modal.warning({
        title: "Невірне ім'я",
        content: "Ім'я повинно містити лише літери і бути не коротше 2 символів.",
      });
      return;
    }

    if (!validatePhone(customerPhone)) {
      Modal.warning({
        title: "Невірний номер телефону",
        content: "Введіть правильний номер у форматі +380XXXXXXXXX або 0XXXXXXXXX.",
      });
      return;
    }

    const orderData = {
      id: Date.now(),
      name: customerName.trim(),
      phone: customerPhone.trim(),
      cart,
      total,
    };

    try {
      const response = await fetch('http://localhost:7008/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        Modal.success({
          title: "Замовлення успішно відправлено!",
          content: "Ми скоро з вами зв'яжемося.",
        });
        setCustomerName('');
        setCustomerPhone('');
      } else {
        throw new Error('Помилка відправки замовлення');
      }
    } catch (error) {
      Modal.error({
        title: "Помилка",
        content: error.message,
      });
    }
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <p className="cart-empty">Корзина пуста</p>
      ) : (
        <List
          dataSource={cart}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button type="link" danger onClick={() => removeFromCart(index)}>
                  Видалити
                </Button>,
              ]}
            >
              <List.Item.Meta title={item.name} description={`${item.price} грн`} />
            </List.Item>
          )}
        />
      )}

      {cart.length > 0 && (
        <>
          <div className="cart-inputs">
            <Input
              placeholder="Ваше ім'я"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Input
              placeholder="Ваш телефон"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
            <Button type="primary" onClick={saveOrder}>
              Оформити замовлення
            </Button>
          </div>
          <div className="cart-total">
            Загальна сума: {total} грн
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
