// Generate placeholder images dynamically
const generatePlaceholderImage = (width, height, text, bgColor = '#1e3d94', textColor = '#ffffff') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    
    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.1)');
    gradient.addColorStop(1, 'rgba(30, 61, 148, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.min(width, height) / 8}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Multi-line text
    const lines = text.split('\n');
    const lineHeight = Math.min(width, height) / 6;
    const startY = height / 2 - (lines.length - 1) * lineHeight / 2;
    
    lines.forEach((line, index) => {
        ctx.fillText(line, width / 2, startY + index * lineHeight);
    });
    
    // Add decorative elements
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, width - 40, height - 40);
    
    return canvas.toDataURL();
};

// Generate and set images when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const imageMap = {
        // Product images
        'images/course-ai-mastery.jpg': generatePlaceholderImage(400, 250, 'AI Mastery\nCourse', '#1e3d94'),
        'images/ebook-ai-profits.jpg': generatePlaceholderImage(400, 250, 'AI Profits\nEbook', '#2855c4'),
        'images/course-freelancer.jpg': generatePlaceholderImage(400, 250, 'Freelancer\nBlueprint', '#152b6b'),
        'images/bundle-complete.jpg': generatePlaceholderImage(400, 250, 'Complete\nBundle', '#1e3d94'),
        
        // Tool images
        'images/tool-chatgpt.png': generatePlaceholderImage(80, 80, 'GPT', '#10a37f'),
        'images/tool-midjourney.png': generatePlaceholderImage(80, 80, 'MJ', '#000000'),
        'images/tool-copy-ai.png': generatePlaceholderImage(80, 80, 'C.AI', '#6366f1'),
        'images/tool-notion-ai.png': generatePlaceholderImage(80, 80, 'N.AI', '#000000'),
        
        // Testimonial images
        'images/testimonial-1.jpg': generatePlaceholderImage(100, 100, 'SJ', '#1e3d94'),
        'images/testimonial-2.jpg': generatePlaceholderImage(100, 100, 'MC', '#ffd700'),
        'images/testimonial-3.jpg': generatePlaceholderImage(100, 100, 'ER', '#1e3d94'),
        
        // Blog images
        'images/blog-1.jpg': generatePlaceholderImage(400, 200, 'AI Trends\n2024', '#1e3d94'),
        'images/blog-2.jpg': generatePlaceholderImage(400, 200, 'AI Tools\nBusiness', '#2855c4'),
        'images/blog-3.jpg': generatePlaceholderImage(400, 200, 'Success\nStory', '#152b6b')
    };
    
    // Set generated images
    Object.entries(imageMap).forEach(([src, dataUrl]) => {
        const images = document.querySelectorAll(`img[src="${src}"]`);
        images.forEach(img => {
            img.src = dataUrl;
            img.style.backgroundColor = '#f3f4f6';
        });
    });
    
    // Handle hero image differently (it's a PNG, not generated)
    const heroImage = document.querySelector('img[src="images/hero-ai.png"]');
    if (heroImage) {
        // Create a more complex hero image
        const heroCanvas = document.createElement('canvas');
        const heroCtx = heroCanvas.getContext('2d');
        
        heroCanvas.width = 600;
        heroCanvas.height = 400;
        
        // Gradient background
        const heroGradient = heroCtx.createLinearGradient(0, 0, 600, 400);
        heroGradient.addColorStop(0, '#1e3d94');
        heroGradient.addColorStop(1, '#152b6b');
        heroCtx.fillStyle = heroGradient;
        heroCtx.fillRect(0, 0, 600, 400);
        
        // AI Brain visualization
        heroCtx.strokeStyle = '#ffd700';
        heroCtx.lineWidth = 3;
        heroCtx.beginPath();
        heroCtx.arc(300, 200, 80, 0, 2 * Math.PI);
        heroCtx.stroke();
        
        heroCtx.strokeStyle = '#ffffff';
        heroCtx.lineWidth = 2;
        heroCtx.beginPath();
        heroCtx.arc(300, 200, 60, 0, 2 * Math.PI);
        heroCtx.stroke();
        
        // Central core
        heroCtx.fillStyle = '#ffd700';
        heroCtx.beginPath();
        heroCtx.arc(300, 200, 20, 0, 2 * Math.PI);
        heroCtx.fill();
        
        // Neural connections
        heroCtx.strokeStyle = '#ffffff';
        heroCtx.lineWidth = 2;
        heroCtx.globalAlpha = 0.6;
        
        const connections = [
            [300, 120, 250, 80],
            [300, 120, 350, 80],
            [300, 280, 250, 320],
            [300, 280, 350, 320],
            [220, 200, 170, 180],
            [220, 200, 170, 220],
            [380, 200, 430, 180],
            [380, 200, 430, 220]
        ];
        
        connections.forEach(([x1, y1, x2, y2]) => {
            heroCtx.beginPath();
            heroCtx.moveTo(x1, y1);
            heroCtx.lineTo(x2, y2);
            heroCtx.stroke();
        });
        
        // Node points
        heroCtx.globalAlpha = 1;
        heroCtx.fillStyle = '#ffd700';
        const nodes = [
            [250, 80], [350, 80], [250, 320], [350, 320],
            [170, 180], [170, 220], [430, 180], [430, 220]
        ];
        
        nodes.forEach(([x, y]) => {
            heroCtx.beginPath();
            heroCtx.arc(x, y, 8, 0, 2 * Math.PI);
            heroCtx.fill();
        });
        
        // Add text overlay
        heroCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        heroCtx.font = 'bold 24px Inter, Arial, sans-serif';
        heroCtx.textAlign = 'center';
        heroCtx.fillText('AI-Powered Success', 300, 350);
        
        heroImage.src = heroCanvas.toDataURL();
    }
    
    console.log('Placeholder images generated successfully!');
});

// Also create a fallback for missing images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            if (!this.dataset.fallbackSet) {
                this.dataset.fallbackSet = 'true';
                
                // Determine image type and size
                const rect = this.getBoundingClientRect();
                const width = rect.width || 400;
                const height = rect.height || 250;
                const text = this.alt || 'Image';
                
                this.src = generatePlaceholderImage(width, height, text, '#1e3d94', '#ffffff');
            }
        });
    });
});