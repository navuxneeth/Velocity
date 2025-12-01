// Sensor Dashboard - Main JavaScript

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Initialize theme
if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeIcon.textContent = isDarkMode ? '🌙' : '☀️';
});

// Sensor Grid
const sensorGrid = document.getElementById('sensorGrid');

// Sensor Definitions with 31 features
const sensors = [
    {
        id: 'battery',
        icon: '🔋',
        title: 'Battery',
        size: 'medium',
        init: initBattery,
        update: updateBattery
    },
    {
        id: 'brightness',
        icon: '💡',
        title: 'Brightness',
        size: 'small',
        init: initBrightness,
        update: updateBrightness
    },
    {
        id: 'volume',
        icon: '🔊',
        title: 'Volume',
        size: 'small',
        init: initVolume,
        update: updateVolume
    },
    {
        id: 'network',
        icon: '📡',
        title: 'Network',
        size: 'large',
        init: initNetwork,
        update: updateNetwork
    },
    {
        id: 'gps',
        icon: '🗺️',
        title: 'GPS Location',
        size: 'large',
        init: initGPS,
        update: updateGPS
    },
    {
        id: 'speed',
        icon: '⚡',
        title: 'GPS Speed',
        size: 'medium',
        init: initSpeed,
        update: updateSpeed
    },
    {
        id: 'altitude',
        icon: '⛰️',
        title: 'Altitude',
        size: 'small',
        init: initAltitude,
        update: updateAltitude
    },
    {
        id: 'orientation',
        icon: '🧭',
        title: 'Orientation',
        size: 'large',
        init: initOrientation,
        update: updateOrientation
    },
    {
        id: 'motion',
        icon: '📳',
        title: 'Motion',
        size: 'medium',
        init: initMotion,
        update: updateMotion
    },
    {
        id: 'compass',
        icon: '🧭',
        title: 'Compass',
        size: 'medium',
        init: initCompass,
        update: updateCompass
    },
    {
        id: 'time',
        icon: '🕐',
        title: 'Time',
        size: 'medium',
        init: initTime,
        update: updateTime
    },
    {
        id: 'memory',
        icon: '💾',
        title: 'Memory',
        size: 'medium',
        init: initMemory,
        update: updateMemory
    },
    {
        id: 'cpu',
        icon: '🖥️',
        title: 'CPU',
        size: 'small',
        init: initCPU,
        update: updateCPU
    },
    {
        id: 'screen',
        icon: '🖼️',
        title: 'Screen',
        size: 'medium',
        init: initScreen,
        update: updateScreen
    },
    {
        id: 'touch',
        icon: '👆',
        title: 'Touch',
        size: 'small',
        init: initTouch,
        update: updateTouch
    },
    {
        id: 'online',
        icon: '🌐',
        title: 'Connection',
        size: 'small',
        init: initOnline,
        update: updateOnline
    },
    {
        id: 'language',
        icon: '🗣️',
        title: 'Language',
        size: 'small',
        init: initLanguage,
        update: updateLanguage
    },
    {
        id: 'platform',
        icon: '💻',
        title: 'Platform',
        size: 'medium',
        init: initPlatform,
        update: updatePlatform
    },
    {
        id: 'viewport',
        icon: '📐',
        title: 'Viewport',
        size: 'small',
        init: initViewport,
        update: updateViewport
    },
    {
        id: 'connection-type',
        icon: '📶',
        title: 'Connection Type',
        size: 'small',
        init: initConnectionType,
        update: updateConnectionType
    },
    {
        id: 'data-saver',
        icon: '💰',
        title: 'Data Saver',
        size: 'small',
        init: initDataSaver,
        update: updateDataSaver
    },
    {
        id: 'ambient-light',
        icon: '🌞',
        title: 'Ambient Light',
        size: 'small',
        init: initAmbientLight,
        update: updateAmbientLight
    },
    {
        id: 'proximity',
        icon: '👋',
        title: 'Proximity',
        size: 'small',
        init: initProximity,
        update: updateProximity
    },
    {
        id: 'vibration',
        icon: '📲',
        title: 'Vibration',
        size: 'small',
        init: initVibration,
        update: updateVibration
    },
    {
        id: 'webgl',
        icon: '🎮',
        title: 'WebGL',
        size: 'small',
        init: initWebGL,
        update: updateWebGL
    },
    {
        id: 'cookies',
        icon: '🍪',
        title: 'Cookies',
        size: 'small',
        init: initCookies,
        update: updateCookies
    },
    {
        id: 'dnt',
        icon: '🕵️',
        title: 'Do Not Track',
        size: 'small',
        init: initDNT,
        update: updateDNT
    },
    {
        id: 'hardware',
        icon: '⚙️',
        title: 'Hardware',
        size: 'small',
        init: initHardware,
        update: updateHardware
    },
    {
        id: 'geolocation-accuracy',
        icon: '🎯',
        title: 'GPS Accuracy',
        size: 'small',
        init: initGeolocationAccuracy,
        update: updateGeolocationAccuracy
    },
    {
        id: 'timezone',
        icon: '🌍',
        title: 'Timezone',
        size: 'small',
        init: initTimezone,
        update: updateTimezone
    },
    {
        id: 'page-load',
        icon: '⏱️',
        title: 'Page Load',
        size: 'small',
        init: initPageLoad,
        update: updatePageLoad
    }
];

