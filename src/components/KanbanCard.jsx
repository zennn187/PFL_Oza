import Card from "./Card";
import Badge from "./Badge";

export default function KanbanCard({ id, title, customer, total, status }) {
  const statusMap = {
    Pending: "warning",
    Progress: "primary",
    Completed: "success"
  };

  return (
    <Card className="cursor-grab active:cursor-grabbing hover:border-orange-200 transition-all !p-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-gray-400">{id}</span>
        <Badge type={statusMap[status] || "primary"}>{status}</Badge>
      </div>
      <h4 className="text-sm font-bold text-gray-800 mb-1">{title}</h4>
      <p className="text-xs text-gray-500 mb-3">{customer}</p>
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className="text-xs text-gray-400">Total Price</span>
        <span className="text-sm font-black text-gray-900">{total}</span>
      </div>
    </Card>
  );
}