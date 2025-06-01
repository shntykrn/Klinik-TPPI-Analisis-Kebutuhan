export function Statistics() {
  const stats = [
    { label: "Annual Capacity", value: "1.5M TEUs" },
    { label: "Berth Length", value: "850m" },
    { label: "Terminal Area", value: "32 Hectares" },
    { label: "Cranes", value: "12 Units" },
  ]

  return (
    <div className="bg-white border border-[#d9d9d9] rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Key Statistics</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${
              index < stats.length - 1 ? "border-b border-[#d9d9d9] pb-2" : ""
            }`}
          >
            <span className="text-[#3f3f3f]">{stat.label}</span>
            <span className="font-medium">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
