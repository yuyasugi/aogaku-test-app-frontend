import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"
import axios from "axios";
import { Message } from "./organizm/Message";
import { Button, ChakraProvider, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { HeaderAdmin } from "./organizm/HeaderAdmin";
import styled from "styled-components";
import { LoginContext } from "./providers/LoginProviders";


    export const AdminEditProblem = () => {
        const { type } = useContext(LoginContext);
        const { id } = useParams();
        const url = `${process.env.REACT_APP_API_URL}/api/edit/${id}`;
        const [adminEditProblem, setAdminEditProblem] = useState([])

        const [editProblem, setEditProblem] = useState("")
        const [editAnser, setEditAnser] = useState("")
        const [editCommentary, setEditCommentary] = useState("")

        const handleChangeProblrm = (e) => {
            setEditProblem(e.target.value);
          }
        const handleChangeAnser = (e) => {
            setEditAnser(e.target.value);
          }
        const handleChangeCommentary = (e) => {
            setEditCommentary(e.target.value);
          }

        const history = useHistory();
        const { showMessage } = Message();

        const onClickEdit = async () => {
            console.log({editProblem, editAnser, editCommentary, id});
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/update`,{editProblem, editAnser, editCommentary, id});
            console.log(res);
            showMessage({ title: "編集が完了しました", status: "success" });
        }

        const onClickDestroy = async () => {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/destroy`,{id});
            console.log(res);
            history.push(`/admin/edit_issue/${adminEditProblem.unit_id}`);
        }

        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            setAdminEditProblem(res.data.issue)
            setEditProblem(
                res.data.issue.problem
            )
            setEditAnser(
                res.data.issue.anser
            )
            setEditCommentary(
                res.data.issue.commentary
            )
            }catch (e){
                return e;
            }
            })();
        },[]);
        console.log("adminEditProblem",adminEditProblem);

        if(type === 'admin'){
            return  (
                <ChakraProvider>
                    <HeaderAdmin />
                    <SContainer>
                        <SBox>
                        <FormControl>
                    <FormLabel pt={5}>問題文</FormLabel>
                    <Input defaultValue={adminEditProblem.problem} onChange={handleChangeProblrm} type='text' focusBorderColor="green.700" bg='whiteAlpha.800' my={2} width='99%' autoComplete="off"/>
                    <FormLabel>解答</FormLabel>
                    <Input defaultValue={adminEditProblem.anser} onChange={handleChangeAnser} type='text' focusBorderColor="green.700" bg='whiteAlpha.800' my={2} width='99%' autoComplete="off"/>
                    <FormLabel>解説</FormLabel>
                    <Textarea defaultValue={adminEditProblem.commentary} onChange={handleChangeCommentary} type='text' focusBorderColor="green.700" bg='whiteAlpha.800' my={2} width='99%' autoComplete="off" pt={6} height="400px" />
                    <Button onClick={onClickEdit} mt={4} color="green.700" type="submit" marginRight={2}>
                        問題を編集する
                    </Button>
                    <Button onClick={onClickDestroy} mt={4} color="green.700" type="submit">
                        問題を削除する
                    </Button>
                    </FormControl>
                        </SBox>
                    </SContainer>
                </ChakraProvider>
                )
        }
    }

    const SContainer = styled.div`
    background-color: rgba(1, 75, 21, 40%);
    width: 100%;
    `

    const SBox = styled.div`
    width: 95%;
    margin:0 auto;
    `
