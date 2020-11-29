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

export const SignUpInput = styled.input`
    width: 100%;
    margin-bottom: 20px;
    height:30px;
`;

export const SignUpButton = styled.button`
    width: 100%;
    background-color:#005484;
    color: #fff;
    border-color: #367fa9;
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    margin-bottom: 10px;
`;

export const SignUpText = styled.h2`
    margin: 0;
    font-size: 20px;
    color:#666;
    text-align: center;
    padding: 0 20px 20px 20px;
`;
