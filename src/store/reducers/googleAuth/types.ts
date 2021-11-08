export interface Istate{
    userEmail:string
}


export enum AuthActionEnum{
    SET_EMAIL = "SET_EMAIL",
}
export interface SetUserEmail{
  type: AuthActionEnum.SET_EMAIL,
  payload: string,
  
}


export type actionType = SetUserEmail


