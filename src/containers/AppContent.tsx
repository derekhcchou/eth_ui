import React, {useState, useContext, useEffect}  from "react";
import Router from "../Router";
import NavBar from "./NavBar";
import {useHistory} from "react-router-dom";
import {Container, Modal, Button, Spinner} from "react-bootstrap";
import {AppStateContext} from "../context/AppContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import {styles} from "../helpers/styles";
import {IGameInfoType, IUserDataType, Init_UserData} from "../helpers/types";
import {gameListMock} from "./mockData";
import {setSessionObject,resetSessionStorage, getSessionObject} from "../context/sessionStore";
import {checkUserHasSingedIn} from "../helpers/utility"
import Footer from "./Footer"
import { isArray } from "lodash";
import {loadWeb3, loadBlockchainData} from "../helpers/accountHelper"

const AppContent: React.FC = ({}) =>{
    // useContext
    const context = useContext(AppStateContext);
    const {userData} = context.initAppState;
    let history = useHistory();

     // might need to move to context cuz this value should be relied on hasSingedIn
     const [isLoadingAccount, setLoadingAccount] = useState(false);
     const [showWalletModal, setShowWalletModal] = useState(false);
     const handleShow = () => setShowWalletModal(true);
     const hasSingedIn = checkUserHasSingedIn(userData );
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

     const storeUserData = async () => {
        setLoadingAccount(true);
        await loadWeb3();
        const accountDetails = await loadBlockchainData();
        const gameInfo=[];
        console.log("accountDetails",accountDetails);
        context.dispatch({
            userData:accountDetails,
        })
        history.push("/gameLobby");
        setShowWalletModal(false);
        setSessionObject("userData", accountDetails);
        setLoadingAccount(false);
     }

    useEffect(()=>{
        const sessionGameInfo = getSessionObject("gameInfo")
        if(!!!sessionGameInfo || (isArray(sessionGameInfo) && sessionGameInfo.length ===0)){
            const getGameInfo:IGameInfoType[] =gameListMock;
            context.dispatch({
                gameInfo:getGameInfo,
            });
            setSessionObject("gameInfo", getGameInfo);
          }
    });
  

    // useEffect(()=>{
    //     const userSession =  getSessionObject("userData") as IUserDataType;
    //     if(!isEqual(userData,userSession)){
    //         if(userData.gameList.length > userSession.gameList.length){
    //             setSessionObject("userData", userData);
    //             console.log("changing userData", userData)
    //         }
    //         else if(userData.gameList.length < userSession.gameList.length){
    //             context.dispatch({userData: userSession})
    //             console.log("changing userData", userSession)
    //         }
    //     }
    // },[userData])

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
                        {isLoadingAccount ? 
                            <Spinner animation="grow" variant="info" />
                            :
                            <>
                                <Button variant="outline-dark"  onClick={storeUserData} > MetaMask </Button>
                            </>
                        }
                        </Modal.Body>
                        <Modal.Footer style={styles.modalStyle}>
                            <Button variant="outline-dark"  onClick={()=>{setShowWalletModal(false)}} disabled={isLoadingAccount}>
                                Close
                            </Button>
                            <Button variant="outline-dark"  onClick={()=>{}} disabled={isLoadingAccount}>
                                Disconnect (Mock)
                            </Button>
                        </Modal.Footer >
            </Modal>
        </>
    )
}

export default AppContent;