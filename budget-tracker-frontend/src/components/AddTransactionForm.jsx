"use client";
import { useState } from "react";
import { addTransaction } from "@/app/utils/api";

export default function AddTransactionForm({ onTransactionAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    transaction_type: "expense",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTransaction = await addTransaction(formData);
      onTransactionAdded(newTransaction);
      setFormData({ title: "", amount: "", transaction_type: "expense", category: "" });
    } catch (error) {
      console.error("❌ Failed to add transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Add Transaction</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded mb-2"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 border rounded mb-2"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        required
      />
      <select
        className="w-full p-2 border rounded mb-2"
        value={formData.transaction_type}
        onChange={(e) => setFormData({ ...formData, transaction_type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        className="w-full p-2 border rounded mb-2"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Add Transaction
      </button>
    </form>
  );
}
