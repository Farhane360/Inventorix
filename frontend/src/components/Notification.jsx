import React, { useEffect, useState } from 'react'

export default function Notification({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)

    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300) // laisse le temps à l'animation de sortir
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg shadow-md text-white w-72 transition-transform duration-300 ease-in-out
        ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}
      `}
    >
      {message}
    </div>
  )
}