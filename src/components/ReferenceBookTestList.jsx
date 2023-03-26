import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import axios from "axios";
import { ChakraProvider, Wrap, WrapItem } from "@chakra-ui/react";
import { HeaderUser } from "./organizm/HeaderUser";
import { SelectButton } from "./organizm/SelectButton";
import styled from "styled-components";


    export const ReferenceBookTestList = () => {
        const history = useHistory();
        const { subject_id } = useParams();
        const url = `${process.env.REACT_APP_API_URL}/api/reference_book_test/${subject_id}`;
        const [referenceBookTestList, setreferenceBookTestList] = useState([])
        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            console.log(res.data.referenceBookTest);
            setreferenceBookTestList(res.data.referenceBookTest)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("referenceBookTestList",referenceBookTestList);

    return  (
        <ChakraProvider>
            <HeaderUser />
            <SContainer>
                <>
                <Wrap margin="0 auto" width="65%">
                {referenceBookTestList.map((s) => {
            return (
                    <WrapItem>
                        <SelectButton name={s.name} onClick={() => history.push(`/unit_test/${s.id}`)} />
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
