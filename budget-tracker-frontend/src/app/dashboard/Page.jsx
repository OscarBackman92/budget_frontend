"use client";  // ✅ Add this at the top

import { useState, useEffect } from "react";
import { fetchTransactions, deleteTransaction } from "../utils/api";
import AddTransactionForm from "../../components/AddTransactionForm";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      console.log("📡 Fetching transactions...");
      const data = await fetchTransactions();
      setTransactions(data.results || []);
    } catch (error) {
      console.error("❌ Error fetching transactions:", error);
      setError("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (transactionId) => {
    try {
      await deleteTransaction(transactionId);
      setTransactions((prev) => prev.filter((tx) => tx.id !== transactionId));
    } catch (error) {
      console.error("❌ Error deleting transaction:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Transaction List</h2>

      {/* ✅ Include AddTransactionForm */}
      <AddTransactionForm onTransactionAdded={loadTransactions} />

      {loading && <p className="text-gray-500">Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && transactions.length === 0 && (
        <p className="text-gray-600">No transactions found.</p>
      )}
      {!loading && !error && transactions.length > 0 && (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="border-b p-2 flex justify-between items-center">
              <span>{transaction.description} - ${transaction.amount}</span>
              <button onClick={() => handleDelete(transaction.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
