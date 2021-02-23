import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal'
import { v4 as uuidv4 } from 'uuid';
import { returnBlock, range, flatten, getGame, isSolvedSudoku, arraysMatch} from '../utils';
import { useWindowSize} from '@react-hook/window-size';
import Confetti from 'react-confetti'
import Timer from './Timer'





interface rowProps {
  data: CellVal[][],
  changeCell(id:CellVal): void,
  isBadlyCompleted: CellVal[]
}


function Row({data, changeCell, isBadlyCompleted}: rowProps){
  const styleBlock = [0,2,4,6,8];
  const topIndices = range(9, 90, 9);

  const listItems:JSX.Element[] = data.map((row, hiidx) =>{
    const myrange = range(0,topIndices[hiidx]).slice(-9)
    console.log(myrange)
    return(
       <div style={{display:'flex',flexDirection:'row'}} key={uuidv4()}>
         {row.map((item, lowidx) =>{
           let bg =''
           if(Array.isArray(isBadlyCompleted) && isBadlyCompleted.length){
             if(isBadlyCompleted.some(cell => arraysMatch([cell.row, cell.col], [hiidx,lowidx]))){
               bg = 'salmon'
             }
           } else if(styleBlock.includes(returnBlock(myrange[lowidx]))){
             bg = 'lightgray'
           }
          return (
          <Cell key={`${item.row} - ${item.col}`} 
            onClick={() => changeCell(item)} 
            blockStyle={bg}
            >
            <Item visibility={item.val === 0} numberColor={item.canChange}>
              {item.val}
            </Item>
           
          </Cell>)
          }
          
         )}
       </div> 
    )
    });

    return (
      <div style={{ display:'flex', flexDirection:'column'}}>
          {listItems}
         
      </div>
  )
}

interface CellVal{
  val: number,
  row: number,
  col: number,
  answer: number,
  canChange: boolean
}

interface ItemProp{
  visibility: boolean,
  numberColor: boolean
}

const Item = styled.span<ItemProp>`
  visibility: ${(props:ItemProp) => props.visibility ? 'hidden' : ''};
  color: ${(props: ItemProp) => props.numberColor ? 'blue' : 'black'};
  font-size: 150%
`;




function Grid() {
  const [isOpen, setIsOpen] = useState(false)
  const [randoms, setRandoms] = useState<CellVal[][]>([])
  const [current, setCurrent] = useState<CellVal>({val:0, row:0, col:0, answer: 0, canChange: false})
  const [badlyCompleted, setBadlyCompleted] = useState<CellVal[]>([])
  const [width, height] = useWindowSize()
  // confetti
  const [confetti, setConfetti] = useState<boolean>(false)
  const [confettiKey, setConfettiKey] = useState<string>('')
  // timer state
  enum TimerMsg{
    Playing = 'Playing',
    Won = 'Won',
    Lost = 'Lost'
  }

  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [counter, setCounter] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerMesg, setTimerMesg] = useState<TimerMsg>(TimerMsg.Playing)
  // get me other
  const [reSodoku, setAnotherSudoku] = useState(false)
  

  

  function openModal(id: CellVal) {
    if(id.canChange){
      setCurrent(id)
      setIsOpen(!isOpen)
    }
  }
  function closeModal(value: number):void {
    const newNums = [...randoms]
    const rowToBeChanged = newNums[current.row]
    rowToBeChanged.splice(current.col, 1, {val: value, row: current.row, col: current.col,answer: current.answer, canChange: current.canChange})
    newNums.splice(current.row, 1, rowToBeChanged)
    setRandoms(newNums)
    setIsOpen(!isOpen)
    isGameComplete()
  }

  function isGameComplete(){
  
    const rawValues = flatten(randoms).map(cell => cell.val)
    const possiblyWrongValues = flatten(randoms).filter(cell => cell.val !== cell.answer)
    const done = rawValues.every(cell => cell !== 0)
    if(done){
      if(isSolvedSudoku(rawValues)){
       setConfetti(true)
       setTimerMesg(TimerMsg.Won)
      } else{
        setBadlyCompleted(possiblyWrongValues)
        setTimerMesg(TimerMsg.Lost)
      }
    }
  }
  function stopTimer() {
   
    setCounter(0);
    setSecond('00');
    setMinute('00')
    
  }
  function getMeOtherSudoku(){
    setConfetti(false)
    setConfettiKey(uuidv4())
    stopTimer()
    setTimerMesg(TimerMsg.Playing)
    setBadlyCompleted([])
    setAnotherSudoku(!reSodoku)
  }

  useEffect(() =>{
    
    const matrix: CellVal[][] = getGame(1)
    setRandoms(matrix);
  },[reSodoku])

   
   
    return (
        <Wrapper>
        <Timer 
            isActive={isTimerActive}
            second={second}
            setSecond={setSecond}
            minute={minute}
            setMinute={setMinute}
            counter={counter}
            setCounter={setCounter}
            timerMsg={timerMesg}
        />
          <div style={{ display:'flex', flexDirection:'row'}}>
              
                {!isTimerActive ? 
                (<InitialMsg>
                  <p style={{lineHeight: '5px'}}>Please press start</p>
                  <p style={{lineHeight: '5px'}}>to begin the sudoku!</p>
                </InitialMsg>) :
                (
    
                <>
                  <Row data={randoms} changeCell={openModal} isBadlyCompleted={badlyCompleted}/>
                    
                      <Confetti key={confettiKey}
                            width={width}
                            height={height}
                            run={confetti}
                          />
                              
                </>
                )}
              
                
              
              <FancyModalButton
                isOpen={isOpen}
                toggleModal={() => setIsOpen(!isOpen)}
                closeModal={closeModal}/>
          </div>
          
          {!isTimerActive ?
            (<Mybtn onClick={() => setIsTimerActive(true)}>Start</Mybtn>)
            :(<Mybtn onClick={() => getMeOtherSudoku()}>Get me another</Mybtn>)
            }
        </Wrapper>
    )
}

