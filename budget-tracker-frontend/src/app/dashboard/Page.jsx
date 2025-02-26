"use client";
import { useEffect, useState } from "react";
import { fetchTransactions } from "@/app/utils/api";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions()
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t">
              <td className="py-2 px-4">{tx.title}</td>
              <td className="py-2 px-4">${tx.amount}</td>
              <td className="py-2 px-4 text-center">
                <span className={`px-2 py-1 rounded ${tx.transaction_type === "income" ? "bg-green-200" : "bg-red-200"}`}>
                  {tx.transaction_type}
                </span>
              </td>
              <td className="py-2 px-4">{tx.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
