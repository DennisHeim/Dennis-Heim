import { useState, useEffect, useRef } from 'react'
import CoffeeMenu from './CoffeeMenu'
import BrewingProgress from './BrewingProgress'
import CupDisplay from './CupDisplay'

export default function CoffeeMachine() {
  const [status, setStatus] = useState('idle')
  const [selectedCoffee, setSelectedCoffee] = useState(null)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const resetTimerRef = useRef(null)

  function startBrewing(coffee) {
    setSelectedCoffee(coffee)
    setStatus('brewing')
    setProgress(0)

    const steps = coffee.brewTime / 100
    let current = 0

    intervalRef.current = setInterval(() => {
      current += 1
      const next = Math.min((current / steps) * 100, 100)
      setProgress(next)

      if (next >= 100) {
        clearInterval(intervalRef.current)
        setStatus('done')
        resetTimerRef.current = setTimeout(() => {
          setStatus('idle')
          setSelectedCoffee(null)
          setProgress(0)
        }, 3000)
      }
    }, 100)
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(resetTimerRef.current)
    }
  }, [])

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-coffee-100 overflow-hidden">
      {/* Header */}
      <div className="bg-coffee-500 px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl">☕</span>
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight">Kaffeemaschine</h1>
            <p className="text-coffee-200 text-xs">
              {status === 'idle' && 'Bereit zum Brühen'}
              {status === 'brewing' && `Brühe ${selectedCoffee?.name}...`}
              {status === 'done' && `${selectedCoffee?.name} fertig!`}
            </p>
          </div>
          {/* Status-Indikator */}
          <div className="ml-auto flex items-center gap-1.5">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                status === 'idle'
                  ? 'bg-green-400'
                  : status === 'brewing'
                  ? 'bg-yellow-400 animate-pulse'
                  : 'bg-blue-400'
              }`}
            />
            <span className="text-coffee-200 text-xs capitalize">
              {status === 'idle' ? 'Bereit' : status === 'brewing' ? 'Aktiv' : 'Fertig'}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-4">
        <CupDisplay coffee={selectedCoffee} progress={progress} status={status} />
        <BrewingProgress status={status} progress={progress} coffee={selectedCoffee} />
        <CoffeeMenu
          selectedId={selectedCoffee?.id}
          onSelect={startBrewing}
          disabled={status !== 'idle'}
        />

        {/* Brüh-Button */}
        {status === 'idle' && (
          <p className="text-center text-coffee-300 text-xs mt-1">
            Tippe auf eine Kaffeesorte, um den Brühvorgang zu starten
          </p>
        )}
      </div>
    </div>
  )
}
