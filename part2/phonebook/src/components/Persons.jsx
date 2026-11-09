
const Persons = ({persons, filter, removePerson}) => {

  const filtered = () => {
    return persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  }

  const displayedPersons = filter.trim().length === 0 ? persons : filtered()

  return (
    <ul className="contact-list">
      {displayedPersons.length === 0 && (
        <li className="empty-state">{filter.trim() ? 'No contacts match your search.' : 'No contacts yet. Add your first one above.'}</li>
      )}
      {displayedPersons.map(person => (
          <li className="contact" key={person.id}>
            <div className="contact-details">
              <span className="contact-name">{person.name}</span>
              <a href={`tel:${person.number}`}>{person.number}</a>
            </div>
            <button className="delete-button" aria-label={`Delete ${person.name}`} onClick={() => removePerson(person.id)}>Delete</button>
          </li>
     ))}
    </ul>
  )
}


export default Persons