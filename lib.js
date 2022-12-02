const salesforceData = {
    grant_type: 'password',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    username: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
    security_token: 'YOUR_SECURITY_TOKEN',
    baseUrl: 'YOUR_DOMAIN_URL',
    apiVersion: 'YOUR_API_VERSION'
}
const loginUrl = `${salesforceData.baseUrl}/services/oauth2/token`
const settings = {
    method: "POST"
}

fetch(`${loginUrl}?grant_type=${salesforceData.grant_type}&client_id=${salesforceData.client_id}&client_secret=${salesforceData.client_secret}&username=${salesforceData.username}&password=${salesforceData.password + salesforceData.security_token}`, settings)
    .then(response => response.json())
    .then(response => getLeads(response.access_token))
    .catch(error => console.error(error))

function getLeads (access_token) {
    let query = 'SELECT Name FROM Lead LIMIT 10 OFFSET 0'
    let url = `${salesforceData.baseUrl}/services/data/v${salesforceData.apiVersion}/query/?q=${query}`
    let settings = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }

    fetch(encodeURIComponent(url), settings)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.error(error))
}