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
  index:number,
}


export interface Istate{
  id:number,
  header:string,
  left:number,
  target: null| number,
  childrens: children[],
  length:number,
}



const  App:FC = ()=> {
  const client = useRef<HTMLDivElement>(null)
  const blocks = useRef<HTMLDivElement>(null)
  const [flag,setFlag] = useState<boolean>(false)


  const [updateActions, setApdateActions] = useState<boolean>(false)

  const [targetDiv,setTargetDiv] = useState<HTMLDivElement>({} as HTMLDivElement)
  const [clientMouse,setClientMouse] = useState<IclientMouse>({clientX:'1',clientY:'1'})

  const [isBlockMoved,setIsBlockMoved] = useState<boolean>(false)
  const [targetDivElemnt,setTargetDivElement] = useState<HTMLDivElement>({} as HTMLDivElement)
  const [left,setLeft] = useState<number>(0)

  const [currentAction,setCurrentUction] = useState<children>({} as children)

  const [state, setState] = useState<Istate[]>([
    {
      id:1,
      header:'hello',
      left:1,
      target:null,
      childrens:[{x:1,y:1,text:'1',index:1},{x:1,y:2,text:'12',index:2},{x:1,y:10000,text:'add',index:100000}],
      length:3,
    },
    {
      id:2,
      header:'word',
      left:2,
      target:null,
      childrens:[{x:1,y:1,text:'2',index:3},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },
    {
      id:3,
      header:'bbbbb',
      left:3,
      target:null,
      childrens:[{x:1,y:1,text:'3',index:4},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },
    {
      id:4,
      header:'ffffffffff',
      left:4,
      target:null,
      childrens:[{x:1,y:1,text:'4',index:5},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },
    {
      id:5,
      header:'sssssssssssssssssssssss',
      left:4,
      target:null,
      childrens:[{x:1,y:1,text:'5',index:6},{x:1,y:10000,text:'add',index:100000}],
      length:2
    },


  ])


  function getCurrentAction(){
    const obj = state
    for(let sIterator = 0; sIterator< state.length;sIterator++){
      const childrens = obj[sIterator].childrens
      for(let aIterator = 0 ; aIterator < childrens.length; aIterator++){
        if(targetDivElemnt.textContent === childrens[aIterator].text){
          setCurrentUction(childrens[aIterator])
          // obj[sIterator].childrens.splice(aIterator,1)
          // setState(obj)
          //childrens.splice(aIterator,1)
          return
        }
      }
    }
  }


  useEffect(() => {
   
    const actions = document.querySelectorAll('.actions')

    let listActionsLength:children[] = [] as children[]
    let it = 0

    let flattenChidrens:children[] = [] as children[]

    getCurrentAction()
  //  console.log(currentAction)
    

    //copy all chidrens from state ...
    state.forEach((val) =>{
      val.childrens.forEach((val) =>{
        flattenChidrens.push(val)
      })
    })
    // console.log('flattenChidrens')
    // console.log(flattenChidrens)
    
    //update coordinats for actions
    actions.forEach((val)=>{
      const action = val as HTMLDivElement
     // console.log(action.getBoundingClientRect().x)          
      listActionsLength.push(
        {
          ...flattenChidrens[it++],
          x:action.getBoundingClientRect().x,
          y:action.getBoundingClientRect().y,
          
        }
      )
    })

    // console.log('listActionsLength')
    // console.log(listActionsLength)

    const obj = state
    obj.forEach((val,it) =>{
      const temp:children[] = [] as children[] 
      for(let i = 0; i < val.length ; i++ ){
        temp.push(listActionsLength[i])
      }

      listActionsLength.splice(0, val.length)
      // console.log('valLen listActionCreainsLen')
      // console.log(val.length)
      // console.log(listActionsLength)

      val.childrens = temp     
      //val.childrens.sort(sortActionInsideoneDiv)
    })

    // console.log('obj')
    // console.log(obj)

    setState(obj)

    //setApdateActions(false)
  },[updateActions])



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
                childrens:[{x:1,y:1,text:'', index:20}],
                length:1
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
      

      if(target.className === 'actions'){
        setApdateActions(true)
        setIsBlockMoved(false)
        setTargetDivElement(target)
        setLeft(target.getBoundingClientRect().x)
        
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
      if(isBlockMoved){
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


          // obj[index].childrens.forEach((val) => {
          //   console.log()
          // })
          //console.log(bl.style.left)
        })
        if(select !== -1)
          obj.splice(select,1)
        obj.sort(compare)
        setState(obj)
      }
      if(updateActions){
        console.log('Apdate')
        let obj = state
        const actions = document.querySelectorAll('.actions') 


        const action = currentAction
        deleteNode(obj)
        for(let i = 0; i < obj.length; i++){
          
         obj[i].length = obj[i].childrens.length
          console.log(action)
          if(i === 0){
            if( obj[i].childrens[0].x  >= Number(clientMouse.clientX) ){
              console.log('0')
              action.index = Math.floor(10000 * Math.random())
              obj[i].childrens.push(action)
              obj[i].length = obj[i].childrens.length
              break;
            }
          }
          if(i === obj.length - 1){
            if( obj[i].childrens[0].x  <= Number(clientMouse.clientX) ){
              console.log('1')
              action.index = Math.floor(10000 * Math.random())
              obj[i].childrens.push(action)
              obj[i].length = obj[i].childrens.length
            }
            break;
          }

          if( (obj[i].childrens[0].x <= Number(clientMouse.clientX) )  && (  Number(clientMouse.clientX) <= obj[i+1].childrens[0].x))  {
            console.log('2')
            action.index = Math.floor(10000 * Math.random())

            console.log('action inside')
            console.log(action)
            obj[i].childrens.push(action)
            console.log('obj childrens')
            console.log(obj[i].childrens[1])
            
            obj[i].length = obj[i].childrens.length
          }
          console.log('obj[i]')
          console.log(obj[i])
        }

        console.log('obj')
        console.log(obj)

        
        sortY(obj)
        setState(obj)        
        setApdateActions(false)
      }

    }

    function sortY(obj:Istate[]){
      
      obj.forEach((val)=>{
        val.childrens.sort(sortingAlgortimY)
      })
      //setState(obj)
    }

    function sortingAlgortimY(a:children,b:children){
      return a.y - b.y
    }
    function deleteNode(obj:Istate[]){
      
        for(let sIterator = 0; sIterator< state.length;sIterator++){
          const childrens = obj[sIterator].childrens
          for(let aIterator = 0 ; aIterator < childrens.length; aIterator++){
            if(targetDivElemnt.textContent === childrens[aIterator].text){             
              obj[sIterator].childrens.splice(aIterator,1)
              //setState(obj)
              //childrens.splice(aIterator,1)
              break
            }
          }    
        }
    }

    function sortActionInsideoneDiv(a:children,b:children){
      return a.y - b.y
    }
    
    function sortActions(a:children,b:children){
      return a.x - b.x
    }

  return (
    <div className = 'root' onMouseMove = {logKey} onMouseUp = {cleanOut}  >
      <MemoListDiv state = {state} destribution = {destribution}/>
      <div className='Mouse Input' ref = {client}></div>
    </div>

  );
}

export default App;
