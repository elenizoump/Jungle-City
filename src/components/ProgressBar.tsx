import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components/macro'

interface ProgressBarProps {
  amountCompleted: number
}

const StyledProgressBar = styled.div`
  height: 35px;
  width: 95%;
  .progress-empty {
    background-color: rgb(157, 189, 186);
    border-radius: 20px;
    height: 100%;
    width: 100%;
  }
  .progress-completed {
    background: linear-gradient(to left, rgb(15, 241, 192), rgb(24, 74, 69));
    border-radius: 20px;
    height: 100%;
    width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    box-shadow: 0 3px 3px -5px rgb(15, 241, 192), 0 2px 5px rgb(41, 148, 125);
    transition: 1s ease;
    color: white;
    font-size: 1.16rem;
  }
`

const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  amountCompleted,
}) => {
  const [style, setStyle] = useState({})
  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${amountCompleted}%`,
    }
    setStyle(newStyle)
  }, 1000)
  return (
    <StyledProgressBar>
      <div className="progress-empty">
        <div className="progress-completed" style={style}>
          Achieved: {amountCompleted}%
        </div>
      </div>
    </StyledProgressBar>
  )
}

export default ProgressBar
