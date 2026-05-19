export default function InputField({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}