import { off } from 'process';
import React, {useEffect,useRef,createRef, useState, FC} from 'react';
import './App.css';
import {MemoListDiv} from './list'

interface IclientMouse{
  clientX:string,
  clientY:string
}


interface children{
  x:number,
  y:number,
  text:string,
}


export interface Istate{
  id:number,
  header:string,
  left:number,
  target: null| number,
  childrens: children[],
}



const  App:FC = ()=> {
  const client = useRef<HTMLDivElement>(null)
  const blocks = useRef<HTMLDivElement>(null)
  const [flag,setFlag] = useState<boolean>(false)

  const [targetDiv,setTargetDiv] = useState<HTMLDivElement>({} as HTMLDivElement)
  const [clientMouse,setClientMouse] = useState<IclientMouse>({clientX:'1',clientY:'1'})

  const [isBlockMoved,setIsBlockMoved] = useState<boolean>(false)
  const [targetDivElemnt,setTargetDivElement] = useState<HTMLDivElement>({} as HTMLDivElement)
  const [left,setLeft] = useState<number>(0)


  const [state, setState] = useState<Istate[]>([
    {
      id:1,
      header:'hello',
      left:1,
      target:null,
      childrens:[{x:1,y:1,text:'1'},{x:1,y:2,text:'12'}]
    },
    {
      id:2,
      header:'word',
      left:2,
      target:null,
      childrens:[{x:1,y:1,text:'2'}]
    },
    {
      id:3,
      header:'bbbbb',
      left:3,
      target:null,
      childrens:[{x:1,y:1,text:'3'}]
    },
    {
      id:4,
      header:'ffffffffff',
      left:4,
      target:null,
      childrens:[{x:1,y:1,text:'4'}]
    },
    {
      id:5,
      header:'sssssssssssssssssssssss',
      left:4,
      target:null,
      childrens:[{x:1,y:1,text:'5'}]
    },


  ])




 useEffect (() => {
  const blocks = document.querySelectorAll('.block') 
  const obj = state

  blocks.forEach((val, index)=>{
    if(index === obj.length) return
    // console.log('obj')
    // console.log(obj)
    // console.log('index')
    // console.log(index)
    const bl = val as HTMLDivElement
    const num = bl.getBoundingClientRect().x

    if(obj[index].target !== 1)
      obj[index].left = num

    obj[index].header = state[index].header
    obj[index].id = state[index].id
  })
  setState(obj)

 }, [state])


  function logKey(e:React.MouseEvent){
    const obj = {
      clientX:e.clientX.toString(),
      clientY:e.clientY.toString()
    }
    // console.log('x ',e.clientX.toString())
    // console.log('y', e.clientY.toString())
    
    setClientMouse(obj)
    if(flag)
      {
        if(isBlockMoved){
          targetDiv.style.position = 'absolute'
          targetDiv.style.left = `${clientMouse.clientX}px`
          targetDiv.style.top =`${clientMouse.clientY}px`

          const obj = [] as Istate[] 
          state.forEach((val, index) =>{
            if(state[index].target === 1){
              obj.push(state[index])
              console.log('hello')
              return
            }
            if(index+1 === state.length) {obj.push(state[index]); return}
            if(val.header === 'white space') return
            
            if(e.clientX > val.left   &&  e.clientX < state[index+1].left ){  
              obj.push(state[index])
              obj.push({
                header:'white space',
                id:Math.floor(1000*Math.random()),
                left: e.clientX,
                target:null,
                childrens:[{x:1,y:1,text:''}]
              })
            
              return 
            }
            obj.push(val)

          })
          setState(obj)
        }
        else{
          targetDivElemnt.style.position = 'absolute'
          const calc  = Number(clientMouse.clientX) - left


          targetDivElemnt.style.left = `${calc}px`
          targetDivElemnt.style.top =`${clientMouse.clientY}px`
        }
      }

    

  }

    

    function destribution(e:React.MouseEvent<HTMLDivElement>){
      setFlag(true)
      const target = e.target as HTMLDivElement
      if(target.textContent === 'add values') {setFlag(false); return}
      

      console.log(target.className)
      if(target.className === 'actions'){

        setIsBlockMoved(false)
        setTargetDivElement(target)
        setLeft(target.getBoundingClientRect().x)
        console.log('left')
        console.log(left)
      }
      else{
        setIsBlockMoved(true)
        setTargetDiv(target)   
        const textTarget = target.querySelector('.block__header')?.textContent
        state.forEach((val, index) => {
          if(val.header === textTarget){
            //console.log(textTarget)
            //console.log(state[index].target)
            state[index].target = 1
          } 
        })
      }
    }

    function compare(a:Istate, b:Istate){
      return a.left - b.left
    }





    function cleanOut(){


      // const mario = document.querySelector('.mario')
      // console.log( (mario as HTMLDivElement).getBoundingClientRect() ) 

      setFlag(false)
      setIsBlockMoved(false)
      const blocks = document.querySelectorAll('.block') 
      const obj = state
      let select = -1
      blocks.forEach((val, index)=>{
        if(index === obj.length) return
        const bl = val as HTMLDivElement
        //console.log(bl.getBoundingClientRect())
        const num = bl.getBoundingClientRect().x 
        if(bl.textContent === 'white space') { select = index; return}
        obj[index].left = num
        // obj[index].header = bl.textContent as string
        obj[index].id = Math.floor(10000*Math.random())
        obj[index].target = null
        //console.log(bl.style.left)
      })




      if(select !== -1)
        obj.splice(select,1)
      obj.sort(compare)
      setState(obj)

    }
    

  return (
    <div className = 'root' onMouseMove = {logKey} onMouseUp = {cleanOut}  >
      <MemoListDiv state = {state} destribution = {destribution}/>
      <div className='Mouse Input' ref = {client}></div>
    </div>

  );
}

export default App;