// Create sensor cards
function createSensorCard(sensor) {
    const card = document.createElement('div');
    card.className = `sensor-card size-${sensor.size}`;
    card.id = `sensor-${sensor.id}`;
    
    card.innerHTML = `
        <div class="sensor-header">
            <span class="sensor-icon">${sensor.icon}</span>
            <h3 class="sensor-title">${sensor.title}</h3>
        </div>
        <div class="sensor-content">
            <div class="loading">Initializing...</div>
        </div>
    `;
    
    sensorGrid.appendChild(card);
    return card;
}

// Initialize all sensors
sensors.forEach(sensor => {
    createSensorCard(sensor);
    if (sensor.init) {
        setTimeout(() => sensor.init(sensor.id), 100);
    }
});

// Helper function to update sensor content
function updateSensorContent(sensorId, html) {
    const card = document.getElementById(`sensor-${sensorId}`);
    if (card) {
        const content = card.querySelector('.sensor-content');
        content.innerHTML = html;
    }
}

// 1. Battery
function initBattery(sensorId) {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            updateBattery(sensorId, battery);
            battery.addEventListener('levelchange', () => updateBattery(sensorId, battery));
            battery.addEventListener('chargingchange', () => updateBattery(sensorId, battery));
        });
    } else {
        updateSensorContent(sensorId, '<div class="error">Battery API not supported</div>');
    }
}

