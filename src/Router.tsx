import React from 'react';
import {Helmet} from "react-helmet";
import {Route, Switch} from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import PersonalPage from "./containers/PersonalPage";
import GameLobbyPage from "./containers/GameLobbyPage";
import GameRoomPage from "./containers/GameRoomPage"

const appName = "Gamble"
let pageMap = [
    {
        component: PersonalPage,
        path:"/personalPage",
        tabTitle: `Personal Page | ${appName}`
    },
    {
        component: GameLobbyPage,
        path:"/gameLobby",
        tabTitle: `Pick a Crypto Game | ${appName}`
    },
    {
        component: GameRoomPage,
        path:"/gameRoom",
        tabTitle: `Place Your Estimation!| ${appName}`
    },
    {
        component: LandingPage,
        path:"/",
        tabTitle: `Learn Crypto with Us | ${appName}`
    },
]

type Props = {
    handleShow: any,
}

const Router: React.FC<Props> = ({handleShow}) =>{
    return (
        <Switch>
            {pageMap.map((pageObj:any)=>{
                let PageMapObj = pageObj.component;
                return (
                    <Route 
                        key={pageObj.path}
                        path={pageObj.path}
                        // @ts-ignore
                        render = {()=>{
                            return(
                                <>
                                    <Helmet><title>{pageObj.tabTitle}</title></Helmet>
                                    {pageObj.path ==="/" ? <PageMapObj handleShow={handleShow}/>:<PageMapObj/>}
                                </>
                            )
                        }}
                    />
                )
            })}
        </Switch>
    )
}

export default Router;