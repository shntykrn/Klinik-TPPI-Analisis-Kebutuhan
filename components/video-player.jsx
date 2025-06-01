import { useState, useRef } from "react"
import { Play, Pause, X } from "lucide-react"

export function VideoPlayer({ videoSrc, posterSrc }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRef = useRef(null)

  const togglePlay = () => {
    setIsModalOpen(true)
    setIsPlaying(true)
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <>
      <div className="relative h-full w-full cursor-pointer" onClick={togglePlay}>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
            <Play className="w-6 h-6 text-[#9747ff] ml-1" />
          </div>
        </div>
        <img src={posterSrc || "/placeholder.svg"} alt="Video thumbnail" className="w-full h-full object-cover" />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <button onClick={closeModal} className="absolute -top-10 right-0 text-white">
              <X size={24} />
            </button>

            <div className="relative">
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                className="w-full"
                autoPlay
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <button
                onClick={handlePlayPause}
                className="absolute bottom-4 left-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-[#9747ff]" />
                ) : (
                  <Play className="w-5 h-5 text-[#9747ff] ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
