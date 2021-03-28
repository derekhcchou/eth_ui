
import React, {useState, useContext, useEffect} from 'react';
import {AppStateContext} from "../context/AppContext";
import {Card, Container, Row, Col, Button, Modal} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom"
import {gameRuleMap} from "../helpers/contentMap";
import {styles} from "../helpers/styles";
import {IGameInfoType, IUserGame} from "../helpers/types";
import {numberWithCommas, priceFormatter, countDownTimer} from "../helpers/utility";
import {isArray, isNumber} from "lodash";

const PersonalPage: React.FC<{}>=({})=>{
    
    // Reload Modal
    const [showReloadModal, setShowReloadModal] = useState<boolean>(false);
    const [reloadValue, setReloadValue] = useState<string>("");
    const [reloadWarningMsg, setReloadWarningMsg] = useState<string>("");
    const [isReloadBtmDisabled, setReloadBtmDisabled] = useState<boolean>(true);
    
    const context = React.useContext(AppStateContext);
    const {userData} = context.initAppState;

    const validateReloadValue = (value:string) =>{
        setReloadBtmDisabled(true);
        setReloadValue(value);

        if(isNumber(Number(value)) && Number(value)>0){
            if(Number(value) === 0){
                // setReloadWarningMsg("You don't have enough balance. Please lower your bet or reload the balance.");
            }else{
                setReloadBtmDisabled(false);
            }
        }else{ 
            setReloadWarningMsg("Please enter a valid reload price");
        }
    }
    
    const submitReloadValue = () =>{
        // we should send this back and retrieve the latest data from contract storage
        let newUserData = userData;
        newUserData.balance = userData.balance + Number(reloadValue);
        context.dispatch({
            userData: newUserData
        })
        setShowReloadModal(false);
    }

    useEffect(()=>{
        if(showReloadModal){
            setReloadValue("");
            setReloadWarningMsg("");
        }
    },[showReloadModal]);

    return (
        <>
      <div>
          {/* Account Balance Section */}
        <Card style={styles.introCardStyle}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={3}>
                        <Card.Title>Account Balance: </Card.Title>
                        <Card.Subtitle> {priceFormatter(userData.balance)} ETH </Card.Subtitle>
                        <Card.Body>
                            <a href="#" onClick={()=>{setShowReloadModal(true)}}>Reload Now!</a>
                        </Card.Body>
                        </Col>
                    </Row>
                </Container>
            </Card>

        {/* NFT Section */}
        <Card style={styles.introCardStyle}>
            <Card.Title>NFT Section</Card.Title>
            <Card.Subtitle>  </Card.Subtitle>
            <Card.Body>
                NFT <br />
                NFT <br />
                NFT <br />
                NFT <br />
                NFT <br />
            </Card.Body>
        </Card>

        {/* Participating Game */}
        <Card style={styles.introCardStyle}>
            <Card.Title>Participating Game </Card.Title>
                <Card.Subtitle> Participating Game </Card.Subtitle>
                <Card.Body>
                    Game 1 <br />
                    Game 2 <br />
                    Game 3 <br />
                    Game 4 <br />
                    Game 5 <br />
                </Card.Body>
            </Card>

        {/* Participation History */}
        <Card style={styles.introCardStyle}>
            <Card.Title>Participation History </Card.Title>
                <Card.Subtitle> Participation History </Card.Subtitle>
                <Card.Body>
                    Game 1 <br />
                    Game 2 <br />
                    Game 3 <br />
                    Game 4 <br />
                    Game 5 <br />
                </Card.Body>
            </Card>
      </div>
  
      <Modal show={showReloadModal} onHide={()=>{setShowReloadModal(false)}}>
          <Modal.Header closeButton style={styles.modalStyle}>
              <Modal.Title>Reload your account!</Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalStyle}>
              <label>How much would you like to reload? </label><br />
              <label>Your current account balance is {priceFormatter(userData.balance)} ETH</label><br />
              <input 
                  value={reloadValue} 
                  onChange={
                      (e)=>{
                        setReloadWarningMsg("");
                        validateReloadValue(e.target.value);
                      }
                  } /><br />
              {reloadWarningMsg && `Warning: ${reloadWarningMsg}`}
          </Modal.Body>
          <Modal.Footer style={styles.modalStyle}>
              <Button variant="outline-dark"  onClick={()=>{setShowReloadModal(false)}}>
                  Cancel
              </Button>
              <Button variant="outline-dark" onClick={submitReloadValue} disabled={isReloadBtmDisabled}>
                  Confirm
              </Button>
          </Modal.Footer >
      </Modal>
      </>
    )
}

export default PersonalPage;
