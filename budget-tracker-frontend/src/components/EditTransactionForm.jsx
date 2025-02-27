"use client";
import { useState, useEffect } from "react";
import { updateTransaction } from "@/app/utils/api";

export default function EditTransactionForm({ transaction, onTransactionUpdated, onCancel }) {
  const [formData, setFormData] = useState(transaction);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData(transaction);
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedTransaction = await updateTransaction(transaction.id, formData);
      onTransactionUpdated(updatedTransaction);
    } catch (error) {
      console.error("❌ Failed to update transaction:", error);
      setError("Failed to update transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Edit Transaction</h2>

      {error && <p className="text-red-500">{error}</p>}

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

      <div className="flex space-x-2">
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white p-2 rounded w-full">
          Cancel
        </button>
      </div>
    </form>
  );
}
