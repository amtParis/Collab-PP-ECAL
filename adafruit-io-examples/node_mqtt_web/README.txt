1. Install required libraries in package.json
npm install

2. Update the index.js file with your own adafruit username, feed, key

3. Test the demo works:
node index.js

4. Open in browser at 127.0.0.1:5000

5. Add data to your feed and see if it shows up on the page

6. Copy your files into public folder (but keep a copy of the current index.html to see how to add the changes needed)

7. In your index.html, include the script for socket.io.js
<script  type="text/javascript" src="./socket.io.js"></script>


8. Add the code to receive the message (and then apply it in your code as needed)

<script>
    	var socket = io();
    	socket.on('message', function(msg){
      		console.log(msg);
		// now that you have the message, you can use it to modify something
      		//document.getElementById('value').innerHTML = msg;
    	});
</script>
