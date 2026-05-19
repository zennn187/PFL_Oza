export default function Table({ headers, children }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {children}
        </tbody>
      </table>
    </div>
  );
}