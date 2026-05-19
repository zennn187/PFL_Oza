import Card from "./Card";
import Button from "./Button";

export default function ProductCard({ image, title, category, price, description }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden !p-0">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5 flex flex-col flex-grow">
        <span className="inline-block self-start bg-orange-50 text-[#FF6B35] text-xs font-bold px-2.5 py-1 rounded-md mb-2">
          {category}
        </span>
        <h3 className="text-base font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <span className="text-lg font-black text-gray-900">{price}</span>
          <Button type="primary">Order</Button>
        </div>
      </div>
    </Card>
  );
}