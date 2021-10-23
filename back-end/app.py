from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)