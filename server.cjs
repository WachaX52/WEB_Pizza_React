const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 7008;

app.use(cors());
app.use(bodyParser.json());

const ordersFile = './orders.json';

if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, '[]', 'utf8');
}

// Обробник для кореневого маршруту
app.get('/', (req, res) => {
  res.send('Сервер працює');
});

// Прийом замовлення
app.post('/order', (req, res) => {
  const newOrder = req.body;

  // Читаємо старі замовлення
  const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));

  // Додаємо нове замовлення
  orders.push(newOrder);

  // Записуємо назад
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf8');

  res.status(201).send({ message: 'Замовлення успішно збережено!' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});

app.get('/orders', (req, res) => {
  const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
  res.json(orders);
});

// Видалити замовлення за ID
app.delete('/order/:id', (req, res) => {
  const orderId = req.params.id;

  let orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
  const updatedOrders = orders.filter(order => String(order.id) !== String(orderId));

  fs.writeFileSync(ordersFile, JSON.stringify(updatedOrders, null, 2), 'utf8');

  res.status(200).send({ message: 'Замовлення видалено' });
});
