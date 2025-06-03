const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 7008;

app.use(cors());
app.use(bodyParser.json());

// Путь к файлу заказов
const ordersFile = './orders.json';

// Если файла нет — создаем пустой
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, '[]', 'utf8');
}

// Обработчик для корневого маршрута
app.get('/', (req, res) => {
  res.send('Сервер працює');
});

// Прием замовлення
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
