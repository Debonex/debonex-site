import { FC, useState } from "react"

const Test: FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>{count}</div>
      <div
        className="cursor-pointer"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        +
      </div>
    </div>
  )
}

export default Test
