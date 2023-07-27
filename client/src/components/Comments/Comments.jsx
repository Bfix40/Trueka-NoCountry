import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const Comments = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState({
    message: messages,
    recipientId: '64beeb0bc42a2683b2bd9995',
    senderId: '64bed4b3aef427b4e0f39919',
    targetItemid: '64bf22a84026d0c9d64567bd'
  })

  useEffect(() => {
    const socket = io('http://localhost:8001')

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleSendMessage = (e) => {
    e.preventDefault()
    const socket = io('http://localhost:8001')
    socket.emit('message', JSON.stringify(newMessage))
    setNewMessage({
      message: '',
      recipientId: '64beeb0bc42a2683b2bd9995',
      senderId: '64bed4b3aef427b4e0f39919',
      targetItemid: '64bf22a84026d0c9d64567bd'
    })
  }

  return (
    <div>
      <h1>Chat de Comentarios</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type='text'
          value={newMessage.message}
          onChange={(e) =>
            setNewMessage({ ...newMessage, message: e.target.value })}
        />
        <button type='submit'>Enviar</button>
      </form>
    </div>
  )
}

export default Comments
