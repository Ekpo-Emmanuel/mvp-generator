import { motion } from "framer-motion";

interface SelectionItemProps {
  label: string;
  value: string;
  comingSoon?: boolean;
}

export function SelectionItem({ label, value, comingSoon = false }: SelectionItemProps) {
  return (
    <motion.div
      className="flex justify-between items-center py-3 border-b  last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <dt className="text-sm  opacity-50 capitalize">{label}</dt>
      <dd className="text-sm font-semibold uppercase">
        {comingSoon ? (
            <div className="capitalize flex items-center justify-center gap-2 font-medium rounded-full bg-yellow-50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 text-xs">
                Coming soon
            </div>
        ) : (
          value || '-'
        )}
      </dd>
    </motion.div>
  );
}

