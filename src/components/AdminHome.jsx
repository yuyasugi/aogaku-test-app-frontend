import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { HeaderAdmin } from "./organizm/HeaderAdmin";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { LoginContext } from "./providers/LoginProviders";


    export const AdminHome = () => {
        const { type } = useContext(LoginContext);
        console.log('type', type);
        const history = useHistory();
        const url = `${process.env.REACT_APP_API_URL}/api/admin`;
        const [adminHome, setadminHome] = useState([])
        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            console.log(res.data.users);
            setadminHome(res.data.users)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("adminHome",adminHome);

        if(type === 'admin'){
            return  (
                <ChakraProvider>
                    <HeaderAdmin />
                    <SContainer>
                    <Box width="60%" margin="0 auto" textAlign="center" paddingTop={10}>
                    {adminHome.map((s) => {
                        return (
                        <Box onClick={() => history.push(`/admin/user_result/${s.id}`)} bg="whiteAlpha.800" display="inline-block" width="40%" margin="20px" height="55px" borderRadius="30px" shadow='0 2px 5px rgba(0, 0, 0, .13)' transition='all 0.3s ease 0s' _hover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25)', transform: 'translateY(-5px)' }}><SP>{s.name}</SP></Box>
                        )})}
                    </Box>
                    </SContainer>
                </ChakraProvider>
                )
        }
    }

    const SContainer = styled.div`
    background-color: rgba(1, 75, 21, 40%);
    width: 100%;
    `

    const SP = styled.p`
    font-size: 25px;
    letter-spacing : 3px;
    margin-top: 8px;
    `
