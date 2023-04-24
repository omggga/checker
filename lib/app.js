// my-jaeger-app.js

import moment from 'moment'
import fetch from 'node-fetch'
import { config } from 'dotenv'

config()

const WEBSITE_URL = process.env.WEBSITE_URL
const MATTERMOST_HOOK_URL = process.env.MATTERMOST_HOOK_URL
const MATTERMOST_CHANNEL_ID = process.env.MATTERMOST_CHANNEL_ID
const APP_NAME = process.env.APP_NAME


const defaults = {
	requestInterval: 2 * 60000,
    requestTimeout: 2 * 60000
}

async function fetchSiteStatus(opts){
	const options = { ...defaults, ...opts }
	await _fetchSiteStatus(options)
	return _fetchInterval(options)
}

function _fetchInterval(options){
	const interval = setInterval(async () => {
		console.log(`[${moment().format('DD.MM.YYYY HH:mm:ss')}] Checking website...`)
		await _fetchSiteStatus(options)
	}, options.requestInterval)
	return interval
}

async function _fetchSiteStatus(options) {
	const controller = new AbortController()
	const timeout = setTimeout(() => {
		controller.abort()
	}, options.requestTimeout)

	try {
		const response = await fetch(WEBSITE_URL, { signal: controller.signal })
		if (!response.ok) {
			throw new Error(`Error! [${response.status}]:${response.statusText}`)
		}
	} catch (error){
		const title = error.name === 'AbortError' ? `TIMEOUT: Приложение ${APP_NAME} недоступно!` : `ERROR: Приложение ${APP_NAME} недоступно!`

		const message = {
			channel_id: MATTERMOST_CHANNEL_ID,
			attachments: [
				{
					fallback: `[${error.code}]:${error.message}`,
					color: "#d11111",
					text: `__${title}__`,
					fields: [
						{
							short: false,
							value: "```\n[" + error.code + `]:`+ error.message + "\n```"
						}
					]
				}
			]
		}
		await sendMessage(message)
	}
}

async function sendMessage(message) {
	const response = await fetch(MATTERMOST_HOOK_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message)
	})
	if (!response.ok) {
		throw new Error(`Error! [${response.status}]:${response.statusText}`)
	}
}

export default fetchSiteStatus
