import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './styles/formUsers.css'

const defaultValues = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  birthday: ''
}

const FormUsers = ({ createNewUser, updateInfo, updateUserById, setUpdateInfo, setFormClosed }) => {

  const { handleSubmit, reset, register } = useForm()

  useEffect(() => {
    if (updateInfo) {
      reset(updateInfo)
    }
  }, [updateInfo])

  const submit = data => {
    if (updateInfo) {
      updateUserById(updateInfo.id, data)
      setUpdateInfo()
    } else {
      createNewUser(data)
    }
    reset(defaultValues)
    setFormClosed(true)
  }


  const [type, setType] = useState('text')

  const handleCloseForm = () => {
    setUpdateInfo()
    reset(defaultValues)
    setFormClosed(true)
  }

  return (
    <form className='form' onSubmit={handleSubmit(submit)} autoComplete="none">
      <i onClick={handleCloseForm} className="form__xmark fa-solid fa-xmark"></i>
      <h2 className='form__title'>{updateInfo ? `Edit User` : `New User`}</h2>
      <div className='form__div'><label className='form__label' htmlFor="email">Email </label>
        <input className='form__input' placeholder='Your Best Email Here' type="email" id="email" autoComplete="none" {...register('email')} />
      </div>
      <div className='form__div'><label className='form__label' htmlFor="password">Password </label>
        <input className='form__input' placeholder='A Secret Password' type="password" id="password" autoComplete="none" {...register('password')} />
      </div>
      <div className='form__div'><label className='form__label' htmlFor="first_name">Fisrt Name </label>
        <input className='form__input' placeholder='Your name ...' type="text" id="first_name" autoComplete="none" {...register('first_name')} />
      </div>
      <div className='form__div'><label className='form__label' htmlFor="last_name">Last Name </label>
        <input className='form__input' placeholder='Your last name ...' type="text" id="last_name" autoComplete="none" {...register('last_name')} />
      </div>
      <div className='form__div'><label className='form__label' htmlFor="birthday">Birthday </label>
        <input className='form__input' type={type} onBlurCapture={() => setType('text')} onFocus={() => setType('date')} placeholder='And your Birthday' id="birthday" autoComplete="off" {...register('birthday')} />
      </div>
      <button className='form__btn'>{updateInfo ? `Update` : `Create`}</button>
    </form>
  )
}

export default FormUsers