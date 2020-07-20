import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { ListSpots, SpotItem, Content, Info } from './style'


import { Modal, Button, Carousel, CarouselItem } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import Header from '../../components/Header/index'
import ButtonD from '../../components/Button/index'
import api from '../../services/api'


export default function Dashboard({ history }) {
  const [username, setUsername] = useState('')
  const [index, setIndex] = useState(0);
  const [user, setUserID] = useState('')
  const [loading, setLoading] = useState(true)
  const [spotsList, setSpots] = useState([])

  
  const loadSpots = async id => {
    const spotsF = await api.get('/dashboard', {
      headers: { user_id: id }
    })
    setSpots(spotsF.data)
    setLoading(false)
  }

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      history.push('/')
    } else {
      const userData = JSON.parse(localStorage.getItem('user'))
      const { name, _id } = userData
      setUsername(name)
      setUserID(_id)
      loadSpots(_id)
    }
  }, [history])

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function renderList() {
    if (spotsList.length === 0) {
      return (
        <Info>
          <p> nenhum spot encontrado</p>
          <Link to="/new" >Clique aqui para adicionar um novo <FontAwesomeIcon icon={faPlus} /> </Link>
        </Info>)
    }
    return (
      <Content>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}

        >
          {spotsList.map(spot => (
            <Carousel.Item  key={spot._id}>
              <SpotItem key={spot._id}>
                <header style={{backgroundImage:`url(${spot.thumbnail_url})`}}/>
                <strong>{spot.company}</strong>
                <span>{spot.price ? `R$ ${spot.price}/dia` : 'Gratuito'}</span>
              </SpotItem>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=First slide&bg=373940"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="data:image/jpeg;base64,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"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> */}
        
        <Link to="/new">
          <ButtonD width='100%' text="Cadastrar Spot" icon={<FontAwesomeIcon icon={faPlus} />} />
        </Link>
      </Content>
    )
  }
  return (
    <>
      <Header name={username} history={history} />
      {loading ? <h1 className="loading">carregando...</h1> : renderList()}


    </>
  );
}
