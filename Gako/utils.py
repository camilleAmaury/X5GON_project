import random
import sqlalchemy

from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy import inspect
from sqlalchemy.sql import text

from datetime import datetime

from constants import MAX_MOTIVATION_MESSAGE_PER_DAY

import pandas as pd
import numpy as np


def motivate(translations):
    print('motivateeee')
    engine = create_engine('mysql://torilen:kiogre97@localhost/x5gon')
    
    
    
    with engine.connect() as con:
        resUsers = con.execute('SELECT * FROM users WHERE phone != ""')
        users = pd.DataFrame(resUsers.fetchall())
        users.columns = resUsers.keys()
        for index, row in users.iterrows():
            lang = row.lang
            username = row.username
            phone = row.phone
            user_id = row.user_id
        
            res = con.execute('SELECT * FROM notifications_sms_hours WHERE type = 1 and user_id = {} and day(time) = day(now())'.format(user_id))
            resToList = list(res)
            if(len(resToList) < MAX_MOTIVATION_MESSAGE_PER_DAY):
                resTrace = con.execute("SELECT * FROM trace_navigation_users WHERE user_id = {}".format(user_id))
                df = pd.DataFrame(resTrace.fetchall())
                df.columns = resTrace.keys()
                t = [i for i in range(24)]
                for index, row in df.iterrows():
                  t_add = datetime.strptime(row["timestamp"].split('.')[0], '%Y-%m-%d %H:%M:%S')
                  t[t_add.hour] += 1
                t = softmax(np.array(t), theta=0.1)
                t = np.array([t])
                bestHours = list((-t).argsort()[0])[:MAX_MOTIVATION_MESSAGE_PER_DAY-len(resToList)]
                print(bestHours)
                for hour in bestHours:
                    if(hour < 10):
                        hour = "0"+str(hour)
                    motivation_messages = translations[lang]['motivation_message']
                    data = {'message' : motivation_messages[random.randint(0, len(motivation_messages)-1)].replace('<username>', username), 'phone' : phone, 'time' : datetime.now().strftime('%Y-%m-%d '+str(hour)+':00:00'), 'user_id' : user_id}
                    statement = text("""INSERT INTO notifications_sms_hours(message, phone, time, user_id, type) VALUES(:message, :phone, :time, :user_id, 1)""")
                    con.execute(statement, **data)
            
def softmax(X, theta = 1.0, axis = None):
    """
    Compute the softmax of each element along an axis of X.

    Parameters
    ----------
    X: ND-Array. Probably should be floats.
    theta (optional): float parameter, used as a multiplier
        prior to exponentiation. Default = 1.0
    axis (optional): axis to compute values along. Default is the
        first non-singleton axis.

    Returns an array the same size as X. The result will sum to 1
    along the specified axis.
    """

    # make X at least 2d
    y = np.atleast_2d(X)

    # find axis
    if axis is None:
        axis = next(j[0] for j in enumerate(y.shape) if j[1] > 1)

    # multiply y against the theta parameter,
    y = y * float(theta)

    # subtract the max for numerical stability
    y = y - np.expand_dims(np.max(y, axis = axis), axis)

    # exponentiate y
    y = np.exp(y)

    # take the sum along the specified axis
    ax_sum = np.expand_dims(np.sum(y, axis = axis), axis)

    # finally: divide elementwise
    p = y / ax_sum

    # flatten if X was 1D
    if len(X.shape) == 1: p = p.flatten()

    return p