# Image Augmentation Playground

An interactive, web-based simulation for exploring image augmentation techniques used in machine learning and computer vision. This simulation helps learners understand how different augmentation methods transform images and their impact on model training.

## Features

### 🖼️ Interactive Image Display
- **Side-by-side comparison**: Original and augmented images displayed simultaneously
- **Real-time updates**: See changes instantly as you adjust parameters
- **Multiple sample images**: Choose from different image types to experiment with

### 🔧 Augmentation Techniques

#### Geometric Transformations
- **Flip Horizontal/Vertical**: Mirror images across axes
- **Rotation**: Rotate images by any angle (-180° to 180°)
- **Cropping**: Simulate center cropping with adjustable intensity

#### Color Adjustments
- **Brightness**: Adjust image brightness (0% to 200%)
- **Contrast**: Modify image contrast for better visibility
- **Saturation**: Control color intensity and vibrancy

#### Noise & Blur Effects
- **Noise**: Add random noise to simulate real-world imperfections
- **Blur**: Apply Gaussian blur effects

### 🎮 Interactive Controls
- **Slider controls**: Fine-tune augmentation parameters with real-time feedback
- **Toggle buttons**: Quick on/off for flip transformations
- **Reset functionality**: Return all parameters to default values
- **Image selector**: Switch between different sample images

### 📚 Educational Features
- **Learning tips**: Built-in guidance on when and why to use each technique
- **Visual feedback**: Immediate understanding of parameter effects
- **Best practices**: Information about combining techniques effectively

## Setup

### Prerequisites
- Python 3.6 or higher

### Local Development

1. **Clone or navigate to the simulation directory**:
   ```bash
   cd image-augmentation-playground
   ```

2. **Start the server**:
   ```bash
   python3 server.py
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### CodeSignal Deployment

For CodeSignal Learn platform deployment:

1. **Download the distribution package**:
   ```bash
   wget https://github.com/your-username/image-augmentation-playground/releases/latest/download/image-augmentation-playground.tar.gz
   ```

2. **Extract the package**:
   ```bash
   tar xvzf image-augmentation-playground.tar.gz
   ```

3. **Start the server**:
   ```bash
   python3 server.py
   ```

The simulation will be available at the provided URL.

## Usage

### Getting Started
1. **Choose an image**: Select from the dropdown menu (Cat, Dog, Building, Landscape)
2. **Apply augmentations**: Use the controls to transform the image
3. **Compare results**: See original vs augmented images side by side
4. **Experiment**: Try different combinations of techniques
5. **Reset**: Use the reset button to start over

### Understanding the Techniques

#### When to Use Geometric Transformations
- **Flipping**: When object orientation doesn't matter (e.g., faces, objects)
- **Rotation**: For objects that can appear in any orientation
- **Cropping**: To focus on important parts of the image

#### When to Use Color Adjustments
- **Brightness**: To handle different lighting conditions
- **Contrast**: To improve feature visibility
- **Saturation**: To handle different color conditions

#### When to Use Noise & Blur
- **Noise**: To make models robust to sensor noise
- **Blur**: To handle motion blur or focus issues

### Best Practices
- **Start simple**: Begin with one technique at a time
- **Combine techniques**: Use multiple augmentations for more diverse training data
- **Consider your domain**: Different techniques work better for different types of images
- **Monitor performance**: Always validate that augmentations improve model performance

## Technical Details

### Architecture
- **Backend**: Python HTTP server with CORS support
- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Image Processing**: HTML5 Canvas API for real-time transformations
- **Port**: Serves on `localhost:3000`

### Browser Compatibility
- Modern browsers with HTML5 Canvas support
- Works on desktop and mobile devices
- Responsive design for different screen sizes

### File Structure
```
image-augmentation-playground/
├── server.py                 # Python HTTP server
├── README.md                # This file
└── simulation/
    ├── index.html           # Main HTML interface
    ├── style.css            # Styling and responsive design
    ├── script.js            # Augmentation logic and interactions
    └── sample-images/       # Sample images for experimentation
        ├── cat.jpg
        ├── dog.jpg
        ├── building.jpg
        └── landscape.jpg
```

## Learning Outcomes

After using this simulation, learners will understand:

1. **How different augmentation techniques work** and their visual effects
2. **When to apply specific techniques** based on the problem domain
3. **The impact of parameter tuning** on augmentation results
4. **How to combine multiple techniques** for effective data augmentation
5. **Real-world applications** of image augmentation in machine learning

## Contributing

This simulation is part of the Learn Bespoke Simulations collection. To contribute:

1. Follow the existing code patterns and educational philosophy
2. Ensure all changes maintain the interactive, visual-first approach
3. Test on multiple browsers and devices
4. Update documentation for any new features

## License

Part of the Learn Bespoke Simulations project for educational use.
