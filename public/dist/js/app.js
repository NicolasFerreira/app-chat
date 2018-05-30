

$(function () {
  var socket = io();
  var userConnect = [];

  var pseudo = prompt('Quel est votre pseudo ?');
  socket.emit('nouveau_client', pseudo);
  socket.emit('disconnect', pseudo);
  document.title = pseudo + ' - ' + document.title;

  

  socket.on('nouveau_client', function(data) {
    $('#messages').append('<p><em>' + data.pseudo + ' a rejoint le Chat !</em></p>'); 
    $('#enLigne').text('En ligne (' +data.nbUser+ ')');
  })

  socket.on('disconnected', function(data) {
    $('#messages').append('<p><em>' + data.pseudo + ' a quitté le Chat !</em></p>'); 
    $('#enLigne').text('En ligne (' +data.nbUser+ ')');
  })


  

  $('form').submit(function(){
    var message = $('#m').val();

    if(message !== ''){
      socket.emit('chat message vers serveur', message); 
      $('#messages').append($('<li>').html('<div class="div-message local"><p class="p-pseudo ">'+pseudo+'</p><p class="p-message user-color">'+message+'</p></div>'));           
      $('#m').val('').focus();

      var objDiv = document.getElementById("messages");
      objDiv.scrollTop = objDiv.scrollHeight;
      window.scrollTo(0, objDiv.scrollTop);

      return false;
    }else{
      return false;
    }

  });

  socket.on('chat message vers les clients', function(data){
    console.log(data);
    $('#messages').append($('<li>').html('<div class="div-message"><p class="p-pseudo">'+data.pseudo+'</p><p class="p-message">'+data.message+'</p></div>'));
    $('#enLigne').text('En ligne (' +data.nbUser+ ')');
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
    window.scrollTo(0, objDiv.scrollTop); 
  });
});


//affichage Discussion / enligne :
$(function () {
  var discussion = document.getElementById('discussion');
  var enLigne = document.getElementById('enLigne');
  var messages = document.getElementById('messages');
  var users = document.getElementById('users');

  discussion.addEventListener('click',function(){
    discussion.classList.add('active-menu');
    enLigne.classList.remove('active-menu');
    messages.classList.remove('hide');
    users.classList.add('hide');
  })
  enLigne.addEventListener('click',function(){
    discussion.classList.remove('active-menu');
    enLigne.classList.add('active-menu');
    messages.classList.add('hide');
    users.classList.remove('hide');
  })
});
