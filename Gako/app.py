import threading
import time
from flask import Flask, render_template, jsonify
app = Flask(__name__)

light_on = False

@app.before_first_request
def gako():
    def run():
        global light_on
        print("Running...")
        print(light_on)
        while light_on:
            # CODE
            time.sleep(1)
    print("Gako is started")
    thread = threading.Thread(target=run)
    thread.start()

@app.route('/start')
def start():
    global light_on
    light_on = True
    return "started"

@app.route('/stop')
def stop():
    global light_on
    light_on = False
    return 'stopped'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True, threaded=True)