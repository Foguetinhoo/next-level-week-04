import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { ListSpots, SpotItem, Content, Info } from './style'

import Header from '../../components/Header/index'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonD from '../../components/Button/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import api from '../../services/api'

export default function Dashboard({ history }) {
  const [username, setUsername] = useState('')
  const [user, setUserID] = useState('')
  const [loading, setLoading] = useState(true)
  const [spotsList, setSpots] = useState([])
  const loadSpots =  async id => {
    const spotsF = await api.get('/dashboard', {
      headers: { user_id:id }
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
  },[history])


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
        <ListSpots>
          {spotsList.map(spot => (
            <SpotItem key={spot._id}>
              <header>
                <img src={spot.thumbnail_url} alt={5} />
              </header>

              <strong>{spot.company}</strong>
              <span>{spot.price ? `R$${Number(spot.price).toFixed(2)}/dia` : 'Gratuito'}</span>
            </SpotItem>
          ))}
        </ListSpots>
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
