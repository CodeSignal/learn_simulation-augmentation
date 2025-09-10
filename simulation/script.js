class ImageAugmentationPlayground {
    constructor() {
        this.originalImage = null;
        this.canvas = null;
        this.ctx = null;
        this.currentTransform = {
            flipHorizontal: false,
            flipVertical: false,
            rotation: 0,
            crop: 0,
            brightness: 100,
            contrast: 100,
            saturation: 100,
            noise: 0,
            blur: 0
        };
        
        this.initializeElements();
        this.setupEventListeners();
        this.setupHelpModal();
        this.loadSampleImages();
    }

    initializeElements() {
        this.originalImageEl = document.getElementById('originalImage');
        this.augmentedImageEl = document.getElementById('augmentedImage');
        this.imageSelect = document.getElementById('imageSelect');
        
        // Control elements
        this.flipHorizontalBtn = document.getElementById('flipHorizontal');
        this.flipVerticalBtn = document.getElementById('flipVertical');
        this.rotationSlider = document.getElementById('rotationSlider');
        this.rotationValue = document.getElementById('rotationValue');
        this.cropSlider = document.getElementById('cropSlider');
        this.cropValue = document.getElementById('cropValue');
        this.brightnessSlider = document.getElementById('brightnessSlider');
        this.brightnessValue = document.getElementById('brightnessValue');
        this.contrastSlider = document.getElementById('contrastSlider');
        this.contrastValue = document.getElementById('contrastValue');
        this.saturationSlider = document.getElementById('saturationSlider');
        this.saturationValue = document.getElementById('saturationValue');
        this.noiseSlider = document.getElementById('noiseSlider');
        this.noiseValue = document.getElementById('noiseValue');
        this.blurSlider = document.getElementById('blurSlider');
        this.blurValue = document.getElementById('blurValue');
        this.resetBtn = document.getElementById('resetBtn');
        
        // Help modal elements
        this.helpBtn = document.getElementById('helpBtn');
        this.helpModal = document.getElementById('helpModal');
        this.closeBtn = document.querySelector('.close');
    }

    setupEventListeners() {
        // Image selection
        this.imageSelect.addEventListener('change', (e) => {
            this.loadImage(e.target.value);
        });

        // Button controls
        this.flipHorizontalBtn.addEventListener('click', () => {
            this.currentTransform.flipHorizontal = !this.currentTransform.flipHorizontal;
            this.updateButtonState(this.flipHorizontalBtn, this.currentTransform.flipHorizontal);
            this.applyAugmentation();
        });

        this.flipVerticalBtn.addEventListener('click', () => {
            this.currentTransform.flipVertical = !this.currentTransform.flipVertical;
            this.updateButtonState(this.flipVerticalBtn, this.currentTransform.flipVertical);
            this.applyAugmentation();
        });

        // Slider controls
        this.rotationSlider.addEventListener('input', (e) => {
            this.currentTransform.rotation = parseInt(e.target.value);
            this.rotationValue.textContent = `${this.currentTransform.rotation}°`;
            this.applyAugmentation();
        });

        this.cropSlider.addEventListener('input', (e) => {
            this.currentTransform.crop = parseInt(e.target.value);
            this.cropValue.textContent = `${this.currentTransform.crop}%`;
            this.applyAugmentation();
        });

        this.brightnessSlider.addEventListener('input', (e) => {
            this.currentTransform.brightness = parseInt(e.target.value);
            this.brightnessValue.textContent = `${this.currentTransform.brightness}%`;
            this.applyAugmentation();
        });

        this.contrastSlider.addEventListener('input', (e) => {
            this.currentTransform.contrast = parseInt(e.target.value);
            this.contrastValue.textContent = `${this.currentTransform.contrast}%`;
            this.applyAugmentation();
        });

        this.saturationSlider.addEventListener('input', (e) => {
            this.currentTransform.saturation = parseInt(e.target.value);
            this.saturationValue.textContent = `${this.currentTransform.saturation}%`;
            this.applyAugmentation();
        });

        this.noiseSlider.addEventListener('input', (e) => {
            this.currentTransform.noise = parseInt(e.target.value);
            this.noiseValue.textContent = `${this.currentTransform.noise}%`;
            this.applyAugmentation();
        });

        this.blurSlider.addEventListener('input', (e) => {
            this.currentTransform.blur = parseFloat(e.target.value);
            this.blurValue.textContent = `${this.currentTransform.blur}px`;
            this.applyAugmentation();
        });

        // Reset button
        this.resetBtn.addEventListener('click', () => {
            this.resetAll();
        });
    }

    setupHelpModal() {
        // Open help modal
        this.helpBtn.addEventListener('click', () => {
            this.helpModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close help modal
        this.closeBtn.addEventListener('click', () => {
            this.helpModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === this.helpModal) {
                this.helpModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.helpModal.style.display === 'block') {
                this.helpModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    async loadSampleImages() {
        try {
            const response = await fetch('/api/sample-images');
            const images = await response.json();
            
            // Populate the dropdown
            this.imageSelect.innerHTML = '';
            images.forEach((image, index) => {
                const option = document.createElement('option');
                option.value = image.url;
                option.textContent = image.name;
                this.imageSelect.appendChild(option);
            });
            
            // Load the first image
            if (images.length > 0) {
                this.loadImage(images[0].url);
            }
        } catch (error) {
            console.error('Error loading sample images:', error);
            // Fallback to default image
            this.loadImage('/simulation/sample-images/cat.jpg');
        }
    }

    loadImage(src) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            this.originalImage = img;
            this.originalImageEl.src = src;
            this.setupCanvas();
            this.applyAugmentation();
        };
        img.onerror = () => {
            console.error('Error loading image:', src);
            // Create a placeholder image
            this.createPlaceholderImage();
        };
        img.src = src;
    }

    createPlaceholderImage() {
        // Create a simple placeholder if images fail to load
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // Draw a simple placeholder
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, 400, 300);
        ctx.fillStyle = '#666';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Sample Image', 200, 150);
        
        const dataURL = canvas.toDataURL();
        this.originalImageEl.src = dataURL;
        this.augmentedImageEl.src = dataURL;
    }

    setupCanvas() {
        if (this.canvas) {
            this.canvas.remove();
        }
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.originalImage.width;
        this.canvas.height = this.originalImage.height;
        this.ctx = this.canvas.getContext('2d');
    }

    applyAugmentation() {
        if (!this.originalImage || !this.ctx) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Save context state
        this.ctx.save();
        
        // Apply transformations
        this.applyGeometricTransformations();
        this.applyColorAdjustments();
        this.applyNoiseAndBlur();
        
        // Draw the image with cropping
        this.drawImageWithCrop();
        
        // Restore context state
        this.ctx.restore();
        
        // Update the augmented image display
        this.augmentedImageEl.src = this.canvas.toDataURL();
    }

    applyGeometricTransformations() {
        const { flipHorizontal, flipVertical, rotation, crop } = this.currentTransform;
        
        // Center the transformations
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        
        // Apply rotation
        if (rotation !== 0) {
            this.ctx.rotate((rotation * Math.PI) / 180);
        }
        
        // Apply flipping
        if (flipHorizontal) {
            this.ctx.scale(-1, 1);
        }
        if (flipVertical) {
            this.ctx.scale(1, -1);
        }
        
        
        // Translate back to draw from top-left
        this.ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);
    }

    drawImageWithCrop() {
        const { crop } = this.currentTransform;
        
        if (crop > 0) {
            // Calculate crop dimensions
            const cropAmount = crop / 100;
            const cropX = this.originalImage.width * cropAmount / 2;
            const cropY = this.originalImage.height * cropAmount / 2;
            const cropWidth = this.originalImage.width * (1 - cropAmount);
            const cropHeight = this.originalImage.height * (1 - cropAmount);
            
            // Draw only the cropped portion of the image
            this.ctx.drawImage(
                this.originalImage,
                cropX, cropY, cropWidth, cropHeight,  // Source rectangle (what to crop from)
                0, 0, this.canvas.width, this.canvas.height  // Destination rectangle (where to draw)
            );
        } else {
            // Draw the full image
            this.ctx.drawImage(this.originalImage, 0, 0);
        }
    }

    applyColorAdjustments() {
        const { brightness, contrast, saturation } = this.currentTransform;
        
        // Create a filter string
        let filters = [];
        
        if (brightness !== 100) {
            filters.push(`brightness(${brightness}%)`);
        }
        
        if (contrast !== 100) {
            filters.push(`contrast(${contrast}%)`);
        }
        
        if (saturation !== 100) {
            filters.push(`saturate(${saturation}%)`);
        }
        
        if (filters.length > 0) {
            this.ctx.filter = filters.join(' ');
        }
    }

    applyNoiseAndBlur() {
        const { noise, blur } = this.currentTransform;
        
        // Apply blur
        if (blur > 0) {
            this.ctx.filter = (this.ctx.filter || '') + ` blur(${blur}px)`;
        }
        
        // Note: Noise will be applied after drawing the image
        if (noise > 0) {
            this.ctx.globalCompositeOperation = 'multiply';
        }
    }

    addNoise() {
        if (this.currentTransform.noise <= 0) return;
        
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        const noiseIntensity = this.currentTransform.noise / 100;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * noiseIntensity * 255;
            data[i] = Math.max(0, Math.min(255, data[i] + noise));     // Red
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // Green
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // Blue
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }

    updateButtonState(button, isActive) {
        if (isActive) {
            button.style.background = 'linear-gradient(135deg, #149474 0%, #1dcc92 100%)';
            button.style.transform = 'scale(0.98)';
        } else {
            button.style.background = 'linear-gradient(135deg, #1dcc92 0%, #149474 100%)';
            button.style.transform = 'scale(1)';
        }
    }

    resetAll() {
        // Reset transform values
        this.currentTransform = {
            flipHorizontal: false,
            flipVertical: false,
            rotation: 0,
            crop: 0,
            brightness: 100,
            contrast: 100,
            saturation: 100,
            noise: 0,
            blur: 0
        };
        
        // Reset UI elements
        this.rotationSlider.value = 0;
        this.rotationValue.textContent = '0°';
        this.cropSlider.value = 0;
        this.cropValue.textContent = '0%';
        this.brightnessSlider.value = 100;
        this.brightnessValue.textContent = '100%';
        this.contrastSlider.value = 100;
        this.contrastValue.textContent = '100%';
        this.saturationSlider.value = 100;
        this.saturationValue.textContent = '100%';
        this.noiseSlider.value = 0;
        this.noiseValue.textContent = '0%';
        this.blurSlider.value = 0;
        this.blurValue.textContent = '0px';
        
        // Reset button states
        this.updateButtonState(this.flipHorizontalBtn, false);
        this.updateButtonState(this.flipVerticalBtn, false);
        
        // Apply the reset
        this.applyAugmentation();
    }
}

// Initialize the playground when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ImageAugmentationPlayground();
});
