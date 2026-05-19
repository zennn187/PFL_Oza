export default function SelectField({ label, options = [], value, onChange }) {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all text-gray-700"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}