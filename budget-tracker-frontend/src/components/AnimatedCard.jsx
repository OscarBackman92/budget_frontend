import { motion } from "framer-motion";

export default function AnimatedCard({ title, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <h3 className="text-lg font-bold text-gray-600">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </motion.div>
  );
}
