$( document ).ready(function() {
    //Adapter Shime for browser compatibility
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    $('#error').hide();

    //Creating the peer object with STUN and TURN server configurations.
    var peer = new Peer({ key: 'oz9b3ni30qtcsor', debug: 3, config: {'iceServers': [
                { url: 'stun:stun.l.google.com:19302' },
                { url: 'turn:numb.viagenie.ca:3478', credential: 'muazkh', username:'webrtc@live.com' },
                { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username:'webrtc@live.com' },
                { url: 'turn:numb.viagenie.ca:3478', credential: 'peerjsdemo', username:'p.srikanta@gmail.com' },
                { url: 'turn:192.158.29.39:3478?transport=udp', credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=', username:'28224511:1379330808' },
                { url: 'turn:192.158.29.39:3478?transport=tcp', credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=', username:'28224511:1379330808' }
            ]}});
    
    //Create an ON even for the newly created peer object
    peer.on('open', function(){$('#key').text(peer.id);});

    //Handle success callback by assigning the video stream to the Video id div tag
    function selfVideoSuccess(stream){
        $('#video').prop('src', URL.createObjectURL(stream));
        window.localStream = stream; // Used to send the stream to the calling person
    }
    
    //Handle error callback by displaying a text message
    function selfVideoError(){
        $('#error').show();
    }
    
    //Handle the Call event by answering the call, receiving the peer stream and then assigning it to a div.
    peer.on('call',function(call){
        call.answer(window.localStream);
        call.on('stream', function(stream){
            $('#peervideo').prop('src', URL.createObjectURL(stream));
        });
    });
    
    //Get the stream from the local user
    navigator.getUserMedia({audio: true, video: true}, selfVideoSuccess, selfVideoError); 

    //Handle Click of the Call button
    $('#call').click(function(){
        var call = peer.call($('#peerid').val(), window.localStream); // Share the peer ID & local video stream specs
        call.on('stream', function(stream){  // Handle the incoming stream and assign it to the peervideo div tag
             $('#peervideo').prop('src', URL.createObjectURL(stream));
        });
    });
});     