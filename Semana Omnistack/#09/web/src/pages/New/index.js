import React, { useEffect, useState, useMemo } from 'react';

import { Content, Input } from './style'

import Header from '../../components/Header/index'
import Label from '../../components/Label/index'
import Button from '../../components/Button/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ToastContainer } from 'react-toastify';

import Camera from '../../assets/camera-digital.svg'

import Message from '../../utils/message'
import api from "../../services/api";

export default function New({ history }) {
  const [username, setUsername] = useState('')
  const [user, setUserId] = useState('')
  const [company, setCompany] = useState('')
  const [technologys, setTechs] = useState('')
  const [price, setPrice] = useState('')
  const [thumbnail, setThumbnail] = useState(null)

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      history.push('/')
    } else {
      const user = JSON.parse(localStorage.getItem('user'))
      const { name, _id } = user
      setUsername(name)
      setUserId(_id)
    }
  }, [])


 async function handleSubmit(event) {
    event.preventDefault()
    if (!company || !technologys) {
     Message({message:'Preencha os campos corretamente',type:'error'})
    } 
    else if(!thumbnail){
      Message({message:'Uma imagem é obrigatória',type:'error'})
    }else{
      const data = new FormData()
      data.append('thumbnail',thumbnail)
      data.append('company',company)
      data.append('price',price)
      data.append('technologys',technologys)
  
      const response  = await api.post('/spots',data,{
        headers:{
          user_id:user
        }
      })
      
      await Message(response.data)
    
      const {type} = response.data
      if(type === 'success'){
          setCompany('')
          setPrice('')
          setTechs('')
          setThumbnail(null)
          setTimeout(()=> history.push('/dashboard'), 1500)
      }
    }
  }
  return (
    <>
      <Header name={username} history={history} />
      <TransitionGroup component={null}>
        <CSSTransition
          timeout={300}
        >
          <Content>
            {}
            <form onSubmit={handleSubmit}>
              <label
                id="file_t"
                className={thumbnail ? 'has-thumb' : ''}
                style={{ backgroundImage: `url(${preview})` }}>

                <Input
                  type="file"
                  name="thumbnail"
                  onChange={event => setThumbnail(event.target.files[0])} />
                <img src={Camera} alt="foto" />
              </label>
              <Label ForI="company" htmlValue="EMPRESA *" />
              <Input
                type="text"
                id="company"
                name="company"
                placeholder="Sua empresa foda"
                value={company}
                onChange={event => setCompany(event.target.value.trim())}
              />

              <Label forI="techs" htmlValue="TECNOLOGIAS" ele="(separadas por virgula)" />
              <Input
                type="text"
                id="techs"
                name="techs"
                placeholder="Tecnologias usadas "
                value={technologys}
                onChange={event => setTechs(event.target.value.trim())}
              />
              <Label ForI="price" htmlValue="VALOR DA DIÁRIA" ele="(em branco caso seja GRATUITO)" />
              <Input
                type="text"
                id="price"
                name="price"
                placeholder=" Preço da diária"
                value={price}
                onChange={event => setPrice(event.target.value.trim())}
              />

              <Button type="submit" text="Cadastrar" icon={<FontAwesomeIcon icon={faCheck} />} />
            </form>
          </Content>
        </CSSTransition>
      </TransitionGroup>
      <ToastContainer />
    </>
  );
}
