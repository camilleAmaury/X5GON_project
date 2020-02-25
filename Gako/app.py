import threading
import time
from datetime import datetime
from flask import Flask, render_template, jsonify, request
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy import inspect
from sqlalchemy.sql import text

from utils import motivate

app = Flask(__name__)

light_on = True
translations = {}

@app.before_first_request
def load_translation():
    lang = ['EN']
    global translations
    for l in lang:
        if(not l in list(translations.keys())):
            translations[l] = {}
            with open('./lang/'+l+'.txt', encoding="utf-8") as f:
                for translation in f:
                    keyValue = translation.split('::')
                    if(not keyValue[0] in list(translations[l])):
                        translations[l][keyValue[0]] = [keyValue[1]]
                    else:
                        translations[l][keyValue[0]].append(keyValue[1])
        else:
            with open('./lang/'+l+'.txt') as f:
                for translation in f:
                    keyValue = translation.split('::')
                    if(not keyValue[0] in list(translations[l])):
                        translations[l][keyValue[0]] = [keyValue[1]]
                    else:
                        translations[l][keyValue[0]].append(keyValue[1])

@app.before_first_request
def gako():
    def run():
        global translations
        global light_on
        print("Running...")
        print(light_on)
        while light_on:
            
            motivate(translations)
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
    
@app.route('/event/register')
def register():
    global translations
    engine = create_engine('mysql://torilen:kiogre97@localhost/x5gon')
    data = {'message' : translations[request.args.get('lang')]['register_message'][0].replace('<username>', request.args.get('username')), 'phone' : request.args.get('phone'), 'time' : datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'user_id' : request.args.get('user_id')}
    statement = text("""INSERT INTO notifications_sms_hours(message, phone, time, user_id, type) VALUES(:message, :phone, :time, :user_id, 0)""")
    with engine.connect() as con:
        con.execute(statement, **data)

    return "1"
    
@app.route('/action/unsubscribe')
def unsubscribe():
    engine = create_engine('mysql://torilen:kiogre97@localhost/x5gon')
    data = {'user_id' : request.args.get('user_id')}
    statement = text("""DELETE FROM notifications_sms_hours WHERE user_id = :user_id""")
    with engine.connect() as con:
        con.execute(statement, **data)
        
    statement = text("""UPDATE users SET phone = "" WHERE user_id = :user_id""")
    with engine.connect() as con:
        con.execute(statement, **data)

    return "1"
    
@app.route('/action/subscribe')
def subscribe():
    engine = create_engine('mysql://torilen:kiogre97@localhost/x5gon')
    
    data = {'user_id' : request.args.get('user_id'), 'phone' : request.args.get('phone')}
    statement = text("""UPDATE users SET phone = :phone WHERE user_id = :user_id""")
    with engine.connect() as con:
        con.execute(statement, **data)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True, threaded=True)