import sys
import ast
import json

def extract_metadata(file_path):
    with open(file_path, 'r') as f:
        source = f.read()

    tree = ast.parse(source)
    functions = []
    classes = []
    comments = []

    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            functions.append(node.name)
        elif isinstance(node, ast.ClassDef):
            classes.append(node.name)
        elif isinstance(node, ast.Expr) and isinstance(node.value, ast.Str):
            comments.append(node.value.s)

    metadata = [{
        "path": file_path,
        "functions": functions,
        "classes": classes,
        "comments": comments,
    }]

    return metadata

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "File path argument required"}))
        sys.exit(1)

    file_path = sys.argv[1]
    try:
        metadata = extract_metadata(file_path)
        print(json.dumps(metadata))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
