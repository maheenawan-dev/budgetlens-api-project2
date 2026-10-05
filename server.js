const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory data store (resets when server restarts)
let expenses = [
  { id: 1, date: "2026-09-20", category: "Food", amount: 25.50, note: "Lunch" },
  { id: 2, date: "2026-09-22", category: "Transport", amount: 15.00, note: "Bus fare" }
];
let nextId = 3;

// Root route - basic check
app.get('/', (req, res) => {
  res.send('BudgetLens API is running.');
});

// GET all expenses
app.get('/api/expenses', (req, res) => {
  res.status(200).json(expenses);
});

// GET single expense by id
app.get('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const expense = expenses.find(e => e.id === id);

  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }

  res.status(200).json(expense);
});

// POST - create new expense
app.post('/api/expenses', (req, res) => {
  const { date, category, amount, note } = req.body;

  // Validation
  if (!date || !category || amount === undefined) {
    return res.status(400).json({ error: "date, category, and amount are required" });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: "amount must be a positive number" });
  }

  const newExpense = {
    id: nextId++,
    date,
    category,
    amount,
    note: note || ""
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// DELETE expense by id
app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = expenses.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }

  expenses.splice(index, 1);
  res.status(204).send();
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});