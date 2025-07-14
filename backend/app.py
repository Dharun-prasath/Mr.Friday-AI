from flask import Flask, request, jsonify
from brain import ask_gemma
from memory import save_task

app = Flask(__name__)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    prompt = data.get("prompt", "")
    print(f"[Mr. Friday RECEIVED]: {prompt}")  # Debug log

    response = ask_gemma(prompt)
    print(f"[Mr. Friday RESPONSE]: {response}")  # Debug log

    save_task(prompt, response)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(port=5050)  # 🧠 Mr. Friday backend running
