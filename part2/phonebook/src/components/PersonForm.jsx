const PersonForm = ({name, number, handleNameChange, handleNumbreChange, addPerson}) => (
  <form className="contact-form" onSubmit={addPerson}>
    <label>
      Name
      <input autoComplete="name" placeholder="e.g. Ada Lovelace" value={name} onChange={handleNameChange} />
    </label>
    <label>
      Phone number
      <input type="tel" autoComplete="tel" placeholder="e.g. 040 123 4567" value={number} onChange={handleNumbreChange} />
    </label>
    <button type="submit">Add contact</button>
  </form>
)

export default PersonForm
