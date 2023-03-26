import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ChakraProvider, Wrap, WrapItem } from "@chakra-ui/react";
import { SelectButton } from "./organizm/SelectButton";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { HeaderAdmin } from "./organizm/HeaderAdmin";
import { LoginContext } from "./providers/LoginProviders";


    export const AdminEditSubjectList = () => {
        const { type } = useContext(LoginContext);
        const history = useHistory();
        const url = `${process.env.REACT_APP_API_URL}/api/edit_subject`;
        const [adminEditSubjectList, setAdminEditSubjectList] = useState([])
        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            console.log(res.data.editSubject);
            setAdminEditSubjectList(res.data.editSubject)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("adminEditSubjectList",adminEditSubjectList);

        if(type === 'admin'){
            return  (
                <ChakraProvider>
                    <HeaderAdmin />
                    <SContainer>
                        <>
                        <Wrap margin="0 auto" width="65%">
                        {adminEditSubjectList.map((s) => {
                    return (
                            <WrapItem>
                                <SelectButton name={s.name} onClick={() => history.push(`/admin/edit_reference_book/${s.id}`)} />
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