function updateBattery(sensorId, battery) {
    const level = Math.round(battery.level * 100);
    const charging = battery.charging;
    const chargingTime = battery.chargingTime;
    const dischargingTime = battery.dischargingTime;
    
    const html = `
        <div class="sensor-value">${level}%</div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${level}%">${level}%</div>
        </div>
        <div class="sensor-details">
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Status:</span>
                <span class="sensor-detail-value">${charging ? '🔌 Charging' : '🔋 Discharging'}</span>
            </div>
            ${chargingTime !== Infinity ? `
                <div class="sensor-detail-item">
                    <span class="sensor-detail-label">Time to full:</span>
                    <span class="sensor-detail-value">${Math.round(chargingTime / 60)}m</span>
                </div>
            ` : ''}
            ${dischargingTime !== Infinity && !charging ? `
                <div class="sensor-detail-item">
                    <span class="sensor-detail-label">Time remaining:</span>
                    <span class="sensor-detail-value">${Math.round(dischargingTime / 60)}m</span>
                </div>
            ` : ''}
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 2. Brightness (Screen Brightness - simulated)
function initBrightness(sensorId) {
    updateBrightness(sensorId);
}

function updateBrightness(sensorId) {
    // Note: Real screen brightness API is not widely supported
    // This shows a simulated value based on theme
    const brightness = isDarkMode ? 30 : 80;
    
    const html = `
        <div class="sensor-value">${brightness}%</div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${brightness}%"></div>
        </div>
        <div class="sensor-label">Estimated (${isDarkMode ? 'Dark' : 'Light'} Mode)</div>
    `;
    updateSensorContent(sensorId, html);
}

// 3. Volume (simulated - browser cannot directly access system volume)
function initVolume(sensorId) {
    updateVolume(sensorId);
}

function updateVolume(sensorId) {
    const volume = 75; // Simulated
    
    const html = `
        <div class="sensor-value">${volume}%</div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${volume}%"></div>
        </div>
        <div class="sensor-label">Media Volume (Simulated)</div>
    `;
    updateSensorContent(sensorId, html);
}

// 4. Network Speed
let networkData = { download: 0, upload: 0, ping: 0 };

function initNetwork(sensorId) {
    updateNetwork(sensorId);
    // Simulate network speed updates
    setInterval(() => {
        if (navigator.onLine) {
            // Simulated network speed
            networkData.download = (Math.random() * 100 + 20).toFixed(2);
            networkData.upload = (Math.random() * 50 + 10).toFixed(2);
            networkData.ping = Math.floor(Math.random() * 50 + 10);
            updateNetwork(sensorId);
        }
    }, 3000);
}

function updateNetwork(sensorId) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const effectiveType = connection ? connection.effectiveType : 'Unknown';
    const downlink = connection ? connection.downlink : 'N/A';
    
    const html = `
        <div class="sensor-details">
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Download:</span>
                <span class="sensor-detail-value">${networkData.download} Mbps</span>
            </div>
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Upload:</span>
                <span class="sensor-detail-value">${networkData.upload} Mbps</span>
            </div>
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Ping:</span>
                <span class="sensor-detail-value">${networkData.ping} ms</span>
            </div>
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Type:</span>
                <span class="sensor-detail-value">${effectiveType}</span>
            </div>
            ${downlink !== 'N/A' ? `
                <div class="sensor-detail-item">
                    <span class="sensor-detail-label">Downlink:</span>
                    <span class="sensor-detail-value">${downlink} Mbps</span>
                </div>
            ` : ''}
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 5. GPS Location
let gpsData = null;

function initGPS(sensorId) {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                gpsData = position;
                updateGPS(sensorId, position);
            },
            error => {
                updateSensorContent(sensorId, `<div class="error">Location access denied or unavailable</div>`);
            }
        );
        
        navigator.geolocation.watchPosition(
            position => {
                gpsData = position;
                updateGPS(sensorId, position);
            },
            null,
            { enableHighAccuracy: true }
        );
    } else {
        updateSensorContent(sensorId, '<div class="error">Geolocation not supported</div>');
    }
}

