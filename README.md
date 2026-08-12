# ⚡ NetForge

> **Network Engineering Toolkit for Students, Engineers & Cybersecurity Learners**

NetForge is an offline-first network engineering toolkit that brings practical networking utilities, configuration generators, command references, calculations, notes, and security resources into one focused workspace.

Built to help networking and cybersecurity learners **calculate, configure, learn, and reference** network technologies from one application.

---

## 🚀 Features

### 🌐 IP & Network Tools

- IPv4 address calculations
- Subnetting and CIDR analysis
- Network, broadcast, and usable host calculations
- Addressing and subnetting utilities

### 🔵 Cisco Tools

- VLAN configuration
- Inter-VLAN routing
- DHCP
- Static routing
- RIP
- OSPF
- EIGRP
- NAT
- ACL
- STP
- EtherChannel
- Port Security

### 🟣 MikroTik Tools

- IP Address configuration
- VLAN
- Bridge
- DHCP
- NAT
- Firewall
- Hotspot
- Queue
- Static Routes
- OSPF

### 📚 Learning & References

- Network command library
- Networking notes
- Protocol references
- TCP/UDP port references
- Security concepts
- Search and filtering
- Copy-to-clipboard utilities

### ⭐ Personal Workspace

- Favorite notes
- Local data storage
- Last-used configuration support
- Offline-first operation

---

## 📱 Android Application

NetForge is also available as an Android application using an embedded WebView architecture.

The web application is bundled directly inside the APK, allowing the core toolkit to operate without an Internet connection.

### Android Architecture

text
React + TypeScript
        │
        ▼
      Vite
        │
        ▼
   Web Application
        │
        ▼
 Android WebView
        │
        ▼
   NetForge APK
🛠️ Technologies
Technology
Purpose
React
User interface
TypeScript
Type-safe development
Vite
Build tooling
Tailwind CSS
UI styling
React Router
Application navigation
Lucide Icons
Interface icons
Android WebView
Android application layer
WebViewAssetLoader
Local web asset loading
LocalStorage
Offline local data

---
```
📂 Project Structure
NetForge/
├── src/
│   ├── components/
│   ├── data/
│   ├── features/
│   │   ├── calculator/
│   │   ├── cisco/
│   │   ├── commands/
│   │   ├── mikrotik/
│   │   ├── notes/
│   │   ├── references/
│   │   └── security/
│   ├── layouts/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── android-app/
│   └── Android WebView application
│
├── public/
├── package.json
└── README.md
```
---

💻 Run Locally
Clone the repository:
git clone https://github.com/alsabai2004/NetForge.git
cd NetForge
Install dependencies:
npm install
Start the development server:
npm run dev
Build the web application:
npm run build
📦 Android Build
The Android project is located in:
android-app/
Debug APK:
gradle assembleDebug
Release APK:
gradle assembleRelease
The generated release APK is:
android-app/app/build/outputs/apk/release/app-release.apk
Signing credentials and build artifacts are intentionally excluded from Git.
🔐 Security & Privacy
NetForge is designed with an offline-first approach.
No account is required for the core toolkit.
User favorites and local data are stored locally.
Signing keys and passwords are not included in the repository.
Build artifacts are excluded from Git.
🎯 Project Goals
NetForge aims to provide a practical environment for:
Network engineering education
Cisco configuration practice
MikroTik RouterOS practice
Subnetting and IP addressing
Networking command reference
Cybersecurity learning
Offline technical reference
🗺️ Roadmap
Future improvements may include:
[ ] More network calculators
[ ] Expanded Cisco generators
[ ] Expanded MikroTik generators
[ ] Network topology tools
[ ] Configuration import/export
[ ] Dark/light theme options
[ ] More cybersecurity utilities
[ ] Improved Android integration
[ ] Automated APK releases
📸 Screenshots
Screenshots will be added as the interface evolves.
📄 Version
1.0.0
👨‍💻 Developer
Mohammed Najeeb Al-Sabai
Computer Networks & Cybersecurity
⭐ Support
If you find NetForge useful, consider giving the repository a ⭐ on GitHub.
📜 License
This project is currently provided for educational and development purposes.
