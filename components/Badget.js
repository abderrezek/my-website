export default function Badget({ children }) {
  return (
    <span className="inline-block bg-gray-200 text-gray-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
      {children}
    </span>
  );
}