function updateGPS(sensorId, position) {
    const lat = position.coords.latitude.toFixed(6);
    const lon = position.coords.longitude.toFixed(6);
    
    const html = `
        <div class="coordinates">
            <div>LAT: ${lat}</div>
            <div>LON: ${lon}</div>
        </div>
        <div class="sensor-details">
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Accuracy:</span>
                <span class="sensor-detail-value">${position.coords.accuracy.toFixed(1)}m</span>
            </div>
            ${position.coords.altitude ? `
                <div class="sensor-detail-item">
                    <span class="sensor-detail-label">Altitude:</span>
                    <span class="sensor-detail-value">${position.coords.altitude.toFixed(1)}m</span>
                </div>
            ` : ''}
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 6. GPS Speed
function initSpeed(sensorId) {
    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(
            position => updateSpeed(sensorId, position),
            null,
            { enableHighAccuracy: true }
        );
    } else {
        updateSensorContent(sensorId, '<div class="error">Geolocation not supported</div>');
    }
}

function updateSpeed(sensorId, position) {
    const speed = position.coords.speed;
    const speedKmh = speed !== null ? (speed * 3.6).toFixed(1) : '0.0';
    
    const html = `
        <div class="speed-indicator">
            <div class="speed-value">${speedKmh}</div>
            <div class="speed-unit">km/h</div>
        </div>
        <div class="sensor-label">${speed !== null ? 'Moving' : 'Stationary'}</div>
    `;
    updateSensorContent(sensorId, html);
}

// 7. Altitude
function initAltitude(sensorId) {
    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(
            position => updateAltitude(sensorId, position),
            null,
            { enableHighAccuracy: true }
        );
    } else {
        updateSensorContent(sensorId, '<div class="error">Geolocation not supported</div>');
    }
}

function updateAltitude(sensorId, position) {
    const altitude = position.coords.altitude;
    const altitudeAccuracy = position.coords.altitudeAccuracy;
    
    const html = `
        <div class="sensor-value">${altitude !== null ? altitude.toFixed(1) : 'N/A'}</div>
        <div class="sensor-label">meters</div>
        ${altitudeAccuracy ? `
            <div class="sensor-details">
                <div class="sensor-detail-item">
                    <span class="sensor-detail-label">Accuracy:</span>
                    <span class="sensor-detail-value">±${altitudeAccuracy.toFixed(1)}m</span>
                </div>
            </div>
        ` : ''}
    `;
    updateSensorContent(sensorId, html);
}

// 8. Device Orientation
function initOrientation(sensorId) {
    if (window.DeviceOrientationEvent) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            // iOS 13+ requires permission
            updateSensorContent(sensorId, `
                <button class="pixel-button" onclick="requestOrientationPermission('${sensorId}')">
                    GRANT PERMISSION
                </button>
            `);
        } else {
            window.addEventListener('deviceorientation', event => updateOrientation(sensorId, event));
        }
    } else {
        updateSensorContent(sensorId, '<div class="error">Device Orientation not supported</div>');
    }
}

window.requestOrientationPermission = function(sensorId) {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                window.addEventListener('deviceorientation', event => updateOrientation(sensorId, event));
            }
        })
        .catch(console.error);
}

function updateOrientation(sensorId, event) {
    const alpha = event.alpha ? event.alpha.toFixed(1) : '0';
    const beta = event.beta ? event.beta.toFixed(1) : '0';
    const gamma = event.gamma ? event.gamma.toFixed(1) : '0';
    
    const html = `
        <div class="orientation-display">
            <div class="orientation-axis">
                <div class="orientation-axis-label">Alpha (Z)</div>
                <div class="orientation-axis-value">${alpha}°</div>
            </div>
            <div class="orientation-axis">
                <div class="orientation-axis-label">Beta (X)</div>
                <div class="orientation-axis-value">${beta}°</div>
            </div>
            <div class="orientation-axis">
                <div class="orientation-axis-label">Gamma (Y)</div>
                <div class="orientation-axis-value">${gamma}°</div>
            </div>
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 9. Device Motion
function initMotion(sensorId) {
    if (window.DeviceMotionEvent) {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            updateSensorContent(sensorId, `
                <button class="pixel-button" onclick="requestMotionPermission('${sensorId}')">
                    GRANT PERMISSION
                </button>
            `);
        } else {
            window.addEventListener('devicemotion', event => updateMotion(sensorId, event));
        }
    } else {
        updateSensorContent(sensorId, '<div class="error">Device Motion not supported</div>');
    }
}

window.requestMotionPermission = function(sensorId) {
    DeviceMotionEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                window.addEventListener('devicemotion', event => updateMotion(sensorId, event));
            }
        })
        .catch(console.error);
}

