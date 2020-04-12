import styled from 'styled-components'

export const ListSpots = styled.ul`
        width:100%;
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:20px;
`
export const SpotItem = styled.li`
        display:flex;
        flex-direction:column;
        border-radius:4px;
        header{
            
            img{
                width:100%;
                height:200px;
                background-size:cover;
                border-radius:2px;
                @media screen and (width:480px) {
                    height:120px;
                }
            }
            
        }
        strong{
            margin-top:5px;
            font-size:18px;
            line-height:30px;
        }
        span{
            font-size:15px;
        }
`
export const Content = styled.div`
        max-width:600px;
        min-width:400px;
        background:#FFF;
        border-radius:4px;
        margin:30px auto 0;
        padding:40px;
        @media screen and (width:480px) {
            max-width:350px;
        }
`;
export const Info = styled.div`
    text-align:center;
    margin-top:20px;
    color:white;
    font-family:'Fira Code';
    font-size:17px;
    a{
        text-align:center;
        color:white;
     
        margin-top:-10px;
       &:hover{
            color:#000;
            transition: all .3s ease;
            border-radius:3px;
            padding:10px;
            background: #FF6978;
       }
       &:hover >svg{
           
       }
   }
`