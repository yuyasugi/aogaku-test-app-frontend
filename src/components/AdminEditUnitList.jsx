import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import axios from "axios";
import { ChakraProvider, Wrap, WrapItem } from "@chakra-ui/react";
import { SelectButton } from "./organizm/SelectButton";
import styled from "styled-components";
import { HeaderAdmin } from "./organizm/HeaderAdmin";
import { LoginContext } from "./providers/LoginProviders";


    export const AdminEditUnitList = () => {
        const { type } = useContext(LoginContext);
        const history = useHistory();
        const { reference_book_id } = useParams();
        const url = `${process.env.REACT_APP_API_URL}/api/edit_unit/${reference_book_id}`;
        const [adminEditUnitList, setAdminEditUnitList] = useState([])
        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            console.log(res.data.editUnit);
            setAdminEditUnitList(res.data.editUnit)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("adminEditUnitList",adminEditUnitList);

        if(type === 'admin'){
            return  (
                <ChakraProvider>
                    <HeaderAdmin />
                    <SContainer>
                        <>
                        <Wrap margin="0 auto" width="65%">
                        {adminEditUnitList.map((s) => {
                    return (
                            <WrapItem>
                                <SelectButton name={s.name} onClick={() => history.push(`/admin/edit_issue/${s.id}`)} />
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
