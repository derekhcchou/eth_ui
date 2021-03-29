declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }

  interface TokenFarm {
    _address: string;
    methods: any;
  }
}
  
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
    // web3: any,
    networkId: number,
    tokenAddress: string,
    tokenName: string,
    erc20: any,
    erc20Balance: string, // balance in the wallet for defined tokenName
    // dappToken: any,
    dappTokenAddress: string,
    stakingBalance: string,
    tokenFarm: TokenFarm,
    gameList: IUserGame[];
  }

  export const Init_UserData: IUserDataType = {
    address:"",
    balance:0,
    gameList:[],
    networkId: 0,
    tokenAddress: "", // defined token address (e.g. address for FAU)
    tokenName: "",
    erc20Balance: "", // balance in the wallet for defined tokenName
    dappTokenAddress: "",
    stakingBalance:"",
    // web3: {},
    erc20: {},
    //@ts-ignore
    tokenFarm: {},
    // dappToken: {},
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