from flask import Flask, render_template, request, jsonify, make_response
from functools import wraps
from datetime import datetime
from random import randint
import redis

r = redis.Redis()

app = Flask(__name__)

def check_authentication(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        auth = request.authorization
        if auth and auth.username == 'username' and auth.password == 'password':
            return f(*args, **kwargs)
        return make_response('Authentication failed!', 401, {'WWW-Authenticate':'Basic realm="Login required"'})
    return decorated


@app.route('/inbound/sms', methods = ['POST'])
@check_authentication
def inbound():
    try:
        data = request.get_json()
        param_from = data.get('from')
        param_to = data.get('to')
        param_text = data.get('text')

        if not param_from:
            return make_response(jsonify({"message":"","error":"from is missing"}), 400)
        elif not param_to:
            return make_response(jsonify({"message":"","error":"to is missing"}), 400)
        elif not param_text:
            return make_response(jsonify({"message":"","error":"text is missing"}), 400)
        
        elif not type(param_from) == int or abs(param_from)!=param_from or not 6<=len(str(param_from))<=16:
            return make_response(jsonify({"message":"","error":"from is invalid"}), 400)
        elif not type(param_to) == int or abs(param_to)!=param_to or not 6<=len(str(param_to))<=16:
            return make_response(jsonify({"message":"","error":"to is invalid"}), 400)
        elif not type(param_text) == str or not 1<=len(param_text)<=120:
            return make_response(jsonify({"message":"","error":"text is invalid"}), 400)

        else:
            if (param_text == "STOP" or param_text == "STOP\n" or param_text == "STOP\r" or param_text == "STOP\r\n"):
                r.setex(str(param_from)+str(param_to), 14400, value = 0)
            
            return make_response(jsonify({"message":"inbound sms ok","error":""}),200)
    except:
        return make_response(jsonify({"message":"", "error":"unknown failure"}), 500)


@app.route('/outbound/sms', methods = ['POST'])
@check_authentication
def outbound():
    try:
        data = request.get_json()
        param_from = data.get('from')
        param_to = data.get('to')
        param_text = data.get('text')

        if not param_from:
            return make_response(jsonify({"message":"","error":"from is missing"}), 400)
        elif not param_to:
            return make_response(jsonify({"message":"","error":"to is missing"}), 400)
        elif not param_text:
            return make_response(jsonify({"message":"","error":"text is missing"}), 400)
        
        elif not type(param_from) == int or abs(param_from)!=param_from or not 4<=len(str(param_from))<=16:
            return make_response(jsonify({"message":"","error":"from is invalid"}), 400)
        elif not type(param_to) == int or abs(param_to)!=param_to or not 4<=len(str(param_to))<=16:
            return make_response(jsonify({"message":"","error":"to is invalid"}), 400)
        elif not type(param_text) == str or not 1<=len(param_text)<=120:
            return make_response(jsonify({"message":"","error":"text is invalid"}), 400)

        elif r.get(str(param_from)+str(param_to)) == b'0':
            return make_response(jsonify({"message":"","error":"sms from {} and to {} blocked by STOP".format(param_from,param_to)}), 403)

        elif len(r.keys(str(param_from)+'*'))>=5:
            return make_response(jsonify({"message":"","error":"limit reached for from {}".format(param_from)}), 429)

        else:   
            r.setex(str(param_from)+' '+datetime.now().strftime("%X"), 3600, value = param_text)
            return make_response(jsonify({"message":"outbound sms is ok","error":""}), 200)

    except:
        return make_response(jsonify({"message":"", "error":"unknown failure"}), 500)


if __name__ == '__main__':
   app.run(debug = True)
