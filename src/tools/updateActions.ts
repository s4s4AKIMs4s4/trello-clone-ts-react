import {Istate,children} from '../data/board'

interface props{
    state: Istate[],
    UpdateBlockAction: Function,
    targetDivElemnt: HTMLDivElement,
    setCurrentUction:(children: children) => void
}

export function  updateActionSize({targetDivElemnt,UpdateBlockAction,setCurrentUction,state}: props) {

  function getCurrentAction(){
    if(Object.keys(targetDivElemnt).length === 0 )
      return
    else{
      if(!targetDivElemnt.children[1])
        return 
    }
    for(let sIterator = 0; sIterator< state.length;sIterator++){
        const childrens = state[sIterator].childrens
        for(let aIterator = 0 ; aIterator < childrens.length; aIterator++){
          if(targetDivElemnt.children[0].textContent?.split(' ').join('') === childrens[aIterator].text?.split(' ').join('')){
            setCurrentUction(childrens[aIterator])
            return
          }
        }
      }
    }

    const getListActionsLength = () => {
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
    
    const getFlattenChildrens = () => {
      const flattenChidrens:children[] = [] as children[]
      state.forEach((block) =>{
        block.childrens.forEach((block) =>{
          flattenChidrens.push(block)
        })
      })
      return flattenChidrens
    }
    
    const CalculateNewState = () => {
      state.forEach((val,it) =>{
        const temp:children[] = [] as children[] 
        for(let i = 0; i < val.length ; i++ ){
          temp.push(listActionsLength[i])
          if(listActionsLength[i].text === 'add'){
            listActionsLength[i].y = 10000
          }
        }
    
        listActionsLength.splice(0, val.length)
        val.childrens = temp     
      })
    }



    const actions = document.querySelectorAll('.actions')
    let listActionsLength:children[] = [] as children[]
    let flattenChidrens:children[] = [] as children[]
    getCurrentAction()
    flattenChidrens = getFlattenChildrens()
    listActionsLength = getListActionsLength()
    CalculateNewState()
    UpdateBlockAction(state)  
}

