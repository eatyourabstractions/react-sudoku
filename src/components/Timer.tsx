import React,{useEffect, useState} from 'react'
import styled from 'styled-components';

interface TimerProp{
    isActive: boolean,
    second: string, setSecond: React.Dispatch<React.SetStateAction<string>>,
    minute: string, setMinute: React.Dispatch<React.SetStateAction<string>>,
    counter: number, setCounter: React.Dispatch<React.SetStateAction<number>>
    timerMsg: string
}

function Timer(props: TimerProp) {
    const {isActive, second, setSecond, minute, setMinute, counter, setCounter, timerMsg} = props

    useEffect(() => {
        let intervalId: number
    
        if (isActive) {
             intervalId = window.setInterval(() => {
            const secondCounter = counter % 60;
            const minuteCounter = Math.floor(counter / 60);
    
            const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: `${secondCounter}`;
            const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: `${minuteCounter}`;
    
            setSecond(computedSecond);
            setMinute(computedMinute);
    
            setCounter(counter => counter + 1);
          }, 1000)
        }
    
        return () => clearInterval(intervalId);
      }, [isActive, counter])

      const setTimerBarMsg = (barState:string) =>{
        switch (barState) {
          case 'Playing':
            return (
              <>
                <span className={'minutes'}>{minute}</span>
                <span>:</span>
                <span className={'seconds'}>{second}</span>
              </>
            )
          case 'Won':
            return <span>Congratulation!</span>

          case 'Lost':
            return <span>Nice try!</span>
        
          default:
            break;
        }

      }

    return (
        <Container>
            <Time>
            {setTimerBarMsg(timerMsg)}
            </Time>
        </Container>
    )
}

export default Timer

const Container = styled.div`
  width: 500px;
  margin: 0 auto;
  display: grid;
  place-items: center;
  margin-top: 20px;
  background: rgb(66,4,53);
  background: linear-gradient(90deg, rgba(66,4,53,1) 0%, rgba(81,22,111,1) 35%, rgba(12,29,84,1) 100%);
  padding: 10px 10px;
  border-radius: 10px;
  height: 50px;
  margin-bottom: 20px;
`;

const Time = styled.div`
    font-size: 40px;
  margin-bottom: 1rem;
  color: white;
`;
