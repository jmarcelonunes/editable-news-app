import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#6e6868';
};

export const DropDiv = styled.div`
  border: 1.5px dashed #6e6868;
  border-radius: 5px;
  cursor: pointer;
  border-color: ${(props) => getColor(props)};
  width: 100%;
  height: 200px;
  padding: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  height: 100vh;
  margin: 0px;
`;

export const MainContainer = styled.div`
    display: flex;
    flex: 1;
    height: 500px;
    width: 100%;
    padding: 20px;
`;

export const PaddingContainer = styled.div`
    display: flex;
    flex: 1;
`;

export const FormContainer = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column;
    align-items: center;
    padding-right: 30px;
`;

export const Form = styled.form`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
`;

export const SubmitButton = styled(Button)`
  width: 120px !important;
  background-color: #005484 !important;
  color: white !important;
`;

export const CancelUploadButton = styled(Button)`
  width: 160px !important;
  background-color: #ff0000 !important;
  color: white !important;
  margin-left: 20px !important;
`;

export const FilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
