
export enum ImportantText{
  whiteSpace = 'white space'
}
export enum classes {
  deleteBlaock = 'deleteBlock',
  textToChange = 'text',
  headerBlock = 'block__header',
  action = 'action',
  block = 'block',
  closeIcon = 'closeIcon' 
}


export interface IclientMouse{
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