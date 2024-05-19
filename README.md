# Monorepo of final project in Human Computer Interaction Course 2324II_INT2041_20
This project is developed by a group of four students majoring in Computer Science at University of Engineering and Technology, Vietnam National University. This repository is the monorepo that contains all of the code for this project.
## Description
This product is a cross-platform application that can be used as an assistive technology solution for people with Aphasia in simple and common communication situations. Users choose several cards that can be combined to express what they want to convey, the application with the assistant of AI, conduct the full sentence and use TTS to voice out that sentence's spoken audio.
## System & Environment Requirement 
To run this application, you need to install: 
- Docker Desktop (Windows)
- Docker Compose
- Python 3.10

Get the IPv4 Address field and fill it in the api end-points in **./front-end/screens/Flashcard.js.**

For model API key, contact us or go to [grammarly/coedit-large](https://huggingface.co/grammarly/coedit-large) and get your own API key.\

## Run the app
Clone this repository: 
```
git clone https://github.com/kami2608/HCI-Project---Aphasia-App.git
``` 
Run the back-end: 
``` 
docker-compose up
cd tts 
python app.py
``` 
Install node-modules and other packages for the front-end: 
``` 
npm install
npm i --save-dev react-native-dotenv
npm i google-translate-api-x react-native-fs expo-av
npx expo install expo-file-system
``` 
You will need .env file with keys to run this project, contact the owner of the reposition.

Run the front-end: 
``` 
cd front-end
npm start
``` 