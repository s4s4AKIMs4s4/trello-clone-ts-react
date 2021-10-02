import {IclientMouse, children, Istate} from '../App'


interface props {
    flag:boolean,
    clientMouse: IclientMouse
    setClientMouse: (state: IclientMouse) => void,
    isBlockMoved: boolean,
    targetDiv: HTMLDivElement
    state: Istate[]
    UpdateBlockAction:Function
    targetDivElemnt: HTMLDivElement
    left: number
    basis: number
}



export function logKey({
    flag,
    setClientMouse,
    clientMouse,
    isBlockMoved,
    UpdateBlockAction,
    state,
    targetDiv,
    targetDivElemnt,
    left,
    basis}: props) 
{
return (e:React.MouseEvent) => {
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


          
          
          const Xposition = Number(clientMouse.clientX) - basis

          console.log('initPosition')

          //console.log(initPosition)
          
          console.log('number')
          console.log(Number(clientMouse.clientX))

          console.log('basis')
          //console.log(basis)

          targetDiv.style.position = 'absolute'
          targetDiv.style.left = `${Xposition}px`
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
          console.log('dddddddddddddddddddddddddddddddddd')
          targetDivElemnt.style.position = 'absolute'
          const calc  = Number(clientMouse.clientX) - left


          targetDivElemnt.style.left = `${calc}px`
          targetDivElemnt.style.top =`${clientMouse.clientY}px`
        }
      }

    

  }
}