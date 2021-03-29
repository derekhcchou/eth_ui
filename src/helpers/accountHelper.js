import React, { Component } from "react"
import Web3 from "web3"
import DappToken from "../abis/DappToken.json"
import TokenFarm from "../abis/TokenFarm.json"
import ERC20 from "../abis/ERC20.json"

export const loadWeb3 = async () => {
  if (window.ethereum) {
    console.log("window.ethereum");
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  } else if (window.web3) {
    console.log("window.web3");
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
      window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    )
  }
}

export const loadBlockchainData = async () => {
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
  const tokenFarmData = TokenFarm.networks[networkId];
  let tokenFarm;
  if (tokenFarmData) {
    tokenFarm = new web3.eth.Contract(
      TokenFarm.abi,
      tokenFarmData.address
    )
    // need another function
    // this.updateStakingBalance()
  } else {
    console.log("TokenFarm contract not deployed to detected network.");
  }

  const accountDetails = {
    web3: web3,
    address: firstAccount,
    networkId: networkId,
    tokenAddress: tokenAddress,
    tokenName: tokenName,
    erc20: erc20,
    erc20Balance: erc20Balance,
    dappToken: dappToken,
    dappTokenAddress: dappTokenAddress,
    balance: Number(dappTokenBalance),
    tokenFarm: tokenFarm,
    gameList:[] //init
  }
  return accountDetails;
}