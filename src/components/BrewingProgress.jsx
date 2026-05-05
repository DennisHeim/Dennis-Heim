export default function BrewingProgress({ status, progress, coffee }) {
  if (status === 'idle') return null

  return (
    <div className="w-full px-2 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-coffee-600">
          {status === 'brewing' ? 'Brühe...' : 'Fertig! ☕'}
        </span>
        <span className="text-sm text-coffee-400">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-coffee-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: coffee?.cupColor ?? '#6f4e37',
            transition: 'width 0.2s linear',
          }}
        />
      </div>
      {status === 'done' && (
        <p className="text-center text-coffee-500 text-sm mt-3 font-medium">
          Zurück zur Auswahl in 3 Sekunden...
        </p>
      )}
    </div>
  )
}
