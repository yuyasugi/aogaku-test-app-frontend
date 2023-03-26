import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import axios from "axios";
import { ChakraProvider, Wrap, WrapItem } from "@chakra-ui/react";
import { HeaderUser } from "./organizm/HeaderUser";
import { SelectButton } from "./organizm/SelectButton";
import styled from "styled-components";


    export const UnitTestList = () => {
        const history = useHistory();
        const { reference_book_id } = useParams();
        const url = `${process.env.REACT_APP_API_URL}/api/unit_test/${reference_book_id}`;
        const [unitTestList, setunitTestList] = useState([])
        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            console.log(res.data.unitTest);
            setunitTestList(res.data.unitTest)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("unitTestList",unitTestList);

    return  (
        <ChakraProvider>
            <HeaderUser />
            <SContainer>
                <>
                <Wrap margin="0 auto" width="65%">
                {unitTestList.map((s) => {
            return (
                    <WrapItem>
                        <SelectButton name={s.name} onClick={() => history.push(`/issue_test/${s.id}`)} />
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
