/* eslint-disable no-plusplus */
// const orbitInstance = require('./orbitInstance')
import { CID } from 'multiformats/cid'
import getIPFS from '../ipfsInstance.js'
import getIdentityInstance from '../identityInstance.js'
import {
	add,
	getContents,
	getPinners,
	remove,
	// follow,
} from './index.js'

const checkChanges = async (address, payload) => {
	const ipfs = await getIPFS()
	console.log(`checkChanges for ${address}`)

	if (payload !== undefined && payload.value !== undefined) {
		const newIPFSContentCID = payload?.value?.content
		const newFeedAddress = payload?.value?.address
		if (newIPFSContentCID && payload.op === 'ADD') {
			const cid = await ipfs.pin.add(CID.parse(newIPFSContentCID))
			console.log('pinned cid locally', cid)
		}

		if (newFeedAddress && payload.op === 'ADD') {
			console.log(`found subfeed ADD: creating new pinner! ${newFeedAddress}`)
			await add(newFeedAddress)
			const currentPinners = getPinners()
			console.log('current pinners now', currentPinners?.address)
		}
		if (payload.op === 'DEL') {
			const addressOfMediaFeed = address
			console.log('removing stuff', payload)
			// 1. open the address again
			// const {
			// 	add,
			// 	getContents,
			// 	getPinners,
			// 	remove,
			// 	follow,
			// } = require('./index')

			// 2. loop through the feed and check entry - if entry type contains an address
			const contentList = await getContents(addressOfMediaFeed)
			console.log('contentList', contentList)
		}
		/* 
		 * const contentList = await getContents(removeAddress) //can either be a post with lots of media or a single media
			console.log('contentList', contentList)
			for (let i = 0; i <= contentList.length; i++) {
				const el = contentList[i]
				if (el === undefined) continue
				console.log('el', el)
				const { content } = el
				// const { subFeedAddress } = el
				if (content) {
					// this is a single content which was removed
					// 1. unpinn this media
					const cid = await ipfs.pin.remove(CID.parse(content))
					console.log('removed pinned cid locally', cid)
					// 2. remove this entry from subfeed
				}*/
				/* if (subFeedAddress) {
					// we removed this sub feed - we need to unpin all media and drop this address in the end
					// 1. Iterate through all media of this subfeed address and unpin
					const mediaList = await getContents(subFeedAddress)
					const cid = await ipfs.pin.add(CID.parse(newIPFSContentCID))
					// 2. drop the subfeeds db
					// 3. remove pinner
					remove(removeAddress)
					// 4. remove this entry from the main feed
				} */
			//}	
		//}
	} else {
		console.log('payload or payload value undefined', payload)
	}
}

export default checkChanges
// module.exports = checkChanges
