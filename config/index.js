import wrtc from "wrtc" 
import WebRTCStar from 'libp2p-webrtc-star'
import WebRTCDirect from 'libp2p-webrtc-direct'
import KadDHT from 'libp2p-kad-dht'
import MulticastDNS from 'libp2p-mdns'
import TCP from 'libp2p-tcp'

const ipfsConfig = {
	start: true,
	repo: './orbitdb-ipfs',
	EXPERIMENTAL: {
		pubsub: true,
	},
	preload: {
		enabled: false,
	},
	libp2p: {
		modules: {
			transport: [WebRTCStar, WebRTCDirect, TCP],
			peerDiscovery: [MulticastDNS],
			// dht: KadDHT,
		},
		config: {
			peerDiscovery: {
				// WebSockets: {
				// 	enabled: true,
				// },
				webRTCStar: {
					enabled: true,
				},
			},
			transport: {
				// [transportKey]: { // Transport properties -- Libp2p upgrader is automatically added
				// 	filter: filters.dnsWsOrWss,
				// },
				// websockets({// connect to all sockets, even insecure ones
				// 	filters: filters.all,
				//   }),
				// ws,
				WebRTCStar: {
					wrtc,
				},
			},
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
				'/dns6/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star',
				'/dns4/ipfs.le-space.de/tcp/9091/wss/p2p-webrtc-star',
				// '/dns4/ipfs.le-space.de/tcp/4003/wss/p2p-webrtc-star',
				// '/dns4/three0-rtc-node.herokuapp.com/tcp/443/wss/p2p-webrtc-star/',
			],
		},
	},
}

export default ipfsConfig