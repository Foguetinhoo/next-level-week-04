import React from 'react';

 import ButtonP from './style';

export default function ButtonD({color,text,icon, width}) {
return <ButtonP  width={width} color={color}>{text} {icon}</ButtonP>
}
