from flask import Flask, render_template, request
import datetime
from random import randint
currentTime = datetime.datetime.now()
hour = currentTime.hour

if hour < 12:
    greeting = "Good Morning"
elif hour < 18:
    greeting = "Good Afternoon"
else:
    greeting = "Good Evening"

bye = "Have a nice day" if hour<20 else "Good Night"
#print(["I look forward to our next meeting!",greeting+"!"])

quotes = [ "'If people do not believe that mathematics is simple, it is only because they do not realize how complicated life is.' -- John Louis von Neumann ",
"'Computer science is no more about computers than astronomy is about telescopes' --  Edsger Dijkstra ",
"'To understand recursion you must first understand recursion..' -- Unknown",
"'You look at things that are and ask, why? I dream of things that never were and ask, why not?' -- Unknown",
"'Mathematics is the key and door to the sciences.' -- Galileo Galilei",
"'Not everyone will understand your journey. Thats fine. Its not their journey to make sense of. Its yours.' -- Unknown"  ]
randomNumber = randint(0,len(quotes)-1)
quote = quotes[randomNumber]

app = Flask(__name__)

@app.route('/')
def student():
   return render_template('name.html')

@app.route('/result',methods = ['POST', 'GET'])
def result():
   if request.method == 'POST':
      name = request.form['Name']
      quotes = [ "'If people do not believe that mathematics is simple, it is only because they do not realize how complicated life is.' -- John Louis von Neumann ",
"'Computer science is no more about computers than astronomy is about telescopes' --  Edsger Dijkstra ",
"'To understand recursion you must first understand recursion..' -- Unknown",
"'You look at things that are and ask, why? I dream of things that never were and ask, why not?' -- Unknown",
"'Mathematics is the key and door to the sciences.' -- Galileo Galilei",
"'Not everyone will understand your journey. Thats fine. Its not their journey to make sense of. Its yours.' -- Unknown"  ]
      randomNumber = randint(0,len(quotes)-1)
      quote = quotes[randomNumber]
      return render_template("result.html",name = name, greeting = greeting, bye = bye, quote = quote)

if __name__ == '__main__':
   app.run(debug = True)