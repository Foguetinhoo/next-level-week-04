import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAirbnb } from '@fortawesome/free-brands-svg-icons'
import AirLogo from './style'
// import { Container } from './styles';

export default function Logo({size}) {
  return (
      <AirLogo size={size}>
          <FontAwesomeIcon icon={faAirbnb} />Aircnc
      </AirLogo>
    )
}
