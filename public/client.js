
function setUp() {

    //Get the posts
    $.ajax({
        method: 'GET',
        url: '/getPosts',
        success: function(data) {
            
            // alert(data);
            data = JSON.parse(data);
            $('#posts').empty();
            data.forEach((post) => {
                //For post request
                $('#posts').append(`<li id='${post.id}'>${post.content} - Likes: <span id='like-count-${post.id}'>${post.likes}</span> <button id='like-${post.id}' onclick='addLike(${post.id})'>Like</button></li>`);                
                //For websockets
                // $('#posts').append(`<li id='${post.id}'>${post.content} - Likes: <span id='like-count-${post.id}'>${post.likes}</span> <button id='like-${post.id}'>Like</button></li>`);
            });
            // setUpWebSocket(data);
        }
    });

}

function updateLikes(id) {
    var likeCount = Number($(`#like-count-${id}`).html());
    $(`#like-count-${id}`).html(likeCount + 1);
}

function addLike(id) {
    $.ajax({
        method: 'POST',
        url: '/updateLike',
        data: {
            id: id
        },
        success: function(data) {
            updateLikes(data.id);
        }
    });
}




function setUpWebSocket(arrayOfPosts) {

    var socket = new WebSocket(`ws://${window.location.href.split('//')[1]}test`);

    socket.onopen = function(event) {
        console.log('we are connected', event.currentTarget.url);
        $('#sendWebSocketMessage').on('click', (event) => {
            sendSocketMessage(socket, 'Testing');
        });

        //Set up event listeners for each of the like buttons

        arrayOfPosts.forEach((post) => {
            $(`like-${post.id}`).on('click', (event) => {
                sendSocketMessage(socket, post.id);
            });
        console.log('Like buttons are ready');
        });


    }

    socket.onmessage = function(event) {
        //Send the id to updateLikes function
        updateLikes(event.data);
    }

    socket.onerror = function(event) {
        
    }

    socket.onclose = function(event) {
        
    }
    
}
    
function sendSocketMessage(socket, message) {
        socket.send(message);
}