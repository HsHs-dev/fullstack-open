const Notification = ({message, className}) => {

  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${className}`} role="status">
      {message}
    </div>
  )

}

export default Notification