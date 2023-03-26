import React from "react";

import { Box, ChakraProvider } from "@chakra-ui/react";
import GlobalNav from "../GlobalNav";
import { useHistory } from "react-router-dom";

    export const HeaderAdmin = () => {
        const history = useHistory();
        const moveCreateIssue = () => {
            history.push('/admin/create_issue');
        };

        const moveEditIssue = () => {
            history.push('/admin/edit_subject');
        };

        const moveAdminHome = () => {
            history.push('/admin');
        };

        return(
            <ChakraProvider>
                <Box bg='rgba(1, 75, 21, 85%)' w='100%' p={4} color='white' fontWeight={"bold"} display="flex">
                    {/* ここは画像を挿入したい */}
                    青学コーチング
                    <Box _hover={{ cursor: "pointer", color: "grey" }} onClick={moveCreateIssue} marginLeft="55%">
                        問題作成画面へ
                    </Box>
                    <Box _hover={{ cursor: "pointer", color: "grey" }} onClick={moveEditIssue} marginLeft="2%">
                        問題編集画面へ
                    </Box>
                    <Box _hover={{ cursor: "pointer", color: "grey" }} onClick={moveAdminHome} marginLeft="2%">
                        生徒一覧画面へ
                    </Box>
                    <Box _hover={{ cursor: "pointer", color: "grey" }} marginLeft="2%">
                        <GlobalNav />
                    </Box>
                </Box>
            </ChakraProvider>
        )
    }
