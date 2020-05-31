import React, { useState, useEffect } from "react";

const Styles = {
  timerContainer: {
    width: 400,
    height: 250,
    backgroundColor: "#FAF6FF",
    borderRadius: 8,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    border:"0.5px solid #EDEBF0",
    fontFamily:"'Roboto', sans-serif",
    boxSizing:"border-box"
  },
  timerHeader:{
    display:"flex",justifyContent:"space-evenly",color:"#717171",padding:10,
    height:50,
    borderBottom:"0.6px solid #EDEBF0",hieght:50
  },
  timerName:{
    borderBottom:"2px solid #4175FF",
    cursor:"pointer",
    fontSize:12
  },
  timerBottom:{
    borderTop:"0.5px solid #EDEBF0",height:60,
  },
  timerBtn:{
    borderRadius:4,
    // padding:,
    margin:6,
    backgroundColor:"#4175FF",
    color:"white",
    border:"none",
    padding:"6px 20px"
  },
  timerBody:{
    height:140,
    lineHeight:"140px",
  }
};

const Stopwatch = (props)=>{
  const {stopwatch} = props
  return(
    <>
        <h1>
        {(stopwatch.m)>=10?stopwatch.m:"0"+stopwatch.m}<sub>m</sub>
        {(stopwatch.s)>=10? stopwatch.s: "0"+stopwatch.s }<sub>s</sub>
        {(stopwatch.ms)>=10? stopwatch.ms: "0"+stopwatch.ms}
        </h1> 
    </>
  )
}
const Timer = (props)=>{
  const {timer} = props
  return(
    
    <>
      <h1>
          {(timer.min)>=10?timer.min:"0"+timer.min}<sub>m</sub>
          {(timer.sec)>=10? timer.sec: "0"+timer.sec }<sub>s</sub>
      </h1>
        
    </>
  
  )
}

const Watch = () => {
  
  const [stopwatch,setStopwatch] = useState({m:0,s:0,ms:0})
  const [timer,setTimer] = useState({min:5,sec:0})
  const [timerShow, setTimerShow] = useState(false)
  const [stopShow, setStopShow] = useState(false)
  // const [clearTimer, setClearTimer] = useState("")

  useEffect(()=>{
      setTimerShow(true)
  },[])

  let clearStopwatch
  const handleStopwatch = ()=>{

    clearStopwatch =  setInterval(()=>handleStart(),10)
    
    
  }
  let updateM = stopwatch.m, updateS = stopwatch.s, updateMs = stopwatch.ms
  
  const handleStart=()=>{
    if(updateS === 60){
      updateM++;
      updateS = 0
    }
    if(updateMs === 100){
      updateS++;
      updateMs = 0
    }
    updateMs++
    
    return setStopwatch({m:updateM,s:updateS,ms:updateMs})
  }
  
  const resetStopwatch=()=>{
    clearInterval(clearStopwatch)
    setStopwatch({m:0,s:0,ms:0})
  }
  


  let clearTimer;
  const startTimer= ()=>{
    cleatTimer = setInterval(() => {
      handleTimer()
    }, 1000);
  }
  const handleTimer = ()=>{
    
    let updateMin ,getMin,getSec
    if(timer.min===0 && timer.sec ===0){
      setTimer({min:5,sec:0})
      return
    }
    
    updateMin = (timer.min*60+timer.sec)-1

    getMin = Math.floor(updateMin/60);
    getSec = Math.floor(updateMin%60);
    return setTimer({min:getMin,sec:getSec})
  }
  

  return (
    <>
      <div style={Styles.timerContainer}>
        <div style={Styles.timerHeader}>

        <div onClick={()=>{
          setTimerShow(true),setStopShow(false)
        }} 
        style={Styles.timerName} >
          <i class="far fa-clock"style={{marginRight:5}}></i>TIMER</div>

        <div onClick={()=>{
          setStopShow(true),setTimerShow(false)
        }} style={Styles.timerName}><i class="far fa-alarm-clock" style={{marginRight:5}}></i>STOPWATCH</div>
        </div>

        <div style={Styles.timerBody}>
          <div style={{margin:10}}>
            { timerShow?<Timer timer={timer}/>:""}
            {stopShow?<Stopwatch stopwatch={stopwatch}/>:""}
          </div>
        </div>

        <div style={Styles.timerBottom}>
            <button onClick={()=>[
                // timerShow?handleTimer():false,
                // stopShow?handleStopwatch():false
                  // startTimer()
                  handleTimer()
                  // handleStopwatch()

            ]} style={Styles.timerBtn}><small>START</small></button>
            <button onClick={()=>resetStopwatch()} style={Styles.timerBtn}><small>RESET</small></button>
        </div>
      </div>
    </>
  );
};

export default Watch;