export default Grid;

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content:center;
  height: 100vh;
  
`;

const InitialMsg = styled.div`
  text-align:center;
  font-size:30px;
  font-weight: 900;
`

const Mybtn = styled.button`
  margin-top: 25px;
  width: 300px;
  height: 75px;
  background: linear-gradient(90deg, rgba(66,4,53,1) 0%, rgba(81,22,111,1) 35%, rgba(12,29,84,1) 100%);
  color: whitesmoke;
  border: none;
  font-size: 45px;
  border-radius: 10px;
`

              

interface modalBtnProp {
  isOpen: boolean,
  toggleModal(): void,
  closeModal(id:number): void
}
function FancyModalButton({isOpen, toggleModal, closeModal}: modalBtnProp) {
 

    return (
      <div>
        <StyledModal
          
          isOpen={isOpen}
          onBackgroundClick={() => toggleModal()}
          onEscapeKeydown={() => toggleModal()}>
          <KeyboardContainer>
            <Keyboard>
              <Digit onClick={() => closeModal(1)}>1</Digit>
              <Digit onClick={() => closeModal(2)}>2</Digit>
              <Digit onClick={() => closeModal(3)}>3</Digit>
              <Digit clear={true} onClick={() => closeModal(4)}>4</Digit>
              <Digit onClick={() => closeModal(5)}>5</Digit>
              <Digit onClick={() => closeModal(6)}>6</Digit>
              <Digit clear={true} onClick={() => closeModal(7)}>7</Digit>
              <Digit onClick={() => closeModal(8)}>8</Digit>
              <Digit onClick={() => closeModal(9)}>9</Digit>
            </Keyboard>
          </KeyboardContainer>
          <button onClick={() => toggleModal()}>Close me</button>
        </StyledModal>
      </div>
    )
  
}
interface CellProp{
  blockStyle: string
}


const Cell = styled.span`
    height: 40px;
    width: 40px;
    padding:7px;
    margin: 0px;
    color: blue;
    border: 0.5px solid;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: ${(props: CellProp) => props.blockStyle };
    
`;


const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const KeyboardContainer = styled.div`
margin: 100px auto;  
width: 760px;  
`;

const Keyboard = styled.ul`
margin: 0;  
padding: 0;  
list-style: none; 
`;

interface clearProp {
  clear?: boolean
}
const Digit = styled.li`
float: left;  
    margin: 0 5px 5px 0;  
    width: 60px;  
    height: 60px;  
    font-size: 24px;
    line-height: 60px;  
    text-align: center;  
    background: #fff;  
    border: 1px solid #f9f9f9;  
    border-radius: 5px;
    clear: ${(props: clearProp) => props.clear ? 'left' : ''};
    &:hover{
      position: relative;  
        top: 1px;  
        left: 1px;  
        border-color: #e5e5e5;  
        cursor: pointer; 
    }
`;
