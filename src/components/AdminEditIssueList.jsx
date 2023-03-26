import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import axios from "axios";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { HeaderAdmin } from "./organizm/HeaderAdmin";
import styled from "styled-components";
import { LoginContext } from "./providers/LoginProviders";


    export const AdminEditIssueList = () => {
        const { type } = useContext(LoginContext);
        const history = useHistory();

        const { unit_id } = useParams();
        const url = `${process.env.REACT_APP_API_URL}/api/edit_issue/${unit_id}`;
        const [adminEditIssueList, setAdminEditIssueList] = useState([])
        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            console.log(res.data.unitIssue);
            setAdminEditIssueList(res.data.unitIssue)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("adminEditIssueList",adminEditIssueList);

        if(type === 'admin'){
            return  (
                <ChakraProvider>
                    <HeaderAdmin />
                    <SContainer>
                    <Box pt={5} width="70%" margin="0 auto" textAlign="center">
                {adminEditIssueList.map((s) => {
                    return (
                    <Box mt={7} onClick={() => history.push(`/admin/edit/${s.id}`)} bg="whiteAlpha.800" display="inline-block" width="100%" height="45px" borderRadius="30px" whiteSpace="nowrap" overflow="hidden" shadow='0 2px 5px rgba(0, 0, 0, .13)' transition='all 0.3s ease 0s' _hover={{ cursor: "pointer", boxShadow: '0 4px 20px rgba(0,0,0,0.25)', transform: 'translateY(-5px)'  }}><SSpan>{s.problem}</SSpan></Box>
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

    const SSpan = styled.p`
    font-size: 20px;
    padding-left: 15px;
    padding-top: 6px;
    `
