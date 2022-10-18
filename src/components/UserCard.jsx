import React from 'react'
import './styles/userCard.css'

const UserCard = ({ user, deleteUserById, setUpdateInfo, setFormClosed }) => {

  const handleEdit = () => {
    setFormClosed(false)
    setUpdateInfo(user)
  }

  return (
    <article className="user">
      <h2 className="user__name">
        <i className="user__icon fa-solid fa-user"></i> {`${user.first_name} ${user.last_name}`}
      </h2>
      <ul className="user__list">
        <li className="user__item">
          <span className="user__span">Email :</span>
          <div className="user__info">
            <i className="user__icon fa-solid fa-at"></i>
            {user.email}
          </div>
        </li>
        <li className="user__item">
          <span className="user__span">Birthday :</span>
          <div className="user__info">
            <i className="user__icon fa-solid fa-cake-candles"></i>
            {user.birthday}
          </div>
        </li>
      </ul>
      <footer className="user__footer">
        <button className="user__btn" onClick={() => deleteUserById(user.id)}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
        <button className="user__btn" onClick={handleEdit}>
          <i className="fa-solid fa-user-pen"></i>
        </button>
      </footer>
    </article >
  )
}

export default UserCard