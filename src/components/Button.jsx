export default function Button({ children, type = "primary", onClick }) {
  const types = {
    primary: "bg-[#FF6B35] hover:bg-[#E05320] text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  };

  return (
    <button onClick={onClick} className={`${types[type]} px-4 py-2 rounded-lg font-medium transition-colors text-sm`}>
      {children}
    </button>
  );
}