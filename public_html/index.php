<?php $ip = $_SERVER['SERVER_ADDR']; ?>
<!doctype html>
<html lang="fr-BE">
<head>
    <meta charset="UTF-8">
    <title>Vie Wallonne 2.5</title>
</head>
<body>

<div id="data">

</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="http://<?php echo $ip; ?>:14242/socket.io/socket.io.js"></script>
<script>
    $( document ).ready(function() {
        var socket = io.connect('http://<?php echo $ip; ?>:14242');
        socket.on('viewallonne', function (data) {
            $("#data").append($('<p><strong>' + data.sender + ':</strong> ' + data.text + '</p>'));
        });
    });
</script>
</body>
</html>