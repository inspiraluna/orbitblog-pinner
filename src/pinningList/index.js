import OrbitDB from 'orbit-db'
import OrbitPinner from '../OrbitPinner.js'
import { createDbInstance } from './orbitInstance.js'

const pinners = {}

const createPinnerInstance = async (address) => {
	if (!OrbitDB.isValidAddress(address)) {
		console.log(`Failed to pin ${address}. This is not a valid address`)
		return
	}

	console.log(`Pinning orbitdb @ ${address}`)
	const pinner = await OrbitPinner.create(address)
	console.log('pinner created')
	pinners[address] = pinner

	return pinners[address]
}

export const getContents = async (addr) => {
	const db = await createDbInstance(addr)

	return db
		.iterator({ limit: -1 })
		.collect()
		.map((e) => e.payload.value)
}

export const getPinners = () => pinners

export const add = async (address) => {
	console.log('adding address', address)
	const db = await createDbInstance()

	if (!OrbitDB.isValidAddress(address)) {
		console.log(`Failed to add ${address}. This is not a valid address`)
		return
	}

	const addresses = await getContents()

	if (!addresses.includes(address)) {
		console.log('going to include address', address)
		await db.add(address)
		createPinnerInstance(address)

		console.log(`${address} added.`)
	} else {
		console.warn(`Attempted to add ${address}, but already present in db.`)
	}
}

const startPinning = async () => {
	const addresses = await getContents()

	if (addresses.length === 0) {
		console.log('Pinning list is empty')
	}

	addresses.map(createPinnerInstance)
}

export const remove = async (address) => {
	if (!OrbitDB.isValidAddress(address)) {
		console.log(`Failed to unpin ${address}. This is not a valid address`)
		return
	}

	if (!pinners[address]) {
		console.log(
			`Failed to unpin ${address}. Address not found in pinning list.`
		)
		return
	}

	const db = await createDbInstance()
	const dbAddresses = await getContents()

	// stop pinning
	try {
		await pinners[address].drop()
	} catch (e) {
		console.error(e)
	}
	delete pinners[address]

	// Unfortunately, since we can't remove a item from the database without it's hash
	// So we have to rebuild the data every time we remove an item.
	await db.drop()

	dbAddresses
		.filter((addr) => addr !== address)
		.forEach((existingAddress) => db.add(existingAddress))

	console.log(`${address} removed.`)
}

console.log('Pinning previously added orbitdbs: ')
startPinning()

export default  {
		add,
		getContents,
		getPinners,
		remove,
	}