function updateMotion(sensorId, event) {
    const acc = event.accelerationIncludingGravity;
    const x = acc && acc.x ? acc.x.toFixed(2) : '0';
    const y = acc && acc.y ? acc.y.toFixed(2) : '0';
    const z = acc && acc.z ? acc.z.toFixed(2) : '0';
    
    const html = `
        <div class="sensor-details">
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">X-axis:</span>
                <span class="sensor-detail-value">${x} m/s²</span>
            </div>
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Y-axis:</span>
                <span class="sensor-detail-value">${y} m/s²</span>
            </div>
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Z-axis:</span>
                <span class="sensor-detail-value">${z} m/s²</span>
            </div>
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 10. Compass
function initCompass(sensorId) {
    if (window.DeviceOrientationEvent) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            updateSensorContent(sensorId, `
                <button class="pixel-button" onclick="requestCompassPermission('${sensorId}')">
                    GRANT PERMISSION
                </button>
            `);
        } else {
            window.addEventListener('deviceorientationabsolute', event => updateCompass(sensorId, event), true);
            window.addEventListener('deviceorientation', event => updateCompass(sensorId, event));
        }
    } else {
        updateSensorContent(sensorId, '<div class="error">Compass not supported</div>');
    }
}

window.requestCompassPermission = function(sensorId) {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                window.addEventListener('deviceorientationabsolute', event => updateCompass(sensorId, event), true);
                window.addEventListener('deviceorientation', event => updateCompass(sensorId, event));
            }
        })
        .catch(console.error);
}

function updateCompass(sensorId, event) {
    const heading = event.alpha || event.webkitCompassHeading || 0;
    const direction = getDirection(heading);
    
    const html = `
        <div class="compass">
            <div class="compass-direction north">N</div>
            <div class="compass-direction east">E</div>
            <div class="compass-direction south">S</div>
            <div class="compass-direction west">W</div>
            <div class="compass-needle" style="transform: translate(-50%, -100%) rotate(${heading}deg)"></div>
            <div class="compass-center"></div>
        </div>
        <div class="sensor-value">${heading.toFixed(1)}°</div>
        <div class="sensor-label">${direction}</div>
    `;
    updateSensorContent(sensorId, html);
}

function getDirection(heading) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
}

// 11. Time
function initTime(sensorId) {
    updateTime(sensorId);
    setInterval(() => updateTime(sensorId), 1000);
}

function updateTime(sensorId) {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    
    const html = `
        <div class="sensor-value">${time}</div>
        <div class="sensor-label">${date}</div>
        <div class="sensor-details">
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Timestamp:</span>
                <span class="sensor-detail-value">${now.getTime()}</span>
            </div>
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 12. Memory
function initMemory(sensorId) {
    updateMemory(sensorId);
    setInterval(() => updateMemory(sensorId), 2000);
}

function updateMemory(sensorId) {
    if (performance.memory) {
        const used = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
        const total = (performance.memory.totalJSHeapSize / 1048576).toFixed(2);
        const limit = (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2);
        const percentage = ((used / limit) * 100).toFixed(1);
        
        const html = `
            <div class="sensor-value">${used} MB</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="sensor-details">
                <div class="sensor-detail-item">
                    <span class="sensor-detail-label">Total:</span>
                    <span class="sensor-detail-value">${total} MB</span>
                </div>
                <div class="sensor-detail-item">
                    <span class="sensor-detail-label">Limit:</span>
                    <span class="sensor-detail-value">${limit} MB</span>
                </div>
                <div class="sensor-detail-item">
                    <span class="sensor-detail-label">Usage:</span>
                    <span class="sensor-detail-value">${percentage}%</span>
                </div>
            </div>
        `;
        updateSensorContent(sensorId, html);
    } else {
        updateSensorContent(sensorId, '<div class="error">Memory API not supported</div>');
    }
}

// 13. CPU
function initCPU(sensorId) {
    updateCPU(sensorId);
}

function updateCPU(sensorId) {
    const cores = navigator.hardwareConcurrency || 'Unknown';
    
    const html = `
        <div class="sensor-value">${cores}</div>
        <div class="sensor-label">Logical Cores</div>
    `;
    updateSensorContent(sensorId, html);
}

// 14. Screen
function initScreen(sensorId) {
    updateScreen(sensorId);
    window.addEventListener('resize', () => updateScreen(sensorId));
}

function updateScreen(sensorId) {
    const width = screen.width;
    const height = screen.height;
    const colorDepth = screen.colorDepth;
    const pixelRatio = window.devicePixelRatio;
    
    const html = `
        <div class="sensor-value">${width} × ${height}</div>
        <div class="sensor-details">
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Color Depth:</span>
                <span class="sensor-detail-value">${colorDepth}-bit</span>
            </div>
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Pixel Ratio:</span>
                <span class="sensor-detail-value">${pixelRatio}x</span>
            </div>
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Orientation:</span>
                <span class="sensor-detail-value">${screen.orientation ? screen.orientation.type : 'N/A'}</span>
            </div>
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 15. Touch
function initTouch(sensorId) {
    updateTouch(sensorId);
}

function updateTouch(sensorId) {
    const maxTouchPoints = navigator.maxTouchPoints || 0;
    const touchSupport = 'ontouchstart' in window;
    
    const html = `
        <div class="sensor-value">${maxTouchPoints}</div>
        <div class="sensor-label">Touch Points</div>
        <div class="sensor-details">
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Touch Support:</span>
                <span class="sensor-detail-value">${touchSupport ? 'Yes' : 'No'}</span>
            </div>
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 16. Online Status
function initOnline(sensorId) {
    updateOnline(sensorId);
    window.addEventListener('online', () => updateOnline(sensorId));
    window.addEventListener('offline', () => updateOnline(sensorId));
}

function updateOnline(sensorId) {
    const online = navigator.onLine;
    
    const html = `
        <div class="sensor-value">
            <span class="status-indicator ${online ? 'active' : 'inactive'}"></span>
            ${online ? 'ONLINE' : 'OFFLINE'}
        </div>
        <div class="sensor-label">${online ? 'Connected to Internet' : 'No Connection'}</div>
    `;
    updateSensorContent(sensorId, html);
}

// 17. Language
function initLanguage(sensorId) {
    updateLanguage(sensorId);
}

function updateLanguage(sensorId) {
    const language = navigator.language;
    const languages = navigator.languages.join(', ');
    
    const html = `
        <div class="sensor-value">${language}</div>
        <div class="sensor-details">
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">All Languages:</span>
                <span class="sensor-detail-value">${languages}</span>
            </div>
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 18. Platform
function initPlatform(sensorId) {
    updatePlatform(sensorId);
}

function updatePlatform(sensorId) {
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;
    const vendor = navigator.vendor;
    
    const html = `
        <div class="sensor-value">${platform}</div>
        <div class="sensor-details">
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">Vendor:</span>
                <span class="sensor-detail-value">${vendor || 'N/A'}</span>
            </div>
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">User Agent:</span>
                <span class="sensor-detail-value" style="word-break: break-all; font-size: 16px;">${userAgent.substring(0, 50)}...</span>
            </div>
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 19. Viewport
function initViewport(sensorId) {
    updateViewport(sensorId);
    window.addEventListener('resize', () => updateViewport(sensorId));
}

function updateViewport(sensorId) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const html = `
        <div class="sensor-value">${width} × ${height}</div>
        <div class="sensor-label">Window Size (px)</div>
    `;
    updateSensorContent(sensorId, html);
}

// 20. Connection Type
function initConnectionType(sensorId) {
    updateConnectionType(sensorId);
    
    if (navigator.connection) {
        navigator.connection.addEventListener('change', () => updateConnectionType(sensorId));
    }
}

function updateConnectionType(sensorId) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const type = connection ? connection.type || connection.effectiveType : 'Unknown';
    
    const html = `
        <div class="sensor-value">${type.toUpperCase()}</div>
        <div class="sensor-label">Network Type</div>
    `;
    updateSensorContent(sensorId, html);
}

// 21. Data Saver
function initDataSaver(sensorId) {
    updateDataSaver(sensorId);
}

function updateDataSaver(sensorId) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = connection ? connection.saveData : false;
    
    const html = `
        <div class="sensor-value">
            <span class="status-indicator ${saveData ? 'active' : 'inactive'}"></span>
            ${saveData ? 'ENABLED' : 'DISABLED'}
        </div>
        <div class="sensor-label">Data Saver Mode</div>
    `;
    updateSensorContent(sensorId, html);
}

