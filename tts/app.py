from transformers import VitsModel, AutoTokenizer
import torch
import scipy.io.wavfile
import numpy as np
import os
from flask import Flask, request, send_file, after_this_request

model = VitsModel.from_pretrained("facebook/mms-tts-vie")
tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-vie")

app = Flask(__name__)
@app.route('/synthesize', methods=['POST'])
def synthesize():
    text = request.json['text']
    inputs = tokenizer(text, return_tensors="pt")

    with torch.no_grad():
        output = model(**inputs).waveform

    # Convert the waveform to a NumPy array and scale it to the range of int16
    output_np = output[0].numpy()
    output_np = (output_np * np.iinfo(np.int16).max).astype(np.int16)

    # Get the directory of the current file
    dir_path = os.path.dirname(os.path.realpath(__file__))

    # Write the waveform to a WAV file
    filename = os.path.join(dir_path, 'output.wav')
    with open(filename, 'wb') as f:
        scipy.io.wavfile.write(f, rate=model.config.sampling_rate, data=output_np)

    # Prevent caching
    @after_this_request
    def add_header(response):
        response.headers['Cache-Control'] = 'no-store'
        return response

    # Return the WAV file
    return send_file(filename, mimetype='audio/wav')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)