import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormControl, FormLabel, Select, Input, Button, ChakraProvider, Textarea } from "@chakra-ui/react";
import { Message } from "./organizm/Message";
import { HeaderAdmin } from "./organizm/HeaderAdmin";
import styled from "styled-components";
import { LoginContext } from "./providers/LoginProviders";


    export const AdminCreateIssue = () => {
        const { type } = useContext(LoginContext);
        const url = `${process.env.REACT_APP_API_URL}/api/create_issue`;

        const [adminCreateSubjects, setAdminCreateSubjects] = useState([])
        const [selectedSubject, setSelectedSubject] = useState("")
        const [adminCreateReferenceBooks, setAdminCreateReferenceBooks] = useState([])
        const [selectedReferenceBook, setSelectedReferenceBook] = useState("")
        const [adminCreatUnits, setAdminCreateUnits] = useState([])
        const [selectedUnit, setSelectedUnit] = useState("")


        const handleChangeSubject = (e) => {
            setSelectedSubject(e.target.value);
          }

        const handleChangeReferenceBook = (e) => {
            setSelectedReferenceBook(e.target.value);
          }
        const handleChangeUnit = (e) => {
            setSelectedUnit(e.target.value);
          }

        const [valueProblem, setValueProblem] = useState([]);
        const [valueAnser, setValueAnser] = useState([]);
        const [valueVCommentary, setValueCommentary] = useState([]);

        const handleChangeProblrm = (e) => {
            setValueProblem(e.target.value);
          }
        const handleChangeAnser = (e) => {
            setValueAnser(e.target.value);
          }
        const handleChangeCommentary = (e) => {
            setValueCommentary(e.target.value);
          }

        const { showMessage } = Message();

        const onClickAdd = async () => {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/store`,{selectedSubject,selectedReferenceBook,selectedUnit,valueProblem,valueAnser,valueVCommentary});
            console.log(res);
            showMessage({ title: "問題が追加されました", status: "success" });
            setSelectedSubject('');
            setSelectedReferenceBook('');
            setSelectedUnit('');
            setValueProblem('');
            setValueAnser('');
            setValueCommentary('');
        }

        useEffect(()=>{
            (async ()=>{
            try{
                const res = await axios.get(url);
            // console.log(res.data.createSubjects);
            setAdminCreateSubjects(res.data.createSubjects)
            setAdminCreateReferenceBooks(res.data.createReferenceBooks)
            setAdminCreateUnits(res.data.createUnits)
                return;
            }catch (e){
                return e;
            }
            })();
        },[]);

        if(type === 'admin'){
            return  (
                <ChakraProvider>
                    <HeaderAdmin />
                    <SContainer>
                        <SBox>
                        <FormControl>
                    <FormLabel pt={2}>教科</FormLabel>
                    <Select value={selectedSubject} onChange={handleChangeSubject} name="subject" placeholder='教科選択' width="30%" focusBorderColor="green.700" bg='whiteAlpha.800'>
                {adminCreateSubjects.map((s) => {
                    return (
                          <option value={s.id}>{s.name}</option>
                    )})}
                    </Select>
                    <FormLabel mt={2}>参考書</FormLabel>
                        <Select value={selectedReferenceBook} onChange={handleChangeReferenceBook} name="reference_book" placeholder='参考書選択' width="30%" focusBorderColor="green.700" bg='whiteAlpha.800'>
                {adminCreateReferenceBooks.map((s) => {
                    return (
                          <option value={s.id}>{s.name}</option>
                    )})}
                    </Select>
                    <FormLabel mt={2}>単元</FormLabel>
                        <Select value={selectedUnit} onChange={handleChangeUnit} name="unit" placeholder='単元選択' width="30%" focusBorderColor="green.700" bg='whiteAlpha.800'>
                {adminCreatUnits.map((s) => {
                    return (
                          <option value={s.id}>{s.name}</option>
                    )})}
                    </Select>
                    <FormLabel mt={3}>問題文</FormLabel>
                            <Input onChange={handleChangeProblrm} value={valueProblem} name="problem" type='text' focusBorderColor="green.700" placeholder='問題文を入力してください' bg='whiteAlpha.800' my={2} width='99%' autoComplete="off"/>
                    <FormLabel>解答</FormLabel>
                            <Input onChange={handleChangeAnser} value={valueAnser} name="anser" type='text' focusBorderColor="green.700" placeholder='解答を入力してください' bg='whiteAlpha.800' my={2} width='99%' autoComplete="off"/>
                    <FormLabel>解説</FormLabel>
                            <Textarea onChange={handleChangeCommentary} value={valueVCommentary} name="commentary" type='text' focusBorderColor="green.700" placeholder='解説を入力してください' bg='whiteAlpha.800' my={2} width='99%' height="200px" autoComplete="off"/>
                    <Button onClick={onClickAdd} mt={4} color="green.700" type="submit">
                        問題を追加する
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
