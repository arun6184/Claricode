import sys
import ast
import json

def parse_ast(file_path):
    with open(file_path, 'r') as f:
        source = f.read()

    tree = ast.parse(source)
    funcs = []
    classes = []

    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            funcs.append({
                'name': node.name,
                'lineno': node.lineno,
                'args': [arg.arg for arg in node.args.args]
            })
        elif isinstance(node, ast.ClassDef):
            classes.append({
                'name': node.name,
                'lineno': node.lineno,
                'methods': [n.name for n in node.body if isinstance(n, ast.FunctionDef)]
            })

    return {
        'functions': funcs,
        'classes': classes,
    }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({'error': 'File path argument required'}))
        sys.exit(1)

    try:
        metadata = parse_ast(sys.argv[1])
        print(json.dumps(metadata))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)
