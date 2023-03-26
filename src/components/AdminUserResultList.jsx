import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { Box, ChakraProvider, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { HeaderAdmin } from "./organizm/HeaderAdmin";
import styled from "styled-components";
import { LoginContext } from "./providers/LoginProviders";


    export const AdminUserResultList = () => {
        const { type } = useContext(LoginContext);
        const { user_id } = useParams();
        const url = `${process.env.REACT_APP_API_URL}/api/user_result/${user_id}`;
        const [adminUserResult, setadminUserResult] = useState([])
        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            console.log(res.data.results);
            setadminUserResult(res.data.results)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("adminUserResult",adminUserResult);

        if(type === 'admin'){
            return  (
                <ChakraProvider>
                    <HeaderAdmin />
                    <SContainer>
                    <Box width="95%" margin="0 auto" paddingTop={10}>
                    <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                <Tr>
                                    <Th fontSize="20px">教科名</Th>
                                    <Th fontSize="20px">参考書名</Th>
                                    <Th fontSize="20px">単元名</Th>
                                    <Th isNumeric fontSize="20px">点数</Th>
                                    {/* <Th isNumeric textAlign="left">日付</Th> */}
                                </Tr>
                                </Thead>
                    {adminUserResult.map((s) => {
                        console.log(s);
                        return (
                                <Tbody>
                                <Tr>
                                    <Td>{s.subjectName}</Td>
                                    <Td>{s.referenceBookName}</Td>
                                    <Td>{s.unitName}</Td>
                                    <Td isNumeric>{s.score}/{s.issueCount}</Td>
                                    {/* <Td isNumeric>{s.created_at}</Td> */}
                                </Tr>
                                </Tbody>
                        )})}
                        </Table>
                            </TableContainer>
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
