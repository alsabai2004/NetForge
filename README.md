⚡ NetForge

«Modern Network Engineering Toolkit for Cisco IOS & MikroTik RouterOS»

NetForge is a modern web-based network engineering toolkit designed to help network students, engineers, and IT professionals calculate networks, generate router and switch configurations, explore networking commands, and access structured networking references from one unified interface.

The project brings practical networking utilities into a single modern dashboard with a focus on learning, configuration generation, and quick access to technical references.

---

🚀 Overview

NetForge provides a collection of practical tools for network engineering and IT workflows.

Instead of repeatedly writing configuration commands manually, users can select the required parameters and generate ready-to-use configurations for supported platforms.

Main Areas

- 🌐 Network configuration
- 🧮 IP addressing and subnetting
- 🔵 Cisco IOS configuration
- 🟢 MikroTik RouterOS configuration
- 🔐 Network security
- 📚 Networking commands and references
- 📝 Networking notes and learning resources

---

✨ Features

🔵 Cisco IOS Tools

NetForge includes multiple Cisco configuration generators:

- VLAN Generator
- Static Route Generator
- RIP Generator
- OSPF Generator
- EIGRP Generator
- DHCP Generator
- NAT Generator
- ACL Generator
- Inter-VLAN / Router-on-a-Stick Generator
- STP Generator
- EtherChannel Generator
- Port Security Generator

Generated configurations are formatted as Cisco IOS commands and can be copied directly from the interface.

---

🟢 MikroTik RouterOS Tools

The MikroTik section provides practical RouterOS configuration generators:

- Bridge Generator
- VLAN Generator
- IP Address Generator
- DHCP Generator
- NAT Generator
- Firewall Generator
- Hotspot Generator
- Queue Generator
- Static Route Generator
- OSPF Generator

Generated output is formatted for use in the MikroTik RouterOS terminal.

---

🧮 IP Calculator

The built-in network calculator provides IPv4 addressing and subnetting calculations.

It includes information such as:

- Network Address
- Broadcast Address
- Subnet Mask
- CIDR
- Usable Host Range
- Number of Hosts
- Wildcard Mask
- Address calculations

---

📖 Command Library

NetForge includes a centralized command reference for commonly used networking commands.

Supported Platforms

- Cisco IOS
- MikroTik RouterOS
- Linux

The command library is designed to make frequently used commands easier to find, understand, and copy.

---

📝 Network Notes

NetForge includes structured networking notes covering topics such as:

- Networking Fundamentals
- Switching
- Routing
- VLANs
- STP
- OSPF
- Network Services
- Network Security
- Cisco IOS
- MikroTik RouterOS

---

📚 Network References

A dedicated reference section provides organized networking concepts and technical information for learning and quick review.

The goal is to provide useful technical information without requiring users to search through multiple resources.

---

🛡️ Security Center

NetForge includes a security-focused section covering networking and cybersecurity concepts.

It is intended as a learning and reference area for understanding common network security practices and technologies.

---

🖥️ User Interface

NetForge uses a modern dark-themed interface designed for technical workflows.

The interface includes:

- Dashboard
- Sidebar Navigation
- Tool Cards
- Configuration Panels
- Generated Configuration Preview
- Copy-to-Clipboard Actions
- Reset Controls
- Responsive Layouts

The application is designed to work across desktop and mobile screens.

---

🛠️ Technology Stack

Technology| Purpose
React| User Interface
TypeScript| Type-safe development
Vite| Build Tool and Development Server
Tailwind CSS| Styling
Lucide React| Icons
React Router| Application Routing
ESLint| Code Quality

---
```
📂 Project Structure

NetForge/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── data/
│   │   ├── navigation.ts
│   │   └── tools.ts
│   │
│   ├── features/
│   │   ├── calculator/
│   │   ├── cisco/
│   │   ├── commands/
│   │   ├── mikrotik/
│   │   ├── notes/
│   │   ├── references/
│   │   ├── security/
│   │   └── dashboard.tsx
│   │
│   ├── layouts/
│   │   └── DashboardLayout.tsx
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── public/
├── package.json
├── tsconfig.app.json
├── vite.config.ts
└── README.md
```
---

⚙️ Installation

Clone the repository:

git clone https://github.com/alsabai2004/NetForge.git
cd NetForge

Install dependencies:

npm install

Start the development server:

npm run dev

Build the project for production:

npm run build

Run ESLint:

npm run lint

---

📱 Development Environment

NetForge can be developed and managed using a modern Node.js environment.

The project was developed with a focus on maintaining a clean and responsive experience across different screen sizes.

---

🔧 Available Scripts

Command| Description
"npm run dev"| Start development server
"npm run build"| Build production version
"npm run lint"| Run ESLint
"npm run preview"| Preview production build

---

🎯 Project Goals

NetForge aims to provide a practical environment for:

- Learning network engineering
- Practicing Cisco IOS configuration
- Practicing MikroTik RouterOS configuration
- Understanding routing and switching
- Learning network security concepts
- Quickly generating configuration commands
- Keeping commonly used networking references in one place

---

🚧 Future Improvements

Possible future improvements include:

- More Cisco configuration generators
- More MikroTik RouterOS tools
- IPv6 calculator and utilities
- Configuration validation
- Import/export configurations
- Configuration history
- Dark/light theme support
- More networking references
- Additional cybersecurity utilities
- Advanced network design tools
- Improved mobile experience

---

👨‍💻 Author

Mohammed Najeeb Al-Sab'ei

Computer Networks & Cybersecurity

GitHub:
https://github.com/alsabai2004

---

📄 License

This project is currently intended as a personal learning and portfolio project.

---

⭐ Support

If you find NetForge useful, consider giving the repository a ⭐ on GitHub.