// 22. Ambient Light
function initAmbientLight(sensorId) {
    if ('AmbientLightSensor' in window) {
        try {
            const sensor = new AmbientLightSensor();
            sensor.addEventListener('reading', () => updateAmbientLight(sensorId, sensor.illuminance));
            sensor.start();
        } catch (error) {
            updateSensorContent(sensorId, '<div class="error">Permission denied or not supported</div>');
        }
    } else {
        updateSensorContent(sensorId, '<div class="error">Ambient Light Sensor not supported</div>');
    }
}

function updateAmbientLight(sensorId, lux) {
    const html = `
        <div class="sensor-value">${lux.toFixed(1)}</div>
        <div class="sensor-label">Lux</div>
    `;
    updateSensorContent(sensorId, html);
}

// 23. Proximity
function initProximity(sensorId) {
    if ('ProximitySensor' in window) {
        try {
            const sensor = new ProximitySensor();
            sensor.addEventListener('reading', () => updateProximity(sensorId, sensor.distance, sensor.max));
            sensor.start();
        } catch (error) {
            updateSensorContent(sensorId, '<div class="error">Permission denied or not supported</div>');
        }
    } else {
        updateSensorContent(sensorId, '<div class="error">Proximity Sensor not supported</div>');
    }
}

function updateProximity(sensorId, distance, max) {
    const html = `
        <div class="sensor-value">${distance.toFixed(1)} cm</div>
        <div class="sensor-label">Max: ${max.toFixed(1)} cm</div>
    `;
    updateSensorContent(sensorId, html);
}

