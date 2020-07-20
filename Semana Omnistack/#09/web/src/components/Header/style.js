import styled from 'styled-components'
export const HeaderS = styled.header`
    height:50px;
    display:flex;
    justify-content:space-between;
    align-items:center; 
    background:rgba(0,0,0,.5);
    h3{
    /* margin:0 50px 0 20%; */
        color:white;
    }
    img{
        height:40px;
    }
`;
export const User = styled.div`
   padding:5px 15px;
   font-size:20px;
   font-family:'Roboto';
   color:white;
   svg{
       font-size:25px;
   }
`;

export const ButtonLogout = styled.button`
   background:none;
   border:1px solid #eee;
   width: 10%;
   padding:5px 10px;
   border-radius:2px;
   cursor:pointer;
   color:white;
   font-family:'Fira Code';
   margin-right:20px;
   transition:all .4s ease-in;
   &:hover{
    background:#D80032;
   border:1px solid #D80032;
   }
   @media screen and (max-width:720px){
    padding:5px 5px;
    width:auto;
    margin-left:10px;
   }
   @media screen and (max-width:859px){
    padding:5px 10px;
    width:auto;
    margin-left:10px;
   }
`;