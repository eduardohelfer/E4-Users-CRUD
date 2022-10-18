import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import './App.css'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'

const baseURL = 'https://crudcrud.com/api/6352a88bd948463c92627eef84090280'

// const baseURL = 'http://144.126.218.162:9000'
// const baseURL = 'https://users-crud1.herokuapp.com'

function App() {

  // to hide and show "successfully deleted record" message modal window
  const hideSuccess = useRef(true)

  // to hide "successfully deleted record" message modal window
  const okey = () => {
    hideSuccess.current = true
    getAllUsers()
  }

  // to record User`s information
  const [users, setUsers] = useState()

  // to lend info from UserCard to FormUser
  const [updateInfo, setUpdateInfo] = useState()

  // to Get all user´s records and Render
  const getAllUsers = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))

      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  // to Create a New User
  const createNewUser = data => {
    const URL = `${baseURL}/users/`
    // data.id = Math.ceil(Math.random() * 999999)  // generate an id
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => { console.log(err) })
  }

  // to Delete a User with a specific id number
  const deleteUserById = id => {
    const URL = `${baseURL}/users/${id}`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        hideSuccess.current = false
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  // to Update a specific User's information
  const updateUserById = (id, data) => {
    const URL = `${baseURL}/users/${id}`
    axios.put(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  // to hide and show FormUsers modal Form window
  const [formClosed, setFormClosed] = useState(true)

  // to show FormUsers modal Form window
  const handleFormOpen = () => {
    setUpdateInfo()
    setFormClosed(false)
  }

  return (
    <div className="App">
      <div className='App__container-title'>
        <h1 className='App__title'>A users list's membership <br />maintenance CRUD interface</h1>
        <button onClick={handleFormOpen} className='App__btn'>Create a New User</button>
      </div>


      <div className={`deleteSuccess ${hideSuccess.current ? 'hideSuccess' : ''}`}>
        <div className='deleteSuccess__form'>
          <h2>This record was deleted sucessfully</h2>
          <button onClick={okey} className='deleteSucess__ok'>OK</button>
        </div>
      </div>


      <div className={`form-container ${formClosed ? 'disable__form' : ''}`}>
        <FormUsers
          createNewUser={createNewUser}
          updateInfo={updateInfo}
          updateUserById={updateUserById}
          setUpdateInfo={setUpdateInfo}
          setFormClosed={setFormClosed}
        />
      </div>
      <div className="users__container">
        {
          users?.map(user => (
            <UserCard
              key={user._id}
              user={user}
              deleteUserById={deleteUserById}
              setUpdateInfo={setUpdateInfo}
              setFormClosed={setFormClosed}
            />
          ))
        }
      </div>

    </div >
  )
}

export default App
