import OrbitDB from 'orbit-db'
import getIPFS from './ipfsInstance.js'
import getIdentityInstance from './identityInstance.js'
import { createOrbitInstance } from './pinningList/orbitInstance.js'
import checkChanges from './pinningList/checkChanges.js'
let ipfs

class Pinner {
	constructor(db) {
		this.db = db
		this.address = db.id
	}

	static async create(address) {
		try {
			if (ipfs === undefined) {
				console.log(
					'ipfs undefined when creating OrbitPinner for address',
					address
				)
				ipfs = await getIPFS()
			}
			console.log('getting or creating identity')
			this.identity = await getIdentityInstance()
			console.log('getting or creating orbitdb')
			const orbitdb = await createOrbitInstance(ipfs)

			const db = await Pinner.openDatabase(orbitdb, address)
			return Promise.resolve(new Pinner(db))
		} catch (ex) {
			console.log(
				`could not open db with address ${address} probably no data available`,
				ex
			)
			return undefined
		}
	}

	drop() {
		// console.log(this.orbitdb)
		// this.orbitdb.disconnect()
	}

	get estimatedSize() {
		let size = 0

		if (this.db) {
			// This is very crude
			size = JSON.stringify(this.db._oplog.values).length
		}

		return size
	}

	get posts() {
		let posts = 0

		if (this.db) {
			// This is very crude
			posts = this.db.all?.map((it) => { console.log(it?.payload?.value)
				return it?.payload?.value
			})
			console.log(`amount ${this.db.id}`, posts.length)
		}

		return posts
	}

	static async openDatabase(_orbitdb, address) {
		try {
			if (!OrbitDB.isValidAddress(address)) {
				console.log(`Failed to add ${address}. This is not a valid address`)
				return
			}

			console.log(
				`opening database from ${address} with id: ${this.identity.id} `
			)

			const db = await _orbitdb.open(address, {
				sync: true,
				identity: this.identity,
				accessController: { type: 'orbitdb' },
			})

			console.log('Listening for updates to the database...')

			db.events.on('ready', (dbAddress) => {
				console.log('database ready ', dbAddress)
			})

			db.events.on('replicate.progress', async (dbAddress, hash, obj) => {
				console.log('replicate.progress', dbAddress, hash)
				console.log('obj.payload', obj.payload)
				// const checkChanges = require('./pinningList/checkChanges')
				checkChanges(dbAddress, obj.payload)
			})

			await db.load()
			return db
		} catch (e) {
			console.error(e)
		}
	}
}

export default Pinner