// 24. Vibration
function initVibration(sensorId) {
    updateVibration(sensorId);
}

function updateVibration(sensorId) {
    const supported = 'vibrate' in navigator;
    
    const html = `
        <div class="sensor-value">
            <span class="status-indicator ${supported ? 'active' : 'inactive'}"></span>
            ${supported ? 'SUPPORTED' : 'NOT SUPPORTED'}
        </div>
        ${supported ? `
            <button class="pixel-button" onclick="navigator.vibrate(200)" style="margin-top: 10px;">
                TEST VIBRATION
            </button>
        ` : ''}
    `;
    updateSensorContent(sensorId, html);
}

// 25. WebGL
function initWebGL(sensorId) {
    updateWebGL(sensorId);
}

function updateWebGL(sensorId) {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const supported = !!gl;
    
    let renderer = 'N/A';
    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
    }
    
    const html = `
        <div class="sensor-value">
            <span class="status-indicator ${supported ? 'active' : 'inactive'}"></span>
            ${supported ? 'SUPPORTED' : 'NOT SUPPORTED'}
        </div>
        ${supported && renderer !== 'N/A' ? `
            <div class="sensor-details">
                <div class="sensor-detail-item">
                    <span class="sensor-detail-label">Renderer:</span>
                    <span class="sensor-detail-value" style="font-size: 16px;">${renderer.substring(0, 30)}...</span>
                </div>
            </div>
        ` : ''}
    `;
    updateSensorContent(sensorId, html);
}

// 26. Cookies
function initCookies(sensorId) {
    updateCookies(sensorId);
}

