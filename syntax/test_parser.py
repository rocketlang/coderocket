def parse_code(code):
    if "show" in code or "dikhao" in code:
        return {"action": "display", "value": code.split('"')[1]}
    if "make function" in code:
        return {"action": "function", "name": code.split(":")[0].split()[-1]}
    if "animate" in code:
        return {"action": "animate", "coords": code.split("to")[-1].strip()}
    return None

# Test cases
assert parse_code('show "Hello" on screen') == {"action": "display", "value": "Hello"}
assert parse_code('make function pay: connect razorpay_api') == {"action": "function", "name": "pay"}
assert parse_code('animate ship to 200,200') == {"action": "animate", "coords": "200,200"}
print("Tests passed!")