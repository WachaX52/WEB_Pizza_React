import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Menu from "./сomponents/MenuPizza";
import Contact from "./сomponents/ContactPizza";
import Home from "./сomponents/HomePizza";
import Cart from "./сomponents/Cart";
import { Layout, Button, Badge, Modal } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./App.css";

const { Header, Footer, Content } = Layout;

const App = () => {
  const [cart, setCart] = useState([]);
  const [modals, setModals] = useState({ cart: false, order: false });
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const addToCart = (pizza) => setCart([...cart, pizza]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));

  const openModal = (modalName) => setModals((prev) => ({ ...prev, [modalName]: true }));
  const closeModal = (modalName) => setModals((prev) => ({ ...prev, [modalName]: false }));

  const openOrderModal = () => {
    if (cart.length === 0) {
      Modal.warning({
        title: "Корзина пуста",
        content: "Будь ласка, додайте товари до корзини перед оформленням замовлення.",
      });
      return;
    }
    closeModal("cart");
    openModal("order");
  };

  const saveOrder = () => {
    if (!customerName || !customerPhone) {
      Modal.warning({
        title: "Заповніть всі поля",
        content: "Будь ласка, введіть ваше ім'я та номер телефону.",
      });
      return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);
    const orderData = {
      name: customerName,
      phone: customerPhone,
      cart,
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    Modal.success({
      title: "Замовлення прийняте!",
      content: "Дякуємо за ваше замовлення! Ми зв'яжемося з вами найближчим часом.",
    });

    setCart([]);
    closeModal("order");
    setCustomerName("");
    setCustomerPhone("");
  };

  return (
    <Router>
      <Layout className="layout">
        <Header className="header">
          <h1 className="logo">Піцерія</h1>
          <nav className="nav">
            <Link to="/" className="nav-link">Головна</Link>
            <Link to="/menu" className="nav-link">Меню</Link>
            <Link to="/contact" className="nav-link">Контакти</Link>
          </nav>
          <Badge count={cart.length}>
            <Button
              type="primary"
              shape="circle"
              icon={<ShoppingCartOutlined />}
              size="large"
              className="cart-button"
              onClick={() => openModal("cart")}
            />
          </Badge>
        </Header>

        <Content className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Content>

        <Footer className="footer">
          © 2025 Піцерія. Усі права захищені.
        </Footer>
      </Layout>

      <Modal
        title="Ваша корзина"
        open={modals.cart}
        onCancel={() => closeModal("cart")}
        footer={null}
      >
        <Cart cart={cart} removeFromCart={removeFromCart} openOrderModal={openOrderModal} />
      </Modal>

      <Modal
        title="Оформлення замовлення"
        open={modals.order}
        onCancel={() => closeModal("order")}
        footer={null}
      >
        <form className="order-form" onSubmit={(e) => {
          e.preventDefault();
          saveOrder();
        }}>
          <input
            type="text"
            placeholder="Ваше ім'я"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Ваш телефон"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
          />
          <Button type="primary" htmlType="submit">
            Підтвердити замовлення
          </Button>
        </form>
      </Modal>
    </Router>
  );
};

export default App;
