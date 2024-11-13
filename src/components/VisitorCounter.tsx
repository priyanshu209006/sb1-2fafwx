import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useVisitorCounter } from '../hooks/useVisitorCounter';

export function VisitorCounter() {
  const { count, isNewVisitor, isLoading } = useVisitorCounter();

  if (isLoading) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-2"
    >
      <Users className="w-4 h-4 text-purple-400" />
      <span className="text-sm font-medium">
        {count.toLocaleString()} visitor{count !== 1 ? 's' : ''}
      </span>
      {isNewVisitor && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full"
        >
          +1
        </motion.span>
      )}
    </motion.div>
  );
}
