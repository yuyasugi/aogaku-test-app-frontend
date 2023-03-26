import React, { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { LoginContext } from './providers/LoginProviders';
import styled from "styled-components";

function GlobalNav () {
    const history = useHistory();

    const { isLogin, setIsLogin } = useContext(LoginContext);

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                swal("ログアウトしました", res.data.message, "success");
                history.push('/');
            }
        });
        setIsLogin(false);
    }

    let AuthButtons = '';

    if (isLogin){
        AuthButtons = (
            <SLi>
                <div onClick={logoutSubmit}>
                    <span className="text-white">ログアウト</span>
                </div>
            </SLi>
        );
    }

    return(
        <ul>
            {AuthButtons}
        </ul>
    )
}

const SLi = styled.li`
    list-style: none;
    `

export default GlobalNav;
