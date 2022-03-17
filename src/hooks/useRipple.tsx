import React, { ReactElement, useState } from "react"

const useRipple: () => [(e: React.MouseEvent) => void, ReactElement[]] = () => {
  const [ripples, setRipples] = useState<ReactElement[]>([])

  const removeRippleByKey = (key: number) => {
    setRipples(ripples.filter((ripple) => ripple.key !== key))
  }

  const addRipple = (e: React.MouseEvent) => {
    const { left, top, height, width } = e.currentTarget.getBoundingClientRect()
    const radius = height + width

    const newRipple = (
      <div
        key={e.timeStamp}
        style={{
          width: 2 * radius,
          height: 2 * radius,
          left: e.clientX - left - radius,
          top: e.clientY - top - radius
        }}
        className="absolute animate-ripple rounded-full bg-gray-500"
        onAnimationEnd={() => removeRippleByKey(e.timeStamp)}
      />
    )
    setRipples([...ripples, newRipple])
  }

  return [addRipple, ripples]
}

export default useRipple
