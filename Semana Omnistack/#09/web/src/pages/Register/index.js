import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'

import { Content, Div,Input } from './style'

import Logo from '../../components/Logo/index'
import ButtonD from '../../components/Button/index'
import Label from '../../components/Label/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Message from '../../utils/message'
import api from '../../services/api'

export default function Register({ history }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(true)

  const inFocus = useRef(null)

  const handleFocus = () => {
    inFocus.current.focus()
  }

  useEffect(() => {
    handleFocus()
  }, [])


  async function handleSubmit(e) {
    e.preventDefault()
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!email || !name) {
      Message({ message: 'Preencha todos os campos por favor!', type: 'error' })
    } else if (!pattern.test(email)) {
      Message({ message: 'email invalido', type: 'warning' })
    } else {
      const response = await api.post('/sessions', { name, email })
      const { user, type } = response.data
      await Message(response.data)
      if (type === 'success') {
        setTimeout(() => history.push('/'), 2000)
      }
      setEmail('')
      setName('')
    }
    return;
  }
  return (
    <>
      <TransitionGroup component={Div}>
        <CSSTransition
          timeout={300}
        >
          <Div>
             <h3>Criar Conta</h3>
            <Content>
              <p>
                Cadastre-se e aventure-se nesse <strong>mundo!</strong>
              </p>
              <form onSubmit={handleSubmit} >
                <Label ForI="name" htmlValue="Name *" />
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Insira seu nome"
                  value={name}
                  onChange={e => setName(e.target.value.trim())}
                  ref={inFocus}

                />
                <Label forI="email" htmlValue="Email *" />
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Insira seu email mais top"
                  value={email}
                  onChange={e => setEmail(e.target.value.trim())}
                />
                <ButtonD color="#FF6978" text="Criar" icon={<FontAwesomeIcon icon={faCheck} />} />
              </form>
              <Link to="/"><FontAwesomeIcon icon={faArrowLeft} /> Voltar </Link>
            </Content>
         
          </Div>
  {}
        </CSSTransition>
      </TransitionGroup>
      <ToastContainer />
    </>
  );
}
