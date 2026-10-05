# BudgetLens API

A simple backend API for tracking expenses, built with Node.js and Express.
Built as **Project 2** for the Full Stack Development track at Decode Labs.

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Run `npm start`
4. Server runs on `http://localhost:3000`

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/expenses | Get all expenses |
| GET | /api/expenses/:id | Get a single expense |
| POST | /api/expenses | Add a new expense |
| DELETE | /api/expenses/:id | Delete an expense |

## Example POST Request

```json
{
  "date": "2026-09-30",
  "category": "Food",
  "amount": 20.5,
  "note": "Dinner"
}
```

## Validation

- `date`, `category`, and `amount` are required
- `amount` must be a positive number

## Author

Mahi — BS Information Technology, UMT