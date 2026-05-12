import frameworkData from "./framework.json";

export default function Frameworklist() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {frameworkData.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg p-5 mb-5 bg-white"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
          
          <div className="flex gap-4 mb-4 text-sm text-gray-500">
            <span>{item.details.developer}</span>
            <span>{item.details.releaseYear}</span>
          </div>

          <a
            href={item.details.officialWebsite}
            className="text-blue-600 hover:underline text-sm inline-block mb-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            kunjungi website
          </a>
          
          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}       