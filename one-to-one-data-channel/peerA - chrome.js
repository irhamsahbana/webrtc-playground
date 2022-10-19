// step one
const lc = new RTCPeerConnection()
const dc = lc.createDataChannel("channel")

dc.onmessage = (e) => console.log("Just got a message: " + e.data)
dc.onopen = (e) => console.log("connection open!")
lc.onicecandidate = (e) => console.log("new ice candidate! reprinting SDP: " + JSON.stringify(lc.localDescription))
lc.createOffer().then(o => lc.setLocalDescription(o)).then(a => console.log("set successfully!"))

// step three
const answer = {"type":"answer","sdp":"v=0\r\no=mozilla...THIS_IS_SDPARTA-99.0 5261618779957282500 0 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=sendrecv\r\na=fingerprint:sha-256 AE:6C:F4:B0:D4:3B:64:0B:91:BC:BB:45:E0:0E:82:8E:F2:38:E3:AE:A8:C2:C8:E4:63:66:70:B2:67:92:D7:7A\r\na=group:BUNDLE 0\r\na=ice-options:trickle\r\na=msid-semantic:WMS *\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:0 1 UDP 2122252543 fc8e5fbc-11bb-446e-afa8-f0ec2dc006fe.local 49104 typ host\r\na=candidate:1 1 TCP 2105524479 fc8e5fbc-11bb-446e-afa8-f0ec2dc006fe.local 9 typ host tcptype active\r\na=sendrecv\r\na=end-of-candidates\r\na=ice-pwd:df9d548aafb0d487f3fda43fb2db95d9\r\na=ice-ufrag:e726db63\r\na=mid:0\r\na=setup:active\r\na=sctp-port:5000\r\na=max-message-size:1073741823\r\n"}

// when you get the answer from the other peer, set it as the remote description
lc.setRemoteDescription(answer)
/*connection open! */

dc.send("hi firefox!")
// undefined

// step five
/** Just got a message: hi chrome!*/
dc.send("hows the day?")
/** ... */