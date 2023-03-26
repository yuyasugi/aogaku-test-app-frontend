import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChakraProvider, Wrap, WrapItem } from "@chakra-ui/react";
import { HeaderUser } from "./organizm/HeaderUser";
import { SelectButton } from "./organizm/SelectButton";
import styled from "styled-components";
import { useHistory } from "react-router-dom";


    export const SubjectTestList = () => {
        const history = useHistory();
        const url = `${process.env.REACT_APP_API_URL}/api/subject_test`;
        const [subjectTestList, setsubjectTestList] = useState([])
        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            console.log(res.data.subjectTest);
            setsubjectTestList(res.data.subjectTest)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("subjectTestList",subjectTestList);
    return  (
        <ChakraProvider>
            <HeaderUser />
            <SContainer>
                <>
                <Wrap margin="0 auto" width="65%">
                {subjectTestList.map((s) => {
            return (
                    <WrapItem>
                        <SelectButton name={s.name} onClick={() => history.push(`/reference_book_test/${s.id}`)} />
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
    `
