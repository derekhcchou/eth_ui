
import React, {useContext, useEffect} from 'react';
import {Card} from "react-bootstrap";
import {AppStateContext} from "../context/AppContext";
import {styles} from "../helpers/styles"
import {IGameInfoType} from "../helpers/types"
import {useHistory} from "react-router-dom";
import GameLobbyCard from "./GameLobbyCard";


type Props = {
};
const GameLobbyPage: React.FC<Props> = ({
}) =>{
  const history = useHistory();
  const context = useContext(AppStateContext);
  const {gameInfo, userData} = context.initAppState;

  useEffect(()=>{

  })


  return (
    <div>
      {userData.balance === 0  && 
          <Card style={styles.introCardStyle}>
              Your currently account balance is $0 ETH. Please reload to participate!
          </Card>
      }
      {gameInfo && gameInfo.map((game:IGameInfoType)=>{
          return (
                <GameLobbyCard game= {game} />
            );
          })
        }
    </div>
  )
}

export default GameLobbyPage;