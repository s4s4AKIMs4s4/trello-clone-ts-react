import {Istate,children} from '../App'

interface props{
    state: Istate[],
    UpdateBlockAction: Function,
    targetDivElemnt: HTMLDivElement,
    setCurrentUction:(children: children) => void
}



const getListActionsLength = (actions:NodeListOf<Element>, flattenChidrens:children[] ) => {
  let listActionsLength:children[] = [] as children[]
  let it = 0
  actions.forEach((val)=>{
    const action = val as HTMLDivElement        
    listActionsLength.push(
      {
        ...flattenChidrens[it++],
        x:action.getBoundingClientRect().x,
        y:action.getBoundingClientRect().y,
        
      }
    )
  })
  return listActionsLength
}

const getFlattenChildrens = (state: Istate[]) => {
  const flattenChidrens:children[] = [] as children[]
  state.forEach((block) =>{
    block.childrens.forEach((block) =>{
      flattenChidrens.push(block)
    })
  })
  return flattenChidrens
}

const CalculateNewState = (state: Istate[], listActionsLength:children[]) => {
  state.forEach((val,it) =>{
    const temp:children[] = [] as children[] 
    for(let i = 0; i < val.length ; i++ ){
      temp.push(listActionsLength[i])
      if(listActionsLength[i].text === 'add'){
        console.log('adddddddddddddddddddd')
        listActionsLength[i].y = 10000
      }
    }

    listActionsLength.splice(0, val.length)
    val.childrens = temp     
  })
}



export function  updateActionSize({targetDivElemnt,UpdateBlockAction,setCurrentUction,state}: props) {

    const actions = document.querySelectorAll('.actions')
    let listActionsLength:children[] = [] as children[]
    let flattenChidrens:children[] = [] as children[]
    getCurrentAction(state,targetDivElemnt,setCurrentUction)
    flattenChidrens = getFlattenChildrens(state)
    listActionsLength = getListActionsLength(actions, flattenChidrens)
    CalculateNewState(state,listActionsLength)
    UpdateBlockAction(state)  
}


function getCurrentAction(state: Istate[],targetDivElemnt: HTMLDivElement, setCurrentUction:(children: children) => void){
  console.log('targetDivElemnt 1')
  console.log(targetDivElemnt)  
  if(Object.keys(targetDivElemnt).length === 0 )
    return
  else{
    if(!targetDivElemnt.children[1])
      return 
  }
  for(let sIterator = 0; sIterator< state.length;sIterator++){
      const childrens = state[sIterator].childrens
      for(let aIterator = 0 ; aIterator < childrens.length; aIterator++){
        console.log('targetDivElemnt.children[0].textContendddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
        console.log(targetDivElemnt.children[0].textContent?.split(' ').join(''))
        if(targetDivElemnt.children[0].textContent?.split(' ').join('') === childrens[aIterator].text){
         
          setCurrentUction(childrens[aIterator])
          return
        }
      }
    }
  }