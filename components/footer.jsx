export function Footer() {
  const quickLinks = ["Home", "About Us", "Services", "Contact"]
  const services = ["Container Handling", "Storage Solutions", "Logistics Support", "Customs Clearance"]
  const contactInfo = [
    "Jl. Pelabuhan No. 123",
    "Palembang, Indonesia",
    "Email: info@tppl.com",
    "Phone: +62 123 4567 890",
  ]

  return (
    <footer className="bg-[#362969] text-white py-8 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#362969] font-bold text-sm">TPPL</span>
            </div>
            <h3 className="font-bold">Terminal Petikemas Palembang</h3>
          </div>
          <p className="text-sm text-[#b3a8dd]">
            Providing efficient and reliable container terminal services in Palembang.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[#b3a8dd]">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-[#b3a8dd]">
            {services.map((service, index) => (
              <li key={index}>
                <a href="#">{service}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <address className="not-italic text-sm text-[#b3a8dd] space-y-2">
            {contactInfo.map((info, index) => (
              <p key={index}>{info}</p>
            ))}
          </address>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-[#b3a8dd]/30 mt-8 pt-6 text-sm text-[#b3a8dd]">
        <p>© 2025 Terminal Petikemas Palembang. All rights reserved.</p>
      </div>
    </footer>
  )
}
