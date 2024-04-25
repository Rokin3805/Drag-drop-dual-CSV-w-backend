//import required modules
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const multer = require('multer');

//create an Express application
const app = express();

const upload = multer();

//for parsing formData
app.use(upload.fields([{ name: 'suspectFile' }, { name: 'customerFile' }]));

//enable CORS and parse JSON bodies for http communication and parsing
app.use(cors());
app.use(express.json());

app.post('/findMatchesPlain', (req, res) => {
  //get the parsed CSV data from request
  const suspectData = req.files['suspectFile'][0].buffer.toString();
  const customerData = req.files['customerFile'][0].buffer.toString();

  //returning the data to verify backend/frontend interaction with file data
  //res.json({ suspectData: suspectData, customerData: customerData });
  
  //spawn Python process run python_match_plain.py
  const pythonProcess = spawn('python', ['python_match_plain.py', suspectData, customerData]);

  let result = '';

  //listen for data from process (standard output stream)
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  //listen for errors from process (standard error stream)
  pythonProcess.stderr.on('data', (data) => {
    console.error('Error:', data.toString());
  });

  //send the result to the client when process ends
  pythonProcess.on('close', (code) => {
    console.log('Python process exited with code', code);
    res.json({ result: result });
  });
});


const PORT = 3003;
//start the server and log a message to the console
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
