import { Link, useLocation } from "react-router-dom"
import { FileText, Clipboard, Package, Settings, HelpCircle } from "lucide-react"

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    {
      name: "Rekam Medis",
      icon: <FileText size={20} />,
      path: "/rekam-medis",
    },
    {
      name: "Surat Sakit",
      icon: <Clipboard size={20} />,
      path: "/surat-sakit",
    },
    {
      name: "Stok Obat",
      icon: <Package size={20} />,
      path: "/stok-obat",
    },
  ]

  return (
    <aside className="w-64 bg-[#362969] text-white hidden md:block min-h-screen">
      <div className="p-4 flex items-center space-x-2">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span className="text-[#362969] font-bold">KSS</span>
        </div>
        <h2 className="text-lg font-bold">Klinik Sehat</h2>
      </div>

      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 ${
                  location.pathname === item.path
                    ? "bg-[#9747ff] text-white"
                    : "text-gray-300 hover:bg-[#4a3b80] hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-64 border-t border-[#4a3b80] p-4">
        <ul>
          <li>
            <Link
              to="/settings"
              className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#4a3b80] hover:text-white"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#4a3b80] hover:text-white"
            >
              <HelpCircle size={20} />
              <span>Help</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
