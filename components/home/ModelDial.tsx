// components/ModelDial.tsx
'use client'
import { useEffect, useState } from "react"

interface ModelDialProps {
    models: string[]
    itemHeight?: number
    visibleCount?: number
    intervalMs?: number
}

export function ModelDial({
    models,
    itemHeight = 40,
    visibleCount = 5,
    intervalMs = 3000
}: ModelDialProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const iv = setInterval(() => {
            setCurrentIndex(idx => (idx + 1) % models.length)
        }, intervalMs)
        return () => clearInterval(iv)
    }, [models.length, intervalMs])

    return (
        <div
            className="relative overflow-hidden"
            style={{ height: itemHeight * visibleCount }}
        >
            <div
                className="transition-transform duration-700 ease-in-out"
                style={{ transform: `translateY(-${currentIndex * itemHeight}px)` }}
            >
                {models.map((name, i) => {
                    const dist = Math.abs(i - currentIndex)
                    const opacity = dist === 0 ? 1 : dist === 1 ? 0.5 : 0.2
                    const scale = dist === 0 ? 2 : 1

                    return (
                        <div
                            key={i}
                            className="flex items-center justify-center"
                            style={{
                                height: itemHeight,
                                opacity,
                                transform: `scale(${scale})`,
                                transition: 'all 0.7s ease'
                            }}
                        >
                            <span
                                className={`text-xl ${i === currentIndex
                                        ? 'font-extrabold text-white'
                                        : 'font-medium text-gray-400'
                                    }`}
                            >
                                {name}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
