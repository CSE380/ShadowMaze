How to start:
 npm i
 There might an error:
 npm ERR! code EACCES
 npm ERR! syscall open
 To fix that, please run the provided code promopt in the terminal starting with "sudo chown -R 501:20"
Then:
 sudo npm install -g firebase-tools
 firebase login 
Last step:
 firebase deploy

