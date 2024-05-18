from transformers import VitsModel, AutoTokenizer
import numpy as np
import os
from flask import Flask, request, send_file, make_response
from gtts import gTTS

app = Flask(__name__)
@app.route('/synthesize', methods=['POST'])
def synthesize():
    # Get the text from the request
    text = request.json['text']

    # Create a gTTS object
    tts = gTTS(text, lang='vi')

    # Save the speech audio to a mp3 file
    filename = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'output.mp3')
    tts.save(filename)

    # Return the mp3 file
    return send_file(filename, mimetype='audio/mpeg')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)