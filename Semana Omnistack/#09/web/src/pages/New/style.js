import styled,{keyframes} from 'styled-components'
const slideInRight = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;
export const Content = styled.div `
    max-width:500px;
    min-width:400px;
    background:#FFF;
    border-radius:4px;
    margin:30px auto 0;
    padding:30px;
    &${props => props.enter} {
        animation: ${slideInRight} 0.6s linear;
    }
        form{
            display:flex;
            flex-direction:column;
            label#file_t{
                margin-bottom:20px;
                border:1px dashed #ddd;
                cursor:pointer;
                background:cover;
                height:160px;
                
                display:flex;
                justify-content:center;
                align-content:center;

            }
            label#file_t input{
                display:none;
            }
            label#file_t img{
                width:35px;
            }
            label#file_t.has-thumb{
                border:none;
                border-radius:4px;
            }
            label#file_t.has-thumb img{
                display:none;
            }
        
        }      
        @media screen and (width:480px) {
            max-width:350px;
        }
       
        
        
`;
export const Input = styled.input `
    height:45px;
    border: 1px solid #ddd;
    background:none;
    padding:0 15px;
    border-radius:2px;
    margin-bottom:15px;
`;
