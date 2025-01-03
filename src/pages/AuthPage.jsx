import { Col, Image, Row, Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from "use-local-storage";
import {useNavigate} from "react-router-dom";

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1";
    const url = "https://03ca8921-bfcd-4efb-93b0-a182022f81d0-00-37nkmxnxsl8za.sisko.replit.dev";

    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate("/profile");
        }
    }, [authToken, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { username, password });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { username, password });
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log("Login was successful, token save");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleClose = () => setModalShow(null);

    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6} className="p-4">
                <i className="bi bi-twitter" style={{ fontSize: 50, color: "dodgerblue" }}></i>

                <p className="mt-5" style={{ fontSize: 64 }}>Happening Now</p>
                <h2 className="my-5" style={{ fontSize: 31 }}>Join Twitter Today.</h2>

                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>Create an account</Button>
                    <p style={{ fontSize: "12px" }}>
                        By signing up, you agree tio Terms of Service and Privacy Policy including Cookie Use
                    </p>

                    <p className="mt-5" style={{ fontWeight: "bold" }}>
                        Already have an account?
                    </p>
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleShowLogin}>Sign In</Button>
                </Col>
            </Col>
            <Col>
                <Modal
                    show={modalShow !== null}
                    onHide={handleClose}
                    animation={false}
                    centered>
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === 'Sign Up' ? 'Create your account' : 'Log in to your acccount'}
                        </h2>
                        <Form
                            className="d-grid gap-2 px-5"
                            onSubmit={modalShow === 'SignUp' ? handleSignUp : handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <p style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy,
                                including Cookie Use. SigmaTweets may use your contact information,
                                including your email address and phone number for purposes outlined in our Privacy Policy,
                                like keeping your account seceure and personalising our services,
                                including ads. Learn more. Others will be able to find you by email or phone number,
                                when provided, unless you choose otherwise here.
                            </p>
                            <Button className="rounded-pill" type="submit">
                                {modalShow === 'SignUp' ? 'SignUp' : 'Log in'}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    );
}