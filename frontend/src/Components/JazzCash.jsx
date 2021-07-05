import { Container, Row, Col, Button } from "react-bootstrap";
import '../css_files/jazzcash.css';
import Header from './Header';
import Footer from './Footer';
import React, { useContext, useState, useEffect } from 'react';
import { Total_Amount_Procced, Total_Amount_Cart } from './App';

import jcimg from '../img/jazzcash.png';

//Parallax
import { Parallax } from 'react-parallax';
import img1 from '../img/1112.png';

//all animations
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const JazzCash = () => {


    const { Total_Amount_Procced_State } = useContext(Total_Amount_Procced)
    const { Total_Amount_Cart_State } = useContext(Total_Amount_Cart);
    const CattleId = localStorage.getItem('CattleId');

    //Global variables
    let hashString, pp_Amount, pp_DateTime, exp_time, T_id;


    //Cattle amount
    if (Total_Amount_Cart_State === '' || Total_Amount_Cart_State === null) {

        pp_Amount = Total_Amount_Procced_State;

    } else {

        pp_Amount = Total_Amount_Cart_State;
    }


    //Today date
    const object = new Date();
    const year = object.getFullYear();
    const month = ("" + year + (object.getMonth() + 1));
    const date = ("" + month + object.getDate());
    const hours = ("" + date + object.getHours());
    const minutes = ("" + hours + object.getMinutes());
    const today = ("" + minutes + object.getSeconds());
    pp_DateTime = today;

    //Expiry date & time
    const hrs = ("" + date + (object.getHours() + 1));
    const min = ("" + hrs + object.getMinutes());
    const time = ("" + min + object.getSeconds());
    exp_time = time;

    //Transaction ID
    T_id = ('T' + exp_time);

    //useStates
    const [Hash, setHash] = useState([]);
    const [Values, setstate] = useState({

        pp_Version: '1.1',
        pp_TxnType: 'MWALLET',
        pp_Language: 'EN',
        pp_MerchantID: 'MC20918',
        pp_SubMerchantID: 'none',
        pp_Password: '22322yzaw3',
        pp_BankID: 'TBANK',
        pp_ProductID: CattleId,
        pp_Amount: pp_Amount,
        pp_TxnRefNo: T_id,
        pp_TxnCurrency: 'PKR',
        pp_TxnDateTime: pp_DateTime,
        pp_BillReference: 'billRef',
        pp_Description: 'Description of transaction',
        pp_TxnExpiryDateTime: exp_time,
        pp_ReturnURL: 'https://www.google.com/',
        pp_SecureHash: Hash,
        ppmpf_1: '1',
        ppmpf_2: '2',
        ppmpf_3: '3',
        ppmpf_4: '4',
        ppmpf_5: '5',
    })
    const [HashValueString, setHashValueString] = useState('');



    function CalculateHash() {
        var IntegritySalt = 'zx3dayg183';
        hashString = '';

        hashString = hashString + IntegritySalt + '&';

        hashString = hashString + Values.pp_Amount + '&';

        hashString = hashString + Values.pp_BankID + '&';

        hashString = hashString + Values.pp_BillReference + '&';

        hashString = hashString + Values.pp_Description + '&';

        hashString = hashString + Values.pp_Language + '&';

        hashString = hashString + Values.pp_MerchantID + '&';

        hashString = hashString + Values.pp_Password + '&';

        hashString = hashString + Values.pp_ProductID + '&';

        hashString = hashString + Values.pp_ReturnURL + '&';

        hashString = hashString + Values.pp_SubMerchantID + '&';

        hashString = hashString + Values.pp_TxnCurrency + '&';

        hashString = hashString + Values.pp_TxnDateTime + '&';

        hashString = hashString + Values.pp_TxnExpiryDateTime + '&';

        hashString = hashString + Values.pp_TxnRefNo + '&';

        hashString = hashString + Values.pp_TxnType + '&';

        hashString = hashString + Values.pp_Version + '&';

        hashString = hashString + Values.ppmpf_1 + '&';

        hashString = hashString + Values.ppmpf_2 + '&';

        hashString = hashString + Values.ppmpf_3 + '&';

        hashString = hashString + Values.ppmpf_4 + '&';

        hashString = hashString + Values.ppmpf_5 + '&';


        hashString = hashString.slice(0, -1);

        // console.log(hashString);

        setHashValueString(hashString);

    }

    const PassingSecureHash = async () => {

        //Creating Secure Hash
        await fetch('/hash', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hashString,
            })
        }).then((res) => {
            // console.log(res);
            res.json().then((data) => {
                // console.log(data);
                setHash(data);
            }).catch((err) => {
                // console.log(err);
            })
        }).catch((err) => {
            // console.log(err);
        })
    }

    // console.log(Hash);

    const submitForm = async () => {

        CalculateHash();

        // console.log(Hash);


        Values.pp_SecureHash = Hash + '';
        // console.log('string: ' + hashString);
        // console.log('hash: ' + Values.pp_SecureHash);

        document.jsform.submit();
    }



    // <script src="https://sandbox.jazzcash.com.pk/Sandbox/Scripts/hmac-sha256.js"></script>

    useEffect(() => {
        PassingSecureHash();
    }, [])

    return (
        <>
            <Header />
            <Parallax
                bgImage={img1}
                bgImageStyle={{ height: '150%', maxWidth: '170%', opacity: '0.90' }}
                blur={{ min: -1, max: 1 }}
                strength={500}
            >
            <Container fluid>
                <Row>
                    <Col className="jc-body">
                    <AnimationOnScroll delay={200} animateIn="animate__fadeIn">
                        {/* <Button variant='primary' onClick={CreatingHash}>Create Hash</Button> */}
                        <h1><img src={jcimg} /></h1>

                        <div className="jsformWrapper">
                            <form name="jsform" action="https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/">
                            <Row>
                                <div className="jsform-body2">
                                
                                <input type="hidden" name="pp_Version" defaultValue={Values.pp_Version} />
                                
                                <div className="formFielWrapper">
                                <label>pp_TxnType:</label><br />
                                <input type="text" name="pp_TxnType" defaultValue={Values.pp_TxnType} />
                                </div>
                                
                                <input type="hidden" name="pp_Language" defaultValue={Values.pp_Language} />
                                <input type="hidden" name="pp_MerchantID" defaultValue={Values.pp_MerchantID} />
                                <input type="hidden" name="pp_SubMerchantID" defaultValue={Values.pp_SubMerchantID} />
                                <input type="hidden" name="pp_Password" defaultValue={Values.pp_Password} />
                                <input type="hidden" name="pp_BankID" defaultValue={Values.pp_BankID} />
                                <input type="hidden" name="pp_ProductID" defaultValue={Values.pp_ProductID} />
                                
                                <div className="formFielWrapper">
                                    
                                    <label className="active">pp_TxnRefNo: </label>
                                    <input type="text" name="pp_TxnRefNo" id="pp_TxnRefNo" defaultValue={Values.pp_TxnRefNo} />
                                </div>

                                <div className="formFielWrapper">
                                    <label className="active">pp_Amount: </label>
                                    <input type="text" name="pp_Amount" defaultValue={Values.pp_Amount} />
                                </div>

                                <input type="hidden" name="pp_TxnCurrency" defaultValue={Values.pp_TxnCurrency} />
                                <input type="hidden" name="pp_TxnDateTime" defaultValue={Values.pp_TxnDateTime} />
                                <div className="formFielWrapper">
                                    <label className="active">pp_BillReference: </label>
                                    <input type="text" name="pp_BillReference" defaultValue={Values.pp_BillReference} />
                                </div>

                                <div className="formFielWrapper">
                                    <label className="active">pp_Description: </label>
                                    <input type="text" name="pp_Description" defaultValue={Values.pp_Description} />
                                </div>

                                <input type="hidden" name="pp_TxnExpiryDateTime" defaultValue={Values.pp_TxnExpiryDateTime} />

                                {/* <div className="formFielWrapper">
                                    <label className="active">pp_ReturnURL: </label>
                                </div> */}
                                <input type="hidden" name="pp_ReturnURL" defaultValue={Values.pp_ReturnURL} />

                                {/* <br /><label>pp_SecureHash:</label><br /> */}
                                <input type="hidden" name="pp_SecureHash" defaultValue={Values.pp_SecureHash} />

                                <input type="hidden" name="ppmpf_1" defaultValue={Values.ppmpf_1} />
                                <input type="hidden" name="ppmpf_2" defaultValue={Values.ppmpf_2} />
                                <input type="hidden" name="ppmpf_3" defaultValue={Values.ppmpf_3} />
                                <input type="hidden" name="ppmpf_4" defaultValue={Values.ppmpf_4} />
                                <input type="hidden" name="ppmpf_5" defaultValue={Values.ppmpf_5} />
                                <br />
                                <br />
                                </div>
                                </Row>
                                <Row>
                                <button type="button" onClick={submitForm} className="jsform-body">Submit</button><br />
                                </Row>
                            </form>


                            <br></br>
                            <div className="formFielWrapper">
                                {/* <label className="active">Hash values string: </label> */}
                                <input type="hidden" id="hashValuesString" defaultValue={HashValueString} />
                                <br></br>
                            </div>


                        </div>
                        </AnimationOnScroll>
                    </Col>
                </Row>
            </Container>
            </Parallax>
            <Footer />
        </>
    )
}
export default JazzCash;