export default function Avatar({ name, src }) {
  if (src) {
    return (
      <img src={src} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-sm">
      {name ? name.charAt(0).toUpperCase() : "U"}
    </div>
  );
}