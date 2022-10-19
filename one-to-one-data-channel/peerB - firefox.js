// step two
const offer = {"type":"offer","sdp":"v=0\r\no=- 9065210372241835886 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:2337721999 1 udp 2113937151 ecee6ce9-129e-4b41-9d25-edc622146038.local 47838 typ host generation 0 network-cost 999\r\na=ice-ufrag:ELTh\r\na=ice-pwd:J1wvDjE0+Af1EAUNkd5FMCt0\r\na=ice-options:trickle\r\na=fingerprint:sha-256 62:32:FC:40:F3:18:56:ED:3F:BA:C0:F6:6C:1D:87:9B:80:17:42:F3:5F:E3:C8:09:DE:C6:26:94:D9:79:C9:91\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}

const rc = new RTCPeerConnection();
rc.onicecandidate = e => console.log("new ice candidate! SDP: " + JSON.stringify(rc.localDescription))

rc.ondatachannel = e => {
    rc.dc = e.channel;
    rc.dc.onmessage = e => console.log("new message from client! " + e.data);
    rc.dc.onopen = e => console.log("connection open!");
}

rc.setRemoteDescription(offer).then(a => console.log("offer set!"))
rc.createAnswer().then(a => rc.setLocalDescription(a)).then(a => console.log("answer created"))

/**
    new ice candidate! SDP: {"type":"answer","sdp":"v=0\r\no=mozilla...THIS_IS_SDPARTA-99.0 5261618779957282500 0 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=sendrecv\r\na=fingerprint:sha-256 AE:6C:F4:B0:D4:3B:64:0B:91:BC:BB:45:E0:0E:82:8E:F2:38:E3:AE:A8:C2:C8:E4:63:66:70:B2:67:92:D7:7A\r\na=group:BUNDLE 0\r\na=ice-options:trickle\r\na=msid-semantic:WMS *\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:0 1 UDP 2122252543 fc8e5fbc-11bb-446e-afa8-f0ec2dc006fe.local 49104 typ host\r\na=candidate:1 1 TCP 2105524479 fc8e5fbc-11bb-446e-afa8-f0ec2dc006fe.local 9 typ host tcptype active\r\na=sendrecv\r\na=end-of-candidates\r\na=ice-pwd:df9d548aafb0d487f3fda43fb2db95d9\r\na=ice-ufrag:e726db63\r\na=mid:0\r\na=setup:active\r\na=sctp-port:5000\r\na=max-message-size:1073741823\r\n"}
*/

// when the answer is set from the other side, the connection is open!
/** connection open! */

// step four
/** new message from client! hi firefox! */
rc.dc.send("hi chrome!")
/** undefined */

// step six
/** new message from client! hows the day?*/
/** ... */