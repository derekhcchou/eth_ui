import React, { Component } from "react"
import Web3 from "web3"
import DappToken from "../abis/DappToken.json"
import TokenFarm from "../abis/TokenFarm.json"
import ERC20 from "../abis/ERC20.json"
import {IUserDataType} from "./types"

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable();
    console.log("window.ethereum enabled");
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    console.log("window.web3 new provider");
  } else {
      window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    )
  }
}

export const loadBlockchainData = async () => {
  console.log("loading blockchain data...");
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  const firstAccount = accounts[0];
  const networkId = await web3.eth.net.getId();
  // accounts[0] to get the first one
  // const tokenAddress =  "0xa36085F69e2889c224210F603D836748e7dC0088"; // where does this come from?
  const tokenAddress = "0xFab46E002BbF0b4509813474841E0716E6730136";
  const tokenName = "FAU";

  // Load DAI as the starting default Token Data
  // const daiTokenData = DaiToken.networks[networkId];
  const erc20 = new web3.eth.Contract(ERC20.abi, tokenAddress);
  const erc20Balance = await erc20.methods.balanceOf(firstAccount).call();

  // Load DappToken
  console.log("loading blockchain data: dapp token ...");
  //@ts-ignore
  const dappTokenData = DappToken.networks[networkId];
  let dappToken, dappTokenAddress, dappTokenBalance;
  if (dappTokenData) {
    dappToken = new web3.eth.Contract(
      DappToken.abi,
      dappTokenData.address
    )
    dappTokenAddress = dappTokenData.address;
    dappTokenBalance = await dappToken.methods
      .balanceOf(firstAccount)
      .call();
  } else {
    console.log("DappToken contract not deployed to detected network.");
  }


  // Load TokenFarm
  console.log("loading blockchain data: tokenFarm token ...");
  //@ts-ignore
  const tokenFarmData = TokenFarm.networks[networkId];
  let tokenFarm,stakingBalance;
  if (tokenFarmData) {
    tokenFarm = new web3.eth.Contract(
      TokenFarm.abi,
      tokenFarmData.address
    )
    // need another function
    stakingBalance = await updateStakingBalance(tokenFarm,tokenAddress, firstAccount )
  } else {
    console.log("TokenFarm contract not deployed to detected network.");
  }

  console.log("dappTokenBalance", dappTokenBalance)
  console.log("dappToken", dappToken)
  const accountDetails = {
    address: firstAccount,
    balance: Number(dappTokenBalance),
    gameList:[], //init
    networkId: networkId.toString(),
    tokenAddress: tokenAddress,
    tokenName: tokenName,
    erc20Balance: erc20Balance,
    dappTokenAddress: dappTokenAddress,
    stakingBalance: stakingBalance,
    tokenFarm: tokenFarm,
    // web3: web3,
    erc20: erc20,
     // dappToken: dappToken,
  } as IUserDataType
  return accountDetails;
}

/**
 * @param tokenFarm
 * @param tokenAddress
 * @param address
 * @returns stakingBalance as string
 */
export const updateStakingBalance = async (
    tokenFarm: any,
    tokenAddress:string, 
    account: string
  ) => {
    // const web3 = window.web3
    // const networkId = await web3.eth.net.getId()
    // const tokenFarmData = TokenFarm.networks[networkId]
    // const tokenFarm = new web3.eth.Contract(
    //   TokenFarm.abi,
    //   tokenFarmData.address
    // )
  const stakingBalance = await tokenFarm.methods
    .stakingBalance(tokenAddress, account) //account
    .call()
  return stakingBalance.toString();
}


export const stakeTokens = async (userData: IUserDataType, amount:string) => {
  const tokenFarmAddress = userData.tokenFarm._address;
  const tokenFarmMethods = userData.tokenFarm.methods;
  const convertedAmount = amount = window.web3.utils.toWei(amount, "Ether");
  userData.erc20.methods
    .approve(tokenFarmAddress, convertedAmount)
    .send({ from: userData.address})
    .on("transactionHash", (hash:any) => {
      tokenFarmMethods
        .stakeTokens(convertedAmount, userData.tokenAddress)
        .send({ from: userData.address })
        .on("transactionHash", (hash:any) => {
          console.log("Staked token successfully!");
        })
    })
};

export const unstakeTokens = async (userData: IUserDataType) => {
  const tokenFarmMethods = userData.tokenFarm.methods;
  tokenFarmMethods
    .unstakeTokens(userData.tokenAddress)
    .send({ from: userData.address })
    .on("transactionHash", (hash:any) => {
      console.log("Unstaked token successfully!");
    })
};

 // "address": "0x00D1C8c81cf4D056D3Dd4E6E9FF6aDa24A5B2cd2",