import { IState } from '../store/reducers/block/types';

export interface IfirebaseUser{
    [id:string]:{
      email:Array<string>,
      initialState: IState[]
    }
    
  
  }
  export type firebase = Array<IfirebaseUser>
  