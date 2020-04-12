import styled,{keyframes} from 'styled-components'

export const slideInLeft = keyframes`
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;
const slideOutLeft = keyframes`
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
`;
export const Div = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    margin-top:50px;
    &${props => props.enter} {
        animation: ${slideInLeft} 0.5s forwards;
    }
    h3{
       color:white;
     
       font-family:'Fira Code';
   }
`;

export const Content = styled.div`
        max-width:600px;
        background:#FFF;
        border-radius:4px;
        margin-top:30px;
        padding:40px;
    p {
        font-size:16px;
       line-height:20px;
       margin-bottom:15px;
       color:black;
   }
    form{
    display:flex;
    flex-direction:column;
    margin-bottom:20px;
   } 
   & > a{
        color:#aaa;
        font-family:'Fira';
        margin-left:40%;
       &:hover{
            color:#000;
            transition: all .3s ease;
       }
   }
  
`;
export const Input = styled.input`
height:45px;
border: 1px solid #ddd;
background:none;
padding:0 15px;
border-radius:2px;
margin:10px 0 10px 0;
`;

