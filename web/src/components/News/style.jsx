import { Button } from '@material-ui/core';
import styled from 'styled-components';

export const MainContentContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const CenterContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const NewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #005484;
    padding-bottom: 20px;
`;

export const ImageContainer = styled.div`
    margin-bottom: 20px;
    height: 400px;
    background-repeat: no-repeat;
    background-size: contain;
`;

export const DeleteButton = styled(Button)`
  background-color: #ff0000 !important;
  color: white !important;
  float: right !important;
`;

export const EditButton = styled(Button)`
  background-color: lightgray !important;
  float: right !important;
  margin-right: 20px !important;
`;
