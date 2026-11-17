import json
import urllib.request

base_url = "http://localhost:5000/api/v2/auth"
headers = {"Content-Type": "application/json"}

# 1. Register a new test user
register_url = f"{base_url}/register"
reg_payload = {
    "name": "Michael 'Test User' York",
    "email": "yorkmi@oregonstate.edu",
    "password": "big_secret",
}

print("Registering test user...")
try:
  req = urllib.request.Request(
      register_url, data=json.dumps(reg_payload).encode("utf-8"), headers=headers
  )
  with urllib.request.urlopen(req) as response:
    print(f"Register Status: {response.status}")
    print(f"Register Response: {response.read().decode('utf-8')}")
except urllib.error.HTTPError as e:
  
  print(f"Register note (user might already exist): {e.read().decode('utf-8')} (HTTP {e.code})")

# 2. Now test logging in with those exact credentials
login_url = f"{base_url}/login"
login_payload = {
    "email": "yorkmi@oregonstate.edu",
    "password": "big_secret",
}

print("\nAttempting login...")
try:
  req = urllib.request.Request(
      login_url, data=json.dumps(login_payload).encode("utf-8"), headers=headers
  )
  with urllib.request.urlopen(req) as response:
    print(f"\n--- SUCCESS ---")
    print(f"Status Code: {response.status}")
    print(f"Login Response: {response.read().decode('utf-8')}")
except urllib.error.HTTPError as e:
  print(f"\n--- HTTP ERROR {e.code} ---")
  print(e.read().decode("utf-8"))