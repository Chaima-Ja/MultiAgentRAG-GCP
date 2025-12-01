"""Simple Flask app to serve the UI."""
from flask import Flask, send_from_directory, render_template_string
import os

app = Flask(__name__, static_folder='static', static_url_path='')

API_ENDPOINT = os.environ.get('API_ENDPOINT', 'https://YOUR-API-ENDPOINT.run.app')

@app.route('/')
def index():
    """Serve the main UI page with API endpoint injected."""
    html_path = os.path.join(os.path.dirname(__file__), 'static', 'index.html')
    with open(html_path, 'r') as f:
        html = f.read()
    
    script_tag = f'<script>window.API_ENDPOINT = "{API_ENDPOINT}";</script>'
    html = html.replace('</head>', f'{script_tag}</head>')
    
    return html

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files."""
    return send_from_directory('static', path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)

