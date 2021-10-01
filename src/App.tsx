import { off } from 'process';
import React, {useEffect,useRef,createRef, useState, FC} from 'react';
import './App.css';
import { useTypedSelector } from './hooks/typedSelector';
import { UseActions } from './hooks/useActionsHook';
import {MemoListDiv} from './list'

interface IclientMouse{
  clientX:string,
  clientY:string
}


export interface children{
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
  const {UpdateBlockAction,updateEventAction} = UseActions()
  const state  = useTypedSelector( state => state.block )
  //const [state, UpdateBlockAction] = useState<Istate[]>([])

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

  
  
  const eventState  = useTypedSelector( state => state.event )

  function getCurrentAction(){
    const obj = state
    for(let sIterator = 0; sIterator< state.length;sIterator++){
      const childrens = obj[sIterator].childrens
      for(let aIterator = 0 ; aIterator < childrens.length; aIterator++){
        if(targetDivElemnt.textContent === childrens[aIterator].text){
          setCurrentUction(childrens[aIterator])
          // obj[sIterator].childrens.splice(aIterator,1)
          // UpdateBlockAction(obj)
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
        if(listActionsLength[i].text === 'add'){
          listActionsLength[i].y = 10000
        }
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

    UpdateBlockAction(obj)

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
  UpdateBlockAction(obj)

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
          UpdateBlockAction(obj)
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
      let target = e.target as HTMLDivElement
      console.log('where i just click')
      console.log(target)
      // if(target.className = 'block__header'){
      //   //console.log(target.getAttribute('data-id'))
      //   setFlag(false)
      //   updateEventAction(Number(target.getAttribute('data-id')), true )
        
      // }


      if(target.textContent === 'add values') {setFlag(false); return false}
      
      if(target.className === 'block__header'){
        target = target.parentNode as HTMLDivElement
      }


      if(target.className === 'actions'){
        setApdateActions(true)
        setIsBlockMoved(false)
        setTargetDivElement(target)
        setLeft(target.getBoundingClientRect().x)
        return false
      }
      else{
        setIsBlockMoved(true)
        setTargetDiv(target)   
        const textTarget = target.querySelector('.block__header')?.textContent?.split(' ').join('');
        console.log(textTarget)
        state.forEach((val, index) => {
          console.log(val.header)
          if(val.header === textTarget){
            console.log(textTarget)
            console.log(state[index].target)
            state[index].target = 1
          } 
        })
      }
      return false
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
        UpdateBlockAction(obj)
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
        UpdateBlockAction(obj)        
        setApdateActions(false)
      }

    }

    function sortY(obj:Istate[]){
      
      obj.forEach((val)=>{
        val.childrens.sort(sortingAlgortimY)
      })
      //UpdateBlockAction(obj)
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
              //UpdateBlockAction(obj)
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
