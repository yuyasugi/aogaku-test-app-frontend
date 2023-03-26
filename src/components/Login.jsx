import React, { useContext, useState } from "react";
import swal from "sweetalert";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from "./providers/LoginProviders";
import { Button, Card, CardBody, ChakraProvider, Input } from "@chakra-ui/react";
import styled from "styled-components";
import logo from "../assets/images/logo.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";


function Login() {
    const [isRevealPassword, setIsRevealPassword] = useState(false);

    const togglePassword = () => {
        setIsRevealPassword((prevState) => !prevState);
      }

    const { setIsLogin } = useContext(LoginContext);
    const { setType } = useContext(LoginContext);

    const history = useHistory();

    const moveRegister = () => {
        history.push('/register');
    };

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.post(`api/login`, data).then(res => {
                console.log('resStatus',res.status);
                if(res.status === 200){
                    console.log('resData', res.data);
                    setType(res.data.type);
                    if(res.data.type === 'student'){
                        history.push('/');
                    } else {
                        history.push('/admin');
                    }
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    setIsLogin(true);
                    swal("ログイン成功", res.data.message, "success");
                } else if (res.data.status === 401){
                    swal("注意", res.data.message, "warning");
                } else {
                    setLogin({...loginInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    return (
        <ChakraProvider>
            <SContainer>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-6 mx-auto">
                    <SImg>
                        <img width="400" height="400" src={logo} alt="" />
                    </SImg>
                    <Card maxW='sm'  margin="auto" marginTop={10}>
                        <CardBody>
                        <SCardHeader>
                            <h4>ログイン</h4>
                        </SCardHeader>
                        <div className="card-body">
                            <form onSubmit={loginSubmit}>
                                <div className="form-group mb-3">
                                    <label>メールアドレス</label>
                                    <Input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control" focusBorderColor="green.700" />
                                    <span>{loginInput.error_list.email}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>パスワード</label>
                                    <Input type={isRevealPassword ? 'text' : 'password'} name="password" onChange={handleInput} value={loginInput.password} className="form-control" focusBorderColor="green.700" />
                                    <span onClick={togglePassword} role="presentation" > {isRevealPassword ? (<FontAwesomeIcon icon={faEye} />) : (<FontAwesomeIcon icon={faEyeSlash} />)}</span>
                                    <span>{loginInput.error_list.password}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <Button type="submit" marginTop={3} marginRight={2} color="green.700">ログイン</Button>
                                    <Button type="submit" marginTop={3} onClick={moveRegister} marginLeft="37%" color="green.700">新規登録へ</Button>
                                </div>
                            </form>
                        </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </SContainer>
        </ChakraProvider>
    );
}

const SCardHeader = styled.div`
margin-bottom: 10px;
    }
    `

const SContainer = styled.div`
background-color: white;
height: 100vh;
`

const SImg =styled.div`
padding-left: 36%;
padding-top: 200px;
`



export default Login;
