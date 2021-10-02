import {Istate,children} from '../App'
interface props{
    state: Istate[],
    UpdateBlockAction: Function,
    targetDivElemnt: HTMLDivElement,
    setCurrentUction:(children: children) => void
}

export function  updateActionSize({targetDivElemnt,UpdateBlockAction,setCurrentUction,state}: props) {

    const actions = document.querySelectorAll('.actions')

    let listActionsLength:children[] = [] as children[]
    let it = 0

    let flattenChidrens:children[] = [] as children[]

    getCurrentAction(state,targetDivElemnt,setCurrentUction)

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
    
}


function getCurrentAction(state: Istate[],targetDivElemnt: HTMLDivElement, setCurrentUction:(children: children) => void){
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