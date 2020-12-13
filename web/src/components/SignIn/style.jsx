import { Button } from '@material-ui/core';
import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const LoginForm = styled.form`
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
    height: 50% !important;
`;

export const Background = styled.div`
  flex: 1;
  background:rgb(0, 84, 132);
  background-size: cover;
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  background:rgb(0, 84, 132);
  margin: 0px;
`;

export const LoginButton = styled(Button)`
  width: 120px !important;
  background-color: #005484 !important;
  color: white !important;
`;

export const LoginText = styled.h2`
    margin: 0;
    font-size: 26px;
    color: black;
    text-align: center;
    padding: 0 20px 20px 20px;
`;

export const SignUpLink = styled.p`
    color: #3c8dbc;
`;
