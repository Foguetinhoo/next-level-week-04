import React from 'react';
import LabelH from './style'
// import { Container } from './styles';

export default function Label({forI,htmlValue,ele}) {
return <LabelH htmlFor={forI}>{htmlValue} <span>{ele}</span></LabelH>
}
