import { useEffect, useState } from 'react'

const useTypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!text?.length) return
    console.log('here')
    const randomTime = Math.floor(Math.random() * 30) + 9

    const intervalId = setInterval(() => {
      if (currentIndex >= text.length) {
        setCurrentIndex(currentIndex)
        clearInterval(intervalId)
        setShowCursor(false)
      }

      const nextIndex = text.indexOf('', currentIndex + 1)
      if (nextIndex < 0) {
        setDisplayText(text)
        setCurrentIndex(text.length)
        return
      }
      if (nextIndex > text.length) {
        setCurrentIndex(text.length)
      }
      setDisplayText(text.slice(0, nextIndex))
      setCurrentIndex(currentIndex + 1)

      if (currentIndex === text.length) {
        setCurrentIndex(text.length)
      }
    }, randomTime)
    return () => {
      clearInterval(intervalId)
    }
  }, [text, currentIndex])
  return { displayText, showCursor }
}

export default function TypeEffect({ text }) {
  const { displayText, showCursor } = useTypingEffect({ text })

  return (
    <span
      className={`${
        showCursor ? 'after:content-["⬜"] after:ml-1 after:animate-typing' : ''
      }`}
    >
      {displayText}
    </span>
  )
}
