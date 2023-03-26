import React, { useContext } from "react";
import styled from "styled-components";

import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import GlobalNav from "./GlobalNav";


    export const Home = () => {
        const history = useHistory();

        const moveTest = () => {
            history.push('/subject_test');
        };
        const movePractice = () => {
            history.push('/subject_practice');
        };

        return(
            <ChakraProvider>
                <SContainer>
                    <SBox>
                    <Box display="inline-block" color="white" fontWeight="bold" fontSize="20px" float="right" marginRight="5%" marginTop="3%"　_hover={{ cursor: 'pointer', opacity: 0.6 }}>
                        <GlobalNav />
                        </Box>
                    <STextBox>
                    <STitle>青学コーチング</STitle>
                    <SSabTitle>テストツール</SSabTitle>
                    </STextBox>
                    <SButtonBox>
                    <Button onClick={moveTest} borderWidth='1px' shadow='lg' colorScheme='whiteAlpha' width={350} height={200} marginRight={12} fontSize={20} borderRadius={100}>
                        確認テストを受ける
                    </Button>
                    <Button onClick={movePractice} borderWidth='1px' shadow='lg' colorScheme='whiteAlpha' width={350} height={200} fontSize={20} borderRadius={100}>
                        練習問題を解く
                    </Button>
                    </SButtonBox>
                    </SBox>
                </SContainer>
            </ChakraProvider>
        )
    }

    const SContainer = styled.div`
    position: relative;
    background-image: url(https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328__480.jpg);
    background-position: center;
    height: 100vh;
    width: 100%;
    animation: fadein 2s forwards;

    @keyframes fadein {
        0% {opacity: 0}
        100% {opacity: 1}
    }
    `

    const SBox = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: rgba(1, 75, 21,0.5);
    `

    const STextBox = styled.div`
    margin-left: 15%;
    padding-top: 7%;
    `

    const SButtonBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top:7%;
    `

    const STitle = styled.h1`
    font-size: 60px;
    font-weight: 900;
    color: #FFFFFF;
    letter-spacing: 0.1em;
    `

    const SSabTitle = styled.p`
    font-size: 20px;
    font-weight:bold;
    color: #FFFFFF;
    `
