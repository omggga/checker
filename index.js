import express from 'express'
import fetchSiteStatus from './lib/app.js'

const app = express()
let timer

app.get('/', (req, res) => {
	res.send('Hello, WebSiteChecker!')
})

app.get('/start', async (req, res) => {
	timer = await fetchSiteStatus()
	res.send('Starting service...')
})

app.get('/stop', (req, res) => {
	clearTimeout(timer)
	res.send('Service has been stopped.')
})

app.use((err, req, res, next) => {
	res.status(500).send('Internal Server Error')
})

const port = process.env.PORT || 3006
app.listen(port, () => {
	console.log(`Server listening on port ${port}...`)
});
