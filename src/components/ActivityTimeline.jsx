export default function ActivityTimeline({ activities = [] }) {
  return (
    <div className="relative border-l border-gray-100 ml-3 space-y-6 py-2">
      {activities.map((act, index) => (
        <div key={index} className="relative pl-6">
          <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-[#FF6B35] border-2 border-white shadow-sm" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h4 className="text-sm font-bold text-gray-800">{act.title}</h4>
            <span className="text-[10px] font-medium text-gray-400">{act.time}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{act.description}</p>
        </div>
      ))}
    </div>
  );
}