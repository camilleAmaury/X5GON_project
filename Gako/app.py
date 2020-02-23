import threading
import time
from flask import Flask, render_template, jsonify
app = Flask(__name__)

light_on = False

@app.before_first_request
def light_thread():
    def run():
        global light_on
        while light_on:
            print("keep going!")
            time.sleep(1)

    thread = threading.Thread(target=run)
    thread.start()

@app.route('/start')
def start():
    # stop the function test
    light_on = True
    return "started"

@app.route('/stop')
def stop():
    light_on = False
    return 'stopped'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True, threaded=True)