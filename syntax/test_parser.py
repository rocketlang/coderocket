def parse_code(code):
    # Handle variable manipulation
    if "set" in code and "to" in code:
        parts = code.split(" to ")
        variable = parts[0].split(" ")[1]
        value = int(parts[1])
        return {"action": "set", "variable": variable, "value": value}
    if "add" in code and "to" in code:
        parts = code.split(" to ")
        variable = parts[1]
        value = int(parts[0].split(" ")[1])
        return {"action": "add", "variable": variable, "value": value}

    # Handle display commands
    if "show" in code or "dikhao" in code:
        return {"action": "display", "value": code.split('"')[1]}

    # Handle function creation
    if "make function" in code:
        return {"action": "function", "name": code.split(":")[0].split()[-1]}

    # Handle animation
    if "animate" in code:
        return {"action": "animate", "coords": code.split("to")[-1].strip()}

    # Handle loops
    if "loop" in code:
        parts = code.split(": ")
        times = int(parts[0].split(" ")[1])
        nested_command = parts[1]
        # Check for nested loop
        if "loop" in nested_command:
            nested_times = int(nested_command.split(" ")[1])
            nested_inner = nested_command.split(": ")[1]
            return {
                "action": "loop",
                "times": times,
                "command": {
                    "action": "loop",
                    "times": nested_times,
                    "command": parse_code(nested_inner)
                }
            }
        return {"action": "loop", "times": times, "command": parse_code(nested_command)}

    # Handle conditionals
    if "if" in code:
        if "else" in code:
            condition = code.split(": ")[0].split("if ")[1]
            if_part = code.split(": ")[1].split(" else: ")[0]
            else_part = code.split(" else: ")[1]
            return {
                "action": "if-else",
                "condition": condition,
                "if_command": parse_code(if_part),
                "else_command": parse_code(else_part)
            }
        else:
            condition = code.split(": ")[0].split("if ")[1]
            command = code.split(": ")[1]
            return {"action": "if", "condition": condition, "command": parse_code(command)}
    return None

# Test cases
assert parse_code('show "Hello" on screen') == {"action": "display", "value": "Hello"}
assert parse_code('make function pay: connect razorpay_api') == {"action": "function", "name": "pay"}
assert parse_code('animate ship to 200,200') == {"action": "animate", "coords": "200,200"}
assert parse_code('loop 3 times: loop 2 times: show "Cargo Check"') == {
    "action": "loop",
    "times": 3,
    "command": {
        "action": "loop",
        "times": 2,
        "command": {"action": "display", "value": "Cargo Check"}
    }
}
assert parse_code('if cargo > 100 and fuel < 50: show "Alert"') == {
    "action": "if",
    "condition": "cargo > 100 and fuel < 50",
    "command": {"action": "display", "value": "Alert"}
}
assert parse_code('set speed to 15') == {"action": "set", "variable": "speed", "value": 15}
assert parse_code('add 10 to speed') == {"action": "add", "variable": "speed", "value": 10}
print("Tests passed!")