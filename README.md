# Velocity - Retro Sensor Dashboard 🎮

A pixel-perfect, retro-themed website that displays real-time device sensor data in a stunning 8-bit aesthetic. Built with pure HTML, CSS, and JavaScript - no frameworks required!

## ✨ Features

### 🎨 Design
- **VT323 Retro Font** - Authentic pixel-style typography
- **Light/Dark Mode Toggle** - Switch between classic light mode and terminal-style dark mode
- **Masonry Grid Layout** - Aesthetic, Pinterest-style responsive layout
- **8-bit Pixel Art** - Custom pixel art illustrations for visual appeal
- **Smooth Animations** - Glitch effects, bouncing icons, scanlines, and more
- **Responsive Design** - Works on desktop, tablet, and mobile

### 📊 30+ Sensor Features

1. **Battery** - Level, charging status, time remaining
2. **Brightness** - Estimated screen brightness
3. **Volume** - Media volume level
4. **Network Speed** - Download/upload speeds, ping
5. **GPS Location** - Real-time coordinates
6. **GPS Speed** - Movement speed in km/h
7. **Altitude** - Height above sea level
8. **Device Orientation** - Alpha, beta, gamma angles
9. **Device Motion** - Acceleration on X, Y, Z axes
10. **Compass** - Magnetic heading with visual compass
11. **Current Time** - Real-time clock with timezone
12. **Memory Usage** - JavaScript heap memory stats
13. **CPU Cores** - Logical processor count
14. **Screen Info** - Resolution, color depth, pixel ratio
15. **Touch Support** - Max touch points detection
16. **Online Status** - Internet connection state
17. **Language** - Browser language and locale
18. **Platform** - Operating system and user agent
19. **Viewport** - Window dimensions
20. **Connection Type** - Network type (4G, WiFi, etc.)
21. **Data Saver Mode** - Data saving preference
22. **Ambient Light** - Light sensor (if available)
23. **Proximity Sensor** - Proximity detection (if available)
24. **Vibration Support** - Haptic feedback capability
25. **WebGL Support** - 3D graphics capability
26. **Cookies** - Cookie support status
27. **Do Not Track** - Privacy preference
28. **Hardware Concurrency** - CPU thread count
29. **GPS Accuracy** - Location accuracy in meters
30. **Timezone** - Current timezone with UTC offset
31. **Page Load Time** - Performance metrics

## 🚀 Quick Start

Simply open `index.html` in any modern web browser. No build process or dependencies required!

```bash
# Clone the repository
git clone https://github.com/navuxneeth/Velocity.git

# Navigate to the directory
cd Velocity

# Open in browser
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

### Using a Local Server

For best results (especially for sensor permissions), serve via HTTP:

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js (with http-server)
npx http-server -p 8080
```

Then open `http://localhost:8080` in your browser.

## 🎮 Usage

- **Theme Toggle**: Click the sun/moon button in the header to switch between light and dark modes
- **Sensor Permissions**: Some sensors (especially on iOS) require user permission. Click "GRANT ACCESS" when prompted
- **Test Vibration**: On supported devices, click the "TEST VIBRATION" button to feel haptic feedback
- **Real-time Updates**: Most sensors update automatically in real-time

## 🌐 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Battery API | ✅ | ✅ | ❌ | ✅ |
| Geolocation | ✅ | ✅ | ✅ | ✅ |
| Device Orientation | ✅ | ✅ | ✅* | ✅ |
| Device Motion | ✅ | ✅ | ✅* | ✅ |
| Network Information | ✅ | ❌ | ❌ | ✅ |
| Memory API | ✅ | ❌ | ❌ | ✅ |
| Ambient Light | ❌ | ❌ | ❌ | ❌ |
| Proximity | ❌ | ❌ | ❌ | ❌ |

*Requires user permission on iOS 13+

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css` to customize the color scheme:

```css
:root {
    --accent: #00ff00;        /* Primary accent color */
    --accent-secondary: #ff00ff; /* Secondary accent */
    --bg-primary: #f0f0f0;    /* Background color */
}
```

### Adding New Sensors
1. Add a new sensor definition in `script.js`
2. Implement `init` and `update` functions
3. The card will be automatically created and added to the grid

## 📱 Screenshots

### Light Mode
![Light Mode](https://github.com/user-attachments/assets/5bcdc3a5-a198-4a33-8ac2-8edcc12a60eb)

### Dark Mode
![Dark Mode](https://github.com/user-attachments/assets/ae913d62-6162-462b-a97b-d7d67f56ebf6)

## 🔒 Privacy

All sensor data is processed locally in your browser. No data is sent to any server. The application is completely client-side and works offline (after initial load).

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Web APIs** - Battery, Geolocation, Device Orientation, Network Information, Performance, and more

## 📄 License

MIT License - feel free to use this project for any purpose!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new sensor features
- Improve the design
- Fix bugs
- Enhance browser compatibility

## 👨‍💻 Author

Built with 8-bit love 💾

## 🌟 Acknowledgments

- VT323 font by Google Fonts
- Inspired by retro terminal aesthetics and 8-bit gaming