#!/usr/bin/env python3
"""
Image Augmentation Playground Server

A simple HTTP server for the Image Augmentation Playground simulation.
"""

import http.server
import socketserver
import os
import sys
import json
from pathlib import Path
from urllib.parse import urlparse

# Configuration
PORT = 3000
HOST = "0.0.0.0"

class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Simple request handler with CORS support."""
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        """Handle GET requests."""
        parsed_path = urlparse(self.path)
        
        # API endpoints
        if parsed_path.path == '/api/sample-images':
            self.handle_sample_images()
            return
        elif parsed_path.path == '/api/health':
            self.handle_health()
            return
        
        # Serve static files
        super().do_GET()
    
    def handle_sample_images(self):
        """API endpoint to get available sample images."""
        try:
            sample_images_dir = Path("sample-images")
            
            if not sample_images_dir.exists():
                sample_images_dir.mkdir(parents=True, exist_ok=True)
                self.create_sample_images()
            
            # Get list of image files
            image_files = []
            for file_path in sample_images_dir.iterdir():
                if file_path.is_file() and file_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
                    image_files.append({
                        'filename': file_path.name,
                        'name': file_path.stem.replace('_', ' ').replace('-', ' ').title(),
                        'url': f'/sample-images/{file_path.name}'
                    })
            
            # Sort by name
            image_files.sort(key=lambda x: x['name'])
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(image_files).encode())
            
        except Exception as e:
            print(f"Error in handle_sample_images: {e}")
            self.send_error(500, "Internal server error")
    
    def handle_health(self):
        """Health check endpoint."""
        health_data = {
            'status': 'healthy',
            'service': 'Image Augmentation Playground'
        }
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(health_data).encode())
    
    def create_sample_images(self):
        """Check for existing sample images."""
        sample_images_dir = Path("sample-images")
        
        # Just check what images exist - don't create any new ones
        existing_images = []
        for file_path in sample_images_dir.iterdir():
            if file_path.is_file() and file_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
                existing_images.append(file_path.name)
        
        if existing_images:
            print(f"✅ Found existing images: {', '.join(existing_images)}")
        else:
            print("ℹ️  No sample images found. Add JPG/PNG files to sample-images/ directory")
    
    def log_message(self, format, *args):
        """Custom log format."""
        print(f"[{self.log_date_time_string()}] {format % args}")

def main():
    """Main server function."""
    print("🖼️  Image Augmentation Playground Server")
    print("=" * 50)
    
    # Change to the simulation directory
    simulation_dir = Path(__file__).parent / "simulation"
    if not simulation_dir.exists():
        print(f"Error: Simulation directory not found: {simulation_dir}")
        sys.exit(1)
    
    # Remove the nested simulation directory if it exists
    nested_sim_dir = simulation_dir / "simulation"
    if nested_sim_dir.exists():
        print(f"Removing nested simulation directory: {nested_sim_dir}")
        import shutil
        shutil.rmtree(nested_sim_dir)
    
    os.chdir(simulation_dir)
    print(f"Serving from: {simulation_dir.absolute()}")
    
    # Create the server
    try:
        with socketserver.TCPServer((HOST, PORT), SimpleHTTPRequestHandler) as httpd:
            print(f"🚀 Server running at http://{HOST}:{PORT}")
            print(f"🌐 Open your browser and navigate to: http://localhost:{PORT}")
            print("📱 The simulation works on desktop and mobile devices")
            print("\n💡 Features:")
            print("   • Interactive image augmentation techniques")
            print("   • Real-time visual feedback")
            print("   • Multiple sample images to experiment with")
            print("   • Geometric transformations (flip, rotate, crop)")
            print("   • Color adjustments (brightness, contrast, saturation)")
            print("   • Noise and blur effects")
            print("\n⌨️  Press Ctrl+C to stop the server")
            print("=" * 50)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: Port {PORT} is already in use")
            print(f"   Try a different port or stop the process using port {PORT}")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()