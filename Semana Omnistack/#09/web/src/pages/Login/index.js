import React, { useState, useRef, useEffect } from 'react';

import { Content, Div,Input } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Logo from '../../components/Logo/index'
import ButtonD from '../../components/Button/index'
import Label from '../../components/Label/index'


import Message from '../../utils/message'
import api from '../../services/api'
import logo from '../../assets/logo2.png'


export default function Login({ history }) {
  const [email, setEmail] = useState('')
  const inFocus = useRef(null)

  const handleFocus = () => {
    inFocus.current.focus()
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.push('/dashboard')
    }
  }, [])

  useEffect(() => {
    handleFocus()
  }, [])



  async function handleSubmit(e) {
    e.preventDefault()
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!email) {
      Message({ message: 'preencha os campos', type: 'error' })
    } else if (!pattern.test(email)) {
      Message({ message: 'email invalido', type: 'warning' })
    } else {
      const response = await api.post('/sessions/enter', { email })
      await Message(response.data)
      const { user, type } = response.data
      if (type === 'success') {
        localStorage.setItem('user', JSON.stringify(user))
        history.push('/dashboard')
        setEmail('')
      }
     
    }
    return;
  }
  return (
    <>
      <TransitionGroup component={Div}>
        <CSSTransition
          timeout={400}
        >
          <Div>
            <img src={logo} alt="logo" />
            <Content>
              <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> na web
              </p>
              <form onSubmit={handleSubmit} >
                <Label forI="email" htmlValue="Email *" />
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Insira seu email mais top"
                  value={email}
                  onChange={e => setEmail(e.target.value.trim())}
                  ref={inFocus}
                />
                <ButtonD text="Entrar" icon={<FontAwesomeIcon icon={faSignInAlt} />} />
              </form>
              <Link to="/register"> Não tem uma conta? Crie Já !</Link>
            </Content>
          </Div>
        </CSSTransition>
      </TransitionGroup>
      <ToastContainer />
    </>
  );
}
