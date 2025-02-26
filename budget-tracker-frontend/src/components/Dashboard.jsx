"use client";
import { useEffect, useState } from "react";
import { fetchTransactions } from "../utils/api";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        console.log("📡 Fetching transactions...");
        const data = await fetchTransactions();
        console.log("✅ Transactions fetched:", data);

        // ✅ Ensure we always set an array to prevent `undefined.map` errors
        setTransactions(data.results || []);
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
      }
    };

    loadTransactions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Transaction List</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="border-b p-2">
              {transaction.description} - ${transaction.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
