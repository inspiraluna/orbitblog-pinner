import OrbitDB from 'orbit-db'
import getIPFS from '../ipfsInstance.js'
import getIdentityInstance from '../identityInstance.js'
import checkChanges from './checkChanges.js'

let orbitInstance

export const createOrbitInstance = async () => {
	// let orbitInstance
	if (orbitInstance === undefined) {
		const ipfs = await getIPFS()
		const identity = await getIdentityInstance()
		orbitInstance = await OrbitDB.createInstance(ipfs, {
			identity,
			directory: './orbitdb/pinner/Manifest',
		})
		console.log('orbitInstance is undefined - loading a new instance from ipfs')
	} else {
		console.log('re-using orbitInstance')
	}
	return orbitInstance
}

export const createDbInstance = async (addr) => {
	const address = addr || 'dbList'
	console.log('createDbInstance', address)
	const dbInstance = await createOrbitInstance()

	const identity = await getIdentityInstance()
	// console.log('identity used', identity.id)
	const pinningList = {
		create: true,
		overwrite: true,
		localOnly: false,
		type: 'feed',
	}

	if (address !== 'dbList') {
		pinningList.identity = identity
		pinningList.accessController = { type: 'orbitdb' }
	}
	// console.log('pinningList',pinningList)
	let db
	try {
		db = await dbInstance.open(address, pinningList)

		if (address !== 'dbList') {
			db.events.on('ready', (dbAddress, feedReady) => {
				console.log('database ready ', dbAddress)
			})
			db.events.on('replicate.progress', async (dbAddress, hash, obj) => {
				console.log('replicate.progress', dbAddress, hash)
				// const checkChanges = require('./checkChanges')
				console.log('checking obj', obj)
				// const checkChanges = require('../pinningList/checkChanges')
				checkChanges(dbAddress, obj.payload)
			})
		}
		await db.load()
	} catch (ex) {
		console.log('orbitInstance', ex)
	}

	return db
}

async function terminate() {
	try {
		const dbinstance = await orbitInstance
		await dbinstance.disconnect()
		process.exit(0)
	} catch (e) {
		console.log('error durring terminat', e)
		process.exit(1)
	}
}

process.on('SIGINT', async () => {
	await terminate()
})
process.on('SIGTERM', async () => {
	await terminate()
})
