import config from '../config/index.js'
import { create } from 'ipfs'
let ipfsInstance

const getIPFS = async () => {
	console.log('getIPFS')
	if (ipfsInstance === undefined) {
		console.log('ipfsInstance is undefined creating new')
		ipfsInstance = await create(config)
		const peers = await ipfsInstance.swarm.peers()
		console.log('peers',peers)
		ipfsInstance.libp2p.on('peer:connect', peerInfo => console.log(peerInfo))
		ipfsInstance.libp2p.on('peer:disconnect', peerInfo => console.log(peerInfo))
	} else {
		console.log('reusing ipfsInstance')
	}

	return ipfsInstance
}

export default getIPFS
