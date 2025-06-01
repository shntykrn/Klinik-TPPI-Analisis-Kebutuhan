import { Play } from "lucide-react"

export function ImageGrid() {
  const images = [
    { src: "/placeholder.svg?height=400&width=600", alt: "Aerial view of port facility" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Port with ships" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Coastal industrial area" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Industrial facility" },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Port aerial view with video",
      hasVideo: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative h-48 rounded-lg overflow-hidden">
          {image.hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-[#9747ff] ml-1" />
              </div>
            </div>
          )}
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}
