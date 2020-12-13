import { Button } from '@material-ui/core';
import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    background: #fff;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-radius: 4px;
    border-color: black;
    align-self: center;
    padding: 20px;
    width: 360px;
    margin-top: 20px;
    height: 40%;
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  background:rgb(0, 84, 132);
  margin: 0px;
`;

export const SignUpButton = styled(Button)`
  width: 120px !important;
  background-color: #005484 !important;
  color: white !important;
`;

export const SignUpText = styled.h2`
    margin: 0;
    font-size: 26px;
    color: black;
    text-align: center;
    padding: 0 20px 20px 20px;
`;
