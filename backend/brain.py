import subprocess

def ask_gemma(prompt: str) -> str:
    try:
        print(f"[Gemma Call] Prompt: {prompt}")

        # Run ollama with prompt
        process = subprocess.run(
            ["ollama", "run", "gemma3n:e4b"],
            input=prompt.encode("utf-8"),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=60  # Prevent long hangs
        )

        # Decode output
        output = process.stdout.decode("utf-8").strip()
        error = process.stderr.decode("utf-8").strip()

        # Check if output exists
        if output:
            return output
        elif error:
            print(f"[Gemma Error] {error}")
            return "⚠️ Mr. Friday couldn't understand that. (Model error)"
        else:
            return "⚠️ Mr. Friday is silent. No response from Gemma."

    except subprocess.TimeoutExpired:
        return "⚠️ Timeout: Gemma took too long to respond."
    except Exception as e:
        return f"[Gemma Crash] {e}"
