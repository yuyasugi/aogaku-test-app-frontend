import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import axios from "axios";
import { ChakraProvider, Wrap, WrapItem } from "@chakra-ui/react";
import { SelectButton } from "./organizm/SelectButton";
import styled from "styled-components";
import { HeaderAdmin } from "./organizm/HeaderAdmin";
import { LoginContext } from "./providers/LoginProviders";


    export const AdminEditReferenceBookList = () => {
        const { type } = useContext(LoginContext);
        const history = useHistory();
        const { subject_id } = useParams();
        const url = `${process.env.REACT_APP_API_URL}/api/edit_reference_book/${subject_id}`;
        const [adminEditReferenceBookList, setAdminEditReferenceBookList] = useState([])
        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            console.log(res.data.editReferenceBook);
            setAdminEditReferenceBookList(res.data.editReferenceBook)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("adminEditReferenceBookList",adminEditReferenceBookList);

        if(type === 'admin'){
            return  (
                <ChakraProvider>
                    <HeaderAdmin />
                    <SContainer>
                        <>
                        <Wrap margin="0 auto" width="65%">
                        {adminEditReferenceBookList.map((s) => {
                    return (
                            <WrapItem>
                                <SelectButton name={s.name} onClick={() => history.push(`/admin/edit_unit/${s.id}`)} />
                            </WrapItem>
                            )})}
                        </Wrap>
                        </>
                    </SContainer>
                </ChakraProvider>
                )
        }
    }

    const SContainer = styled.div`
    background-color: rgba(1, 75, 21, 40%);
    width: 100%;
    `
