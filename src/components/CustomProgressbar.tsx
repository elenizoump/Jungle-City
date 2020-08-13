import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components/macro'

interface ProgressBarProps {
  amountCompleted: number
}

const StyledCustomProgressbar = styled.div`
  height: 35px;
  width: 95%;
  .progress-empty {
    background-color: rgba(157, 189, 186, 0.78);
    border-radius: 20px;
    height: 100%;
    width: 100%;
    box-shadow: inset 0 0 2px rgb(25, 78, 72);
    border: 0.5px solid rgba(25, 78, 72, 0.46);

    /* h1 {
      font-size: 1.16rem;
      text-align: center;
      color: white;
      position: fixwd;
      top: 160px;
      right: 400px;
    } */
  }
  .progress-completed {
    background: linear-gradient(to left, rgb(15, 241, 192), rgb(24, 74, 69));
    border-radius: 20px;
    height: 100%;
    width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 8px;
    opacity: 0;
    box-shadow: inset 3px 1px 10px rgb(24, 74, 69);
    /* 0 3px 3px -5px rgb(15, 241, 192), 0 2px 5px rgb(41, 148, 125); */
    transition: 1s ease;
    color: white;
    font-size: 1.2rem;
    p {
      justify-content: right;
    }
  }
`
const CustomProgressbar: FunctionComponent<ProgressBarProps> = ({
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

  if (amountCompleted === -1) {
    return null
  }

  return (
    <StyledCustomProgressbar>
      <div className="progress-empty">
        <div className="progress-completed" style={style}>
          <p>{amountCompleted}%</p>
        </div>
      </div>
    </StyledCustomProgressbar>
  )
}

export default CustomProgressbar
