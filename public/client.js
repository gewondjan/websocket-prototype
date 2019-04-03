
function getPosts() {
    $.ajax({
        method: 'GET',
        url: '/getPosts',
        success: function(data) {
            
            // alert(data);
            data = JSON.parse(data);
            $('#posts').empty();
            data.forEach((post) => {
                $('#posts').append(`<li id='${post.id}'>${post.content} - Likes: ${post.likes} <button onclick='addLike(${post.id})'>Like</button></li>`);
            });
        }
    });

}

function addLike(id) {
    $.ajax({
        method: 'POST',
        url: '/updateLike',
        data: {
            id: id
        },
        success: function(data) {
            getPosts();
        }
    });
}


function setUp() {
    getPosts();
    setUpWebSocket();   
}


function setUpWebSocket() {

    var socket = new WebSocket(`ws://${window.location.href.split('//')[1]}test`);

    socket.onopen = function(event) {
        console.log('we are connected', event.currentTarget.url);
        $('#sendWebSocketMessage').on('click', (event) => {
            sendSocketMessage(socket, 'Testing');
        });
    }

    socket.onmessage = function(event) {
        alert(event.data);
    }

    socket.onerror = function(event) {
        
    }

    socket.onclose = function(event) {
        
    }
    
}
    
function sendSocketMessage(socket, message) {
        socket.send(message);
}