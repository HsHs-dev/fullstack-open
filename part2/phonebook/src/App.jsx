import { useState, useEffect, useRef } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, SetNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(null)

  const messageTimeoutRef = useRef(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    SetNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => { setSearch(event.target.value)
  }

  const displayMessage = (message, classOfMessage) => {
    const messageDuration = 4000

    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current)
    }

    setMessage(message)
    setMessageClass(classOfMessage)

    messageTimeoutRef.current = setTimeout(() => {
      setMessage(null)
      setMessageClass(null)
      messageTimeoutRef.current = null
    }, messageDuration)
  }

  const addPerson = (event) => {

    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (existing.number === newNumber) {
        displayMessage(`${newName} is already added to phonebook`, 'change')
      } else if (confirm(
      `${newName} is already in the phonebook, replace the old number with a new one?`)) {
        personService
          .update(existing.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === existing.id ? returnedPerson : p))
          })
          .catch(error => {
            displayMessage(
              `information of ${newName} has already been removed from the server`,
              'error'
            )
            setPersons(persons.filter(p => p != existing))
          })
          displayMessage(`${newName} number changed`, 'change')
      }
    } else {
      personService
       .create(personObject)
       .then(newPerson => {
         setPersons(persons.concat(newPerson))
       })
       displayMessage(`Added ${newName}`, 'add')
    }

    setNewName('')
    SetNewNumber('')
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          displayMessage(
            `${person.name} has been removed`,
            'error'
          )

        })
        .catch(error => {

          displayMessage(
            `${person.name} has already being removed from the server`,
            'error'
          )

          setPersons(persons.filter(p => p.id !== id))
        })
    }
 }

  return (
    <main className="phonebook">
      <header className="page-header">
        <h1>Phonebook</h1>
        <p>Your people, a little closer.</p>
      </header>

      <Notification message={message} className={messageClass} />

      <section className="panel" aria-labelledby="add-heading">
      <h2 id="add-heading">Add a contact</h2>
        <PersonForm 
          name={newName} number={newNumber}
          handleNameChange={handleNameChange}
          handleNumbreChange={handleNumberChange}
          addPerson={addPerson}
        />
      </section>
      <section className="panel" aria-labelledby="contacts-heading">
        <h2 id="contacts-heading">Contacts <span className="count">{persons.length}</span></h2>
        <Filter search={search} handleSearchChange={handleSearchChange} />
        <Persons persons={persons} filter={search} removePerson={removePerson}/>
      </section>
    </main>
  )

}


export default App