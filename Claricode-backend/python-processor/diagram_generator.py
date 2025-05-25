import sys
import json
from graphviz import Digraph

def generate_class_diagram(metadata, output_file):
    dot = Digraph(comment='Class Diagram')

    for cls in metadata.get('classes', []):
        label = f"{cls['name']}\\nMethods:\\n" + "\\n".join(cls['methods'])
        dot.node(cls['name'], label=label, shape='rectangle')

    # (Optional) Add edges for inheritance if available in metadata

    dot.render(output_file, format='png')

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(json.dumps({'error': 'Expected metadata file and output file'}))
        sys.exit(1)

    metadata_file = sys.argv[1]
    output_file = sys.argv[2]

    try:
        with open(metadata_file, 'r') as f:
            metadata = json.load(f)
        generate_class_diagram(metadata, output_file)
        print(json.dumps({'success': True, 'output': output_file + '.png'}))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)