function updateCookies(sensorId) {
    const enabled = navigator.cookieEnabled;
    
    const html = `
        <div class="sensor-value">
            <span class="status-indicator ${enabled ? 'active' : 'inactive'}"></span>
            ${enabled ? 'ENABLED' : 'DISABLED'}
        </div>
        <div class="sensor-label">Cookie Support</div>
    `;
    updateSensorContent(sensorId, html);
}

// 27. Do Not Track
function initDNT(sensorId) {
    updateDNT(sensorId);
}

function updateDNT(sensorId) {
    const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    const status = dnt === '1' || dnt === 'yes';
    
    const html = `
        <div class="sensor-value">
            <span class="status-indicator ${status ? 'active' : 'inactive'}"></span>
            ${status ? 'ENABLED' : 'DISABLED'}
        </div>
        <div class="sensor-label">Do Not Track</div>
    `;
    updateSensorContent(sensorId, html);
}

// 28. Hardware Concurrency
function initHardware(sensorId) {
    updateHardware(sensorId);
}

function updateHardware(sensorId) {
    const cores = navigator.hardwareConcurrency || 'Unknown';
    
    const html = `
        <div class="sensor-value">${cores}</div>
        <div class="sensor-label">CPU Threads</div>
    `;
    updateSensorContent(sensorId, html);
}

// 29. Geolocation Accuracy
function initGeolocationAccuracy(sensorId) {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => updateGeolocationAccuracy(sensorId, position),
            error => updateSensorContent(sensorId, '<div class="error">Location unavailable</div>')
        );
    } else {
        updateSensorContent(sensorId, '<div class="error">Geolocation not supported</div>');
    }
}

function updateGeolocationAccuracy(sensorId, position) {
    const accuracy = position.coords.accuracy;
    
    const html = `
        <div class="sensor-value">${accuracy.toFixed(1)}m</div>
        <div class="sensor-label">Location Accuracy</div>
    `;
    updateSensorContent(sensorId, html);
}

// 30. Timezone
function initTimezone(sensorId) {
    updateTimezone(sensorId);
}

function updateTimezone(sensorId) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().getTimezoneOffset();
    const offsetHours = Math.abs(offset / 60);
    const offsetSign = offset <= 0 ? '+' : '-';
    
    const html = `
        <div class="sensor-value">${timezone}</div>
        <div class="sensor-details">
            <div class="sensor-detail-item">
                <span class="sensor-detail-label">UTC Offset:</span>
                <span class="sensor-detail-value">${offsetSign}${offsetHours}h</span>
            </div>
        </div>
    `;
    updateSensorContent(sensorId, html);
}

// 31. Page Load Time
function initPageLoad(sensorId) {
    updatePageLoad(sensorId);
}

function updatePageLoad(sensorId) {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        const domReady = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        
        const html = `
            <div class="sensor-value">${loadTime}ms</div>
            <div class="sensor-details">
                <div class="sensor-detail-item">
                    <span class="sensor-detail-label">DOM Ready:</span>
                    <span class="sensor-detail-value">${domReady}ms</span>
                </div>
            </div>
        `;
        updateSensorContent(sensorId, html);
    } else {
        updateSensorContent(sensorId, '<div class="error">Performance API not supported</div>');
    }
}

// Permission Request Handler
const permissionBanner = document.getElementById('permissionBanner');
const requestPermissionsBtn = document.getElementById('requestPermissions');

// Show banner if permissions are needed
if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    permissionBanner.classList.remove('hidden');
}

requestPermissionsBtn.addEventListener('click', async () => {
    try {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            await DeviceOrientationEvent.requestPermission();
        }
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            await DeviceMotionEvent.requestPermission();
        }
        permissionBanner.classList.add('hidden');
        location.reload();
    } catch (error) {
        console.error('Permission denied:', error);
    }
});

console.log('🎮 Velocity Sensor Dashboard loaded! Monitoring', sensors.length, 'sensors...');
