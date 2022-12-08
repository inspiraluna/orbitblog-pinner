import Identities from 'orbit-db-identity-provider'
import { ethers } from 'ethers'

let identity

const getIdentityInstance = async () => {
	if (identity === undefined) {
		console.log('creating identity now')
		// identity = await Identities.createIdentity({ id: 'user' })
		const privateKey = process.env.PRIVKEY
		const wallet = new ethers.Wallet(privateKey)
		identity = await Identities.createIdentity({
			type: 'ethereum',
			wallet,
		})
	}

	return identity
}
export default getIdentityInstance
