export default function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow 
                    hover:shadow-lg 
                    hover:-translate-y-1 
                    transition duration-300">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}