import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useVisitorCounter } from '../hooks/useVisitorCounter';

export function VisitorCounter() {
  const { count, uniqueVisitors, isNewVisitor, isLoading } = useVisitorCounter();

  if (isLoading) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 flex gap-2"
    >
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Users className="w-4 h-4 text-purple-400" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {count.toLocaleString()} visit{count !== 1 ? 's' : ''}
          </span>
          <span className="text-xs text-gray-400">
            {uniqueVisitors.toLocaleString()} unique visitor{uniqueVisitors !== 1 ? 's' : ''}
          </span>
        </div>
        {isNewVisitor && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full"
          >
            New!
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
