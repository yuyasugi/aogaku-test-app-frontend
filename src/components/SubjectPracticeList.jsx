import React, { useEffect, useState } from "react";
import axios from "axios";

import { HeaderUser } from "./organizm/HeaderUser";
import { ChakraProvider, Wrap, WrapItem } from "@chakra-ui/react";
import styled from "styled-components";
import { SelectButton } from "./organizm/SelectButton";
import { useHistory } from "react-router-dom";


    export const SubjectPracticeList = () => {
        const history = useHistory();
        const url = `${process.env.REACT_APP_API_URL}/api/subject_practice`;
        const [subjectPracticeList, setSubjectPracticeList] = useState([])
        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            console.log(res.data.subjectPractice);
        setSubjectPracticeList(res.data.subjectPractice)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("subjectPracticeList",subjectPracticeList);
    return  (
        <ChakraProvider>
            <HeaderUser />
            <SContainer>
                <>
                <Wrap margin="0 auto" width="65%">
                {subjectPracticeList.map((s) => {
            return (
                    <WrapItem>
                        <SelectButton name={s.name} onClick={() => history.push(`/reference_book_practice/${s.id}`)} />
                    </WrapItem>
                    )})}
                </Wrap>
                </>
            </SContainer>
        </ChakraProvider>
        )
    }


    const SContainer = styled.div`
    background-color: rgba(1, 75, 21, 40%);
    width: 100%;
    display: flex;
    `
