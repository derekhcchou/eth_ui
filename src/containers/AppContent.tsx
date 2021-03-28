import React, {useState, useContext, useEffect}  from "react";
import Router from "../Router";
import NavBar from "./NavBar";
import {useHistory} from "react-router-dom";
import {Container, Modal, Button} from "react-bootstrap";
import {AppStateContext} from "../context/AppContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import {styles} from "../helpers/styles";
import {IGameInfoType, IUserDataType, Init_UserData} from "../helpers/types";
import {gameListMock} from "./mockData";
import {setSessionObject,resetSessionStorage, getSessionObject} from "../context/sessionStore";
import {checkUserHasSingedIn} from "../helpers/utility"
import Footer from "./Footer"
import { isEqual } from "lodash";

const AppContent: React.FC = ({}) =>{
    // useContext
    const context = useContext(AppStateContext);
    const {userData, gameInfo} = context.initAppState;
    const hasSingedIn = checkUserHasSingedIn(userData );
    let history = useHistory();
   
     // might need to move to context cuz this value should be relied on hasSingedIn
     const [showWalletModal, setShowWalletModal] = useState(false);
     const handleShow = () => setShowWalletModal(true);
     
     const signIn = async () => {
        setShowWalletModal(false)
     }

     const handleSingOut= ()=>{
        resetSessionStorage();
        context.dispatch({
           userData:Init_UserData,
        });
        history.push("/");
     }

     const storeUserData = () => {
         const newUser: IUserDataType = {
             address:"0x1111111111",
             balance:20,
             gameList:[]
         }
         setSessionObject("userData", newUser );
         context.dispatch({
            userData:newUser,
            gameInfo:[],
         });
         setShowWalletModal(false);
         history.push("/gameLobby")
     }

     useEffect(()=>{
        if(gameInfo.length === 0 ){
            const getGameInfo:IGameInfoType[] =gameListMock;
            context.dispatch({
                gameInfo:getGameInfo,
            });
            setSessionObject("gameInfo", getGameInfo);
        }
    });

    useEffect(()=>{
        const userSession =  getSessionObject("userData") as IUserDataType;
        console.log("userData", userData);
        console.log("userSession", userSession)
        if(!isEqual(userData,userSession)){
            if(userData.gameList.length > userSession.gameList.length){
                setSessionObject("userData", userData);
                console.log("changing userData", userData)
            }
            else if(userData.gameList.length < userSession.gameList.length){
                context.dispatch({userData: userSession})
                console.log("changing userData", userSession)
            }
        }
    },[userData])

      return (
        <>
            <div style={styles.page}>
                <Container>
                    <NavBar
                        handleShow={handleShow}
                        hasSingedIn = {hasSingedIn}
                        userData = {userData}
                        handleSingOut={handleSingOut}
                    >
                    </NavBar>
                    <Router handleShow = {handleShow}/>
                    <Footer/>
                </Container>
            </div>

        {/* Wallect Connection Modal */}
            <Modal show={showWalletModal} onHide={()=>{setShowWalletModal(false)}}>
                <Modal.Header closeButton style={styles.modalStyle}>
                    <Modal.Title>Choose a wallet to connect</Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modalStyle}>
                    <Button variant="outline-dark"  onClick={storeUserData} >
                        Connect to WalletConnect :))
                    </Button>
                </Modal.Body>
                <Modal.Footer style={styles.modalStyle}>
                    <Button variant="outline-dark"  onClick={()=>{setShowWalletModal(false)}}>
                        Close
                    </Button>

                    <Button variant="outline-dark"  onClick={()=>{}}>
                        Disconnect (Mock)
                    </Button>
                </Modal.Footer >
            </Modal>
        </>
    )
}

export default AppContent;