  export interface IGameInfoType{
    gameId: number,
    gameTitle: string,
    gameQuestion: string,
    gameDestribtion:string,
    gameAnsOptions:string[],
    gameWindowStarTime: string,
    gameWindowEndTime: string, 
    gameParticipateStartTime:string,
    // gameParticipateEndTime: Date, ** this equals to gameWindowStarTime
    gameWindow: "daily"|"weekly"|"monthly"|"lifetime",
    gameProperty:string,
    gamePropertyLogoLink: string,
    numOfParticipants: number,
    totalPrice: number,
  } 

  export interface IUserGame {
    gameId:number,
    selectedAns: string,
    betPrice: number,
  }

  export interface IUserDataType{
    address: string,
    balance: number,
    gameList: IUserGame[];
  }

  export const Init_UserData: IUserDataType = {
    address:"",
    balance:0,
    gameList:[],
  };

  export interface IAppStateType{
    userData: IUserDataType,
    gameInfo: IGameInfoType[],
    selectedGame?: IGameInfoType,
  }

  export const initial_AppState: IAppStateType = {
    userData: Init_UserData,
    gameInfo:[],
  }