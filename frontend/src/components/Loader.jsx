import { useState, useEffect } from 'react'

const Loader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState('')
  const [exiting, setExiting] = useState(false)

  const lines = [
    '> initializing portfolio...',
    '> loading components...',
    '> compiling experience...',
    '> rendering interface...',
    '> ready.',
  ]

  useEffect(() => {
    let timeout
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    const runLines = async () => {
      for (let i = 0; i < lines.length; i++) {
        await new Promise(r => setTimeout(r, i === 0 ? 200 : 400))
        setPhase(i)
        for (let j = 0; j <= lines[i].length; j++) {
          await new Promise(r => setTimeout(r, 25))
          setText(lines[i].slice(0, j))
        }
      }
      await new Promise(r => setTimeout(r, 500))
      setExiting(true)
      await new Promise(r => setTimeout(r, 600))
      onComplete()
    }

    runLines()
    return () => {
      clearInterval(progressInterval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-600 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ background: '#080c10' }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)', animationDelay: '1s' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-8">
        {/* Logo */}
        <div className="text-center mb-4">
          <div
            className="text-5xl font-display font-black tracking-tighter mb-2"
            style={{ color: '#00d4ff', textShadow: '0 0 30px rgba(0,212,255,0.6)' }}
          >
            MU
          </div>
          <div className="text-xs font-mono tracking-[0.3em] text-textSecondary uppercase">
            Portfolio v1.0
          </div>
        </div>

        {/* Terminal lines */}
        <div className="w-full glass rounded-lg p-4 font-mono text-sm">
          {lines.slice(0, phase).map((line, i) => (
            <div key={i} className="text-textSecondary mb-1">
              <span style={{ color: '#00ff88' }}>✓</span> {line}
            </div>
          ))}
          {phase < lines.length && (
            <div style={{ color: '#00d4ff' }}>
              {text}
              <span className="animate-blink">█</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs font-mono text-textSecondary mb-2">
            <span>LOADING</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
          <div className="h-px w-full bg-surface overflow-hidden">
            <div
              className="h-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #7c3aed, #00d4ff)',
                boxShadow: '0 0 8px rgba(0, 212, 255, 0.8)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
