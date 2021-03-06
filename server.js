//Install express server    
const express = require('express');
const app = express();   

const path = require('path');   

// Serve only the static files form the dist directory    
app.use(express.static(__dirname + '/dist/resume-app'));

// Start the app by listening on the default Heroku port    
app.listen(process.env.PORT || 8080);

app.get('/*', (req,res) => {  
    //res.sendFile(path.join(__dirname+'/dist/index.html'));   
    res.sendFile(path.join(__dirname+'/dist/resume-app/index.html'));
});

console.log('Console listening!');