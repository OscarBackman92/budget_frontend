"use client";
import { useState } from "react";
import { addTransaction } from "@/app/utils/api";

export default function AddTransactionForm({ onTransactionAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    transaction_type: "expense", // Default to expense
    category: "Groceries", // Default category
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category.trim()) {
      console.error("❌ Category is required.");
      return;
    }

    try {
      await addTransaction(formData);
      setFormData({
        title: "",
        amount: "",
        transaction_type: "expense",
        category: "Groceries", // Reset to default category
      });
      onTransactionAdded();
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

      {/* ✅ Select Transaction Type (Income or Expense) */}
      <select
        className="w-full p-2 border rounded mb-2"
        value={formData.transaction_type}
        onChange={(e) => setFormData({ ...formData, transaction_type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {/* ✅ Select Category (Changes Based on Transaction Type) */}
      <select
        className="w-full p-2 border rounded mb-2"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        {/* ✅ Expense Categories */}
        {formData.transaction_type === "expense" && (
          <>
            <option value="Groceries">Groceries</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Dining Out">Dining Out</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Insurance">Insurance</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Shopping">Shopping</option>
            <option value="Debt Repayment">Debt Repayment</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Pets">Pets</option>
            <option value="Charity & Donations">Charity & Donations</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Fitness & Sports">Fitness & Sports</option>
            <option value="Home Improvement">Home Improvement</option>
            <option value="Hobbies">Hobbies</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </>
        )}

        {/* ✅ Income Categories */}
        {formData.transaction_type === "income" && (
          <>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investments">Investments</option>
            <option value="Rental Income">Rental Income</option>
            <option value="Side Hustle">Side Hustle</option>
            <option value="Business Income">Business Income</option>
            <option value="Bonuses">Bonuses</option>
            <option value="Gifts">Gifts</option>
            <option value="Dividends">Dividends</option>
            <option value="Government Benefits">Government Benefits</option>
            <option value="Refunds & Rebates">Refunds & Rebates</option>
            <option value="Royalties">Royalties</option>
            <option value="Other Income">Other Income</option>
          </>
        )}
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Add Transaction
      </button>
    </form>
  );
}
