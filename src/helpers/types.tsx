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
    web3: any,
    networkId: number,
    tokenAddress: string,
    tokenName: string,
    erc20: any,
    erc20Balance: string, // balance in the wallet for defined tokenName
    dappToken: any,
    dappTokenAddress: string,
    tokenFarm: any,
    gameList: IUserGame[];
  }

  export const Init_UserData: IUserDataType = {
    address:"",
    balance:0,
    gameList:[],
    web3: {},
    networkId: 0,
    tokenAddress: "",
    tokenName: "",
    erc20: {},
    erc20Balance: "", // balance in the wallet for defined tokenName
    dappToken: {},
    dappTokenAddress: "",
    tokenFarm: {},
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