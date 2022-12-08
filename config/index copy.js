import wrtc from "wrtc" 
import {webRTCStar as WebRTCStar}  from "@libp2p/webrtc-star"
// import WebRTCStar from '@libp2p/webrtc-star'
import MulticastDNS from 'libp2p-mdns'
const star = WebRTCStar({ wrtc })


const ipfsConfig = {
	start: true,
	repo: './orbitdb-ipfs',
	EXPERIMENTAL: {
		pubsub: true,
	},
	preload: {
		enabled: false,
	},
	// libp2p: {
	// 	modules: {
	// 	  transport: [WebRTCStar]
	// 	},
	// 	config: {
	// 					transports: [
	// 			star.transport
	// 		  ],
	// 	  peerDiscovery: {
	// 		webRTCStar: { // <- note the lower-case w - see https://github.com/libp2p/js-libp2p/issues/576
	// 		  enabled: true
	// 		}
	// 	  },
	// 	//   transport: {
	// 		// WebRTCStar: { // <- note the upper-case w- see https://github.com/libp2p/js-libp2p/issues/576
	// 		//   wrtc
	// 		// }
	// 	//   }
	// 	}
	//   },
	libp2p: {
		modules: {
			// transport: [star.transport],
			peerDiscovery: [MulticastDNS],
			// dht: KadDHT,
		},
		config: {
			addresses: {
				listen: [
				  '/ip4/65.21.180.203/tcp/9091/wss/p2p-webrtc-star'
				]
			  },
			transports: [
				star.transport
			  ],
			  peerDiscovery: [
				star.discovery
			  ]
			// connectionManager: {
			// 	autoDial: false,
			// },
		},
		transportManager: { faultTolerance: 1 },
	},
	config: {
		Bootstrap: [
			// '/dns4/ipfs.le-space.de/tcp/4003/wss/p2p-webrtc-star/p2p/12D3KooWQEaozT9Q7GS7GHEzsVcpAmaaDmjgfH5J8Zba1YoQ4NU3',
		],
		Addresses: {
			Swarm: [
				// '/ip4/65.21.180.203/tcp/9091/wss/p2p-webrtc-star',
				'/dns6/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star',
				'/dns4/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star',
				
				// '/dns4/ipfs.le-space.de/tcp/4003/wss/p2p-webrtc-star',
				// '/dns4/three0-rtc-node.herokuapp.com/tcp/443/wss/p2p-webrtc-star/',
			],
		},
	},
}
export default ipfsConfig
//module.exports = ipfsConfig
