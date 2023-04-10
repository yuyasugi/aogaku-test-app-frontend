import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, ChakraProvider, Input } from "@chakra-ui/react";
import styled from "styled-components";
import logo from "../assets/images/logo.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function Register() {
    const history = useHistory();

    const moveLogin = () => {
        history.push('/login');
    };

    const [isRevealPassword, setIsRevealPassword] = useState(false);

    const togglePassword = () => {
        setIsRevealPassword((prevState) => !prevState);
      }

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    history.pushState('/')
                } else {
                    setRegister({...registerInput, error_list: res.data.validation_errors});
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
                    <div className="card-header">
                        <h4>新規登録</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={registerSubmit}>
                            <div className="form-group mb-3">
                                <label>名前</label>
                                <Input type="" name="name" onChange={handleInput} value={registerInput.name} className="form-control" focusBorderColor="green.700" />
                                <span>{registerInput.error_list.name}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>メールアドレス</label>
                                <Input type="" name="email" onChange={handleInput} value={registerInput.email} className="form-control" focusBorderColor="green.700" />
                                <span>{registerInput.error_list.email}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>パスワード</label>
                                <Input type={isRevealPassword ? 'text' : 'password'} name="password" onChange={handleInput} value={registerInput.password} className="form-control" focusBorderColor="green.700" placeholder="8文字以上、半角英数で設定してください。" />
                                <span onClick={togglePassword} role="presentation" > {isRevealPassword ? (<FontAwesomeIcon icon={faEye} />) : (<FontAwesomeIcon icon={faEyeSlash} />)}</span>
                                <span>{registerInput.error_list.password}</span>
                            </div>
                            <div className="form-group mb-3">
                                <Button type="submit" marginTop={3} marginRight={2} color="green.700">新規登録</Button>
                                <Button type="submit" marginTop={3} onClick={moveLogin} marginLeft="37%" color="green.700">ログインへ</Button>
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

const SContainer = styled.div`
background-color: white;
height: 100vh;
`

const SImg =styled.div`
padding-left: 36%;
padding-top: 200px;
`

export default Register
