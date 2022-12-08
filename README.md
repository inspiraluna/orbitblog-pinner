# orbitblog pin service

## Usage 
1. Checkout this repo https://github.com/inspiraluna/orbitblog.git
2. Run ```npm i```
3. Run ```echo "PRIVKEY=0x0123456789012345678901234567890123456789012345678901234567890123" > .env``` (use a better privatekey!)
4. Run ```node src/index.js``` (orbitblog pinner is starting)
5. Run ```curl -X POST http://localhost:8000/pin?address=<your-orbit-dbaddress>```


## Related information
1. WebRTC between Browser and NodeJS
  - https://github.com/ipfs/js-ipfs/blob/master/docs/FAQ.md#is-there-webrtc-support-for-js-ipfs-with-nodejs
  - https://github.com/libp2p/js-libp2p/issues/1478
  - https://www.npmjs.com/package/@libp2p/webrtc-star
  - https://github.com/orbitdb/orbit-db/issues/1029