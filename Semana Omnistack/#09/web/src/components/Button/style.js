import styled from 'styled-components'
const ButtonD = styled.button`
    height:45px;
    border-radius:2px;
    border: 0;
    background: ${props => props.color ?? '#FF6978'};
    color:white;
    font-size:15px;
    width:${props => props.width};
    &:hover {
     opacity:.855; 
     transition:all .4s ease;
    }
    &:disabled{
        cursor:not-allowed;
        background:#ddd;
    }
`;
export default ButtonD