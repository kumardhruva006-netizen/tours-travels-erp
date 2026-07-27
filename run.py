#!/usr/bin/env python
"""
Tours & Travels ERP Management System
Run this file to start the application
"""

import os
from app import create_app, db

# Create the application instance
app = create_app(os.getenv('FLASK_ENV', 'development'))

@app.shell_context_processor
def make_shell_context():
    """Add db to shell context"""
    return {'db': db}

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    print("\n" + "="*50)
    print("Tours & Travels ERP Management System")
    print("="*50)
    print("Server starting at: http://localhost:5000")
    print("Press CTRL+C to stop the server")
    print("="*50 + "\n")
    app.run(debug=True, host='127.0.0.1', port=5000)
