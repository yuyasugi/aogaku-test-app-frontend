import React from "react";

import { Button } from "@chakra-ui/react";
import styled from "styled-components";

    export const SelectButton = (props) => {
        const { name, onClick } = props;
        return(
            <Button
            as='a'
            onClick={() => onClick()}
            mx='16' my='5'
            borderRadius='10px'
            borderWidth='1px'
            bg='white'
            color='black'
            width='330px'
            height='200px'
            shadow='0 2px 5px rgba(0, 0, 0, .13)'
            transition='all 0.3s ease 0s'
            _hover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25)', transform: 'translateY(-5px)' }}
            >
            <SLetter>{name}</SLetter>
            </Button>
        )
    }


    const SLetter = styled.span`
    font-size:35px;
    line-height:0.95em;
	font-weight:bold;
	color: rgba(1, 75, 21, 85%);
	text-shadow:
		0.04em 0.02em 0 #B0BEC5,
		0.08em 0.05em 0 rgba(0, 0, 0, 0.6);
    `
