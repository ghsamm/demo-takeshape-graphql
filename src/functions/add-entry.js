import fetch from 'node-fetch'

const {TAKESHAPE_API_KEY, TAKESHAPE_PROJECT_ID} = process.env

exports.handler = async(event) => {
  const requestBody = JSON.parse(event.body)
  const body = {
    query: `
      mutation {
        createEntry(input: {
          message: 'New message',
          _enabled: false
        }) {
          clientMutationId
        }
      }
    `
  }
  
  return fetch(`https://api.takeshape.io/project/${TAKESHAPE_PROJECT_ID}/graphql`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TAKESHAPE_API_KEY}`
    }
  })
  .then(res => ({
    statusCode: res.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(requestBody)
  }))
  .catch(err => ({
    statusCode: 400,
    body: JSON.stringify(err)
  }))

}

