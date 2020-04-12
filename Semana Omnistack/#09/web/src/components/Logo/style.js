import styled from 'styled-components'
 const AirLogo = styled.h1`
   font-family: 'Titillium Web', sans-serif;
       font-size:${props => props.size ?? 40}px;
       color:white;

   & > svg{
       margin-right:4px;
   }
`;
export default AirLogo