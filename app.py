import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

#service worker path
@app.route('/sw.js')
def sw():
    return send_from_directory(os.path.join(app.root_path,'static/js'),'sw.js')

if __name__ == '__main__':
    app.run(debug=True)