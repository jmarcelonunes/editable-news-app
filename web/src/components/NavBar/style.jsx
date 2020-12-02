import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 50px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #367fa9;
    margin-bottom: 30px;
`;

export const NavItem = styled(Link)`
    height: 100%;
    border-style: solid;
    border-width: 0px;
    border-right-width: 2px;
    border-right-color: #005484;
    color: white;
    padding: 20px;
    text-decoration: none;
    display: flex;
    align-items: center;
`;

export const LogoutButton = styled.button`
    width: 80px;
    justify-self: flex-end;
    background-color: transparent;
    border-style: solid;
    height: 100%;
    color: white;
    border-top-width: 0px;
    border-bottom-width: 0px;
    border-right-width: 0px;
    border-color: #005484;
`;
