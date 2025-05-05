def parse_code(code):
    if "show" in code or "dikhao" in code:
        return {"action": "display", "value": code.split('"')[1]}
    if "make function" in code:
        return {"action": "function", "name": code.split(":")[0].split()[-1]}
    if "animate" in code:
        return {"action": "animate", "coords": code.split("to")[-1].strip()}
    if "loop" in code:
        times = int(code.split(" ")[1])
        command = code.split(": ")[1]
        return {"action": "loop", "times": times, "command": parse_code(command)}
    if "if" in code:
        if "else" in code:
            condition = code.split(": ")[0].split("if ")[1]
            if_part = code.split(": ")[1].split(" else: ")[0]
            else_part = code.split(" else: ")[1]
            return {"action": "if-else", "condition": condition, "if_command": parse_code(if_part), "else_command": parse_code(else_part)}
        else:
            condition = code.split(": ")[0].split("if ")[1]
            command = code.split(": ")[1]
            return {"action": "if", "condition": condition, "command": parse_code(command)}
    return None
# Test cases
assert parse_code('show "Hello" on screen') == {"action": "display", "value": "Hello"}
assert parse_code('make function pay: connect razorpay_api') == {"action": "function", "name": "pay"}
assert parse_code('animate ship to 200,200') == {"action": "animate", "coords": "200,200"}
print("Tests passed!")
# Additional test cases for control flow
assert parse_code('loop 5 times: show "Counting"') == {"action": "loop", "times": 5, "command": {"action": "display", "value": "Counting"}}
assert parse_code('if cargo > 100: show "Heavy"') == {"action": "if", "condition": "cargo > 100", "command": {"action": "display", "value": "Heavy"}}
assert parse_code('if ship at 200,200: animate to 300,300 else: show "Off Course"') == {"action": "if-else", "condition": "ship at 200,200", "if_command": {"action": "animate", "coords": "300,300"}, "else_command": {"action": "display", "value": "Off Course"}}