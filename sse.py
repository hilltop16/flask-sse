from flask import Flask, render_template
from flask_sse import sse

app = Flask(__name__, template_folder='template')
app.config["REDIS_URL"] = "redis://localhost"
app.register_blueprint(sse, url_prefix='/stream')


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/hello')
def publish_hello():
    sse.publish({"message": "Attention Please !"}, type='greeting')
    return "Message sent!"


@app.route('/sw.js', methods=['GET'])
def sw():
    return app.send_static_file('sw.js')