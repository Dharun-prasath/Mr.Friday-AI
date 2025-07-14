import json
from datetime import datetime

MEMORY_FILE = "memory.json"

def save_task(task, response):
    log = {
        "time": datetime.now().isoformat(),
        "task": task,
        "response": response
    }
    try:
        with open(MEMORY_FILE, "r") as f:
            data = json.load(f)
    except:
        data = []

    data.append(log)

    with open(MEMORY_FILE, "w") as f:
        json.dump(data, f, indent=2)

def get_recent_logs(n=5):
    try:
        with open(MEMORY_FILE) as f:
            data = json.load(f)
            return data[-n:]
    except:
        return []
