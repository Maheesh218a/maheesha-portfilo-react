import { useEffect, useState } from 'react'

const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [follower, setFollower] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setTimeout(() => setFollower({ x: e.clientX, y: e.clientY }), 80)
    }

    const over = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <div
        className="cursor"
        style={{
          left: pos.x - 6,
          top: pos.y - 6,
          transform: isHovering ? 'scale(2)' : 'scale(1)',
        }}
      />
      <div
        className="cursor-follower"
        style={{
          left: follower.x - 18,
          top: follower.y - 18,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          opacity: isHovering ? 0.6 : 1,
        }}
      />
    </>
  )
}

export default Cursor
