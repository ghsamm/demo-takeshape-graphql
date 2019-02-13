document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  const input = document.querySelector('#message')
  
  const API_URL = 'https://musing-kare-d8cc74.netlify.com/.netlify/functions/add-entry'

  let processing = false

  form.addEventListener('submit', event => {
    event.preventDefault()

    if(processing)
      return
    
    processing = true
   
    fetch(
      API_URL,
      {
        method: 'POST',
        body: JSON.stringify({message: input.value})
      }
    )
    .then(() => {
      document.querySelector('#success-message').style.display = 'block'
      document.querySelector('#message').style.display = 'none'
      processing = false
    })
    .catch(() => {
      processing = false
    })
  })
})
