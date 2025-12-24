# BlurChat - Privacy for WhatsApp Web

🛡️ **Protect your WhatsApp chats during screen sharing, meetings, and public use.**

![Version](https://img.shields.io/badge/version-1.0.0-green)
![Manifest](https://img.shields.io/badge/manifest-v3-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)

## 🎯 Features

### Free Features
- **Blur Messages** - Hide chat text and message previews from prying eyes
- **Hover Reveal** - Simply hover over any blurred item to temporarily reveal it
- **Zero Setup** - Works instantly after installation

### Pro Features (₹150)
- **Blur Names** - Hide contact and group names
- **Blur Photos** - Hide profile pictures and media thumbnails
- **Lifetime Access** - One-time purchase, no subscriptions

## 🚀 Installation

### From Chrome Web Store
1. Visit [Chrome Web Store](https://chrome.google.com/webstore) (link coming soon)
2. Click "Add to Chrome"
3. Done! Open WhatsApp Web and click the extension icon

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked"
5. Select the `PrivacyGuardPro` folder
6. Done!

## 📖 Usage

1. **Open WhatsApp Web** at https://web.whatsapp.com
2. **Click the BlurChat icon** in your browser toolbar
3. **Toggle features** as needed:
   - 💬 Blur Messages (always available)
   - 👤 Blur Names (Pro)
   - 📷 Blur Photos (Pro)
4. **Hover** over any blurred element to temporarily reveal it

## 🔐 Pro License System (SECURE)

### For Users:
1. Purchase a Pro license from [Gumroad](https://gumroad.com/l/blurchat-pro)
2. You'll receive a unique key: `BCPRO-XXXX-XXXX-XXXX`
3. Click the extension icon
4. Enter your license key
5. Click "Verify" - Pro features unlocked!

### For Developer (Generating Keys):
Each customer gets a unique, algorithmically-validated key.

1. Open the BlurChat popup on any page
2. Open browser DevTools console (F12)
3. Run: `generateBlurChatKey()`
4. Copy the generated key and send to customer

Example output:
```
🔑 NEW LICENSE KEY GENERATED:
BCPRO-A7KM-P3NX-Q2R8
Give this key to your customer!
```

### Security Features:
- ✅ Each key is unique (infinite combinations)
- ✅ Keys validated using checksum algorithm
- ✅ Secret salt prevents key guessing
- ✅ No universal key that can be shared
- ✅ Works 100% offline

## 🛠️ Technical Details

### Permissions Used
- `storage` - Save your preferences locally
- `host_permissions: web.whatsapp.com` - Only runs on WhatsApp Web

### No Data Collection
- ✅ All data stored locally
- ✅ No external servers
- ✅ No tracking or analytics
- ✅ No internet requests

### Browser Support
- Chrome 88+ (Manifest V3)
- Edge 88+ (Chromium-based)

## 📁 Project Structure

```
PrivacyGuardPro/
├── manifest.json      # Extension manifest (MV3)
├── background.js      # Service worker
├── content.js         # WhatsApp DOM manipulation
├── styles.css         # Blur CSS rules
├── popup.html         # Extension popup UI
├── popup.css          # Popup styling
├── popup.js           # Popup logic & license handling
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md
└── STORE_LISTING.md
```

## 🔧 Development

### Prerequisites
- Chrome browser
- Basic knowledge of Chrome Extensions

### Testing
1. Make changes to the code
2. Go to `chrome://extensions`
3. Click the refresh icon on BlurChat
4. Open WhatsApp Web and test

### Building for Production
```bash
# Create zip for Chrome Web Store
zip -r BlurChat-v1.0.0.zip . -x "*.git*" -x "*.DS_Store" -x "README.md"
```

## ⚠️ Known Limitations

1. WhatsApp Web DOM changes may require selector updates
2. Some dynamic elements might not blur immediately
3. Extension must be reloaded after Chrome updates
4. Hover reveal affects only the specific element, not nested content

## 🗺️ Roadmap

- [ ] Keyboard shortcut toggle (Ctrl+Shift+B)
- [ ] Custom blur intensity slider
- [ ] Whitelist specific contacts
- [ ] Firefox version
- [ ] Safari version

## 📄 License

MIT License - feel free to modify and distribute.

## 🤝 Support

- **Issues**: Open a GitHub issue
- **Email**: support@blurchat.app (placeholder)

---

Made with ❤️ for privacy-conscious WhatsApp users
