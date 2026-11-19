# 🌾 SHAKTI SETU AI

### AI-Powered Rural Women Entrepreneurship and Youth Employment Ecosystem

[![Hackathon](https://img.shields.io/badge/GAVS_Hackathon-Tech4Bharat-orange.svg)](https://hackculture.io)
[![Theme](https://img.shields.io/badge/Theme-Youth_and_Women-blue.svg)](#)
[![Problem Statement](https://img.shields.io/badge/Problem-8.1_SHG_Fulfilment_%26_Pay_Chaos-emerald.svg)](#)
[![Agentic AI](https://img.shields.io/badge/Architecture-Autonomous_Multi--Agent-purple.svg)](#)

---

##  Executive Summary

**SHAKTI SETU AI** is an intelligent Agentic AI platform designed to transform traditional Women’s Self-Help Groups (SHGs) into organized, digitally empowered micro-enterprises. It eliminates order fulfillment chaos, builds member trust through transparent cryptographic revenue sharing, provides safe delivery escorts for rural women, and unlocks sustainable gig employment for rural youth as **Digital Saathis**.

---

## 🎯 Problem Statement 8.1 Addressed

> *"Women's self-help groups lose orders and members' trust because fulfilment and pay are chaotic."*

### Key Ground Pain-Points Solved:
1. **Unstructured Order Chaos:** Rural SHGs receive orders through fragmented phone calls, paper diaries, and WhatsApp audio notes that get lost.
2. **Member Mistrust & Disputes:** Opaque earnings calculation leads to accusations that group leaders take disproportionate cuts.
3. **Delivery Fear & Route Barriers:** Rural women face security concerns and navigation difficulties (lack of street names/maps) when attempting last-mile delivery.
4. **Youth Unemployment:** Rural youth with smartphones lack meaningful local technical employment.

---

## 🧠 Autonomous Multi-Agent Architecture

```
                      [ Incoming Voice / WhatsApp / Web ]
                                      │
                                      ▼
                        ┌──────────────────────────┐
                        │   ORDER MANAGEMENT AGENT │
                        │  (Entity & Date Parsing) │
                        └─────────────┬────────────┘
                                      │
          ┌───────────────────────────┼──────────────────────────┐
          ▼                           ▼                          ▼
┌───────────────────┐       ┌────────────────────┐     ┌───────────────────┐
│  INVENTORY AGENT  │       │  FULFILMENT AGENT  │     │  SURAKSHA AGENT   │
│  (Stock & Alerts) │       │ (Fair Allocation)  │     │(Landmarks & Grid) │
└───────────────────┘       └─────────┬──────────┘     └───────────────────┘
                                      │
                                      ▼
                        ┌──────────────────────────┐
                        │  PAYMENT & LEDGER AGENT  │
                        │ (SHA-256 Verifiable Pay) │
                        └─────────────┬────────────┘
                                      │
                                      ▼
                        ┌──────────────────────────┐
                        │    SUPERVISOR WATCHDOG   │
                        │ (Health & Anomaly Check) │
                        └──────────────────────────┘
```

---

## 🌟 Core Features & Modules

### 1. 👩‍🌾 SHG Didi Portal (Voice-First & Vernacular)
- **Zero Digital Literacy Barrier:** Built-in Hindi/Vernacular Text-to-Speech and Speech Recognition.
- **My Tasks ("मेरा काम"):** Clear breakdown of units to produce.
- **My Earnings ("मेरी कमाई"):** Transparent digital receipts showing exact rupee deductions (Raw Material, Digital Saathi Fee) and net bank transfer.

### 2. 📱 Digital Saathi Portal (Rural Youth Empowerment)
- **Unstructured Order Processor:** Converts noisy Hindi text/audio into structured orders and sets deadlines.
- **Saathi Digital Wallet:** Earns ₹15–₹50 per verified order fulfillment.
- **Customer Support & Listing:** Equips local youth with product photography and listing tools.

### 3. 🛡️ Suraksha Setu (Rural Safe Fulfilment Grid)
- **Zero-Map Landmark Escort:** Tracks deliveries using familiar local landmarks (*"Rampur mod ke paas peepal ped"*) rather than confusing coordinates.
- **1-Tap Offline / Voice SOS:** Activated by triple-pressing the power button or saying *"मदद"*.
- **Youth First Responder Network:** Nearby bike-riding Digital Saathis receive instantaneous emergency alerts within a 2km radius (ETA 3–5 minutes).
- **Automated Check-in Call:** Proactively phones the Didi if an abnormal stop is detected.

### 4. 📊 Agentic Command Center
- **Live Multi-Agent Communication Trace:** Full observability for judges and admins.
- **Cryptographic Trust Ledger:** Generates SHA-256 verification hashes for each payout to eliminate suspicion.
- **Real-time System Trust Score:** Monitors dispute rates and delivery reliability.

---

## 🚀 How to Run the Project

### Option A: 1-Click Launch (Recommended for Windows)
Simply double-click `run_demo.bat` inside this folder, or run in PowerShell:
```powershell
.\run_demo.bat
```

### Option B: Run the FastAPI Server + Client
```powershell
# In terminal:
python server/main.py
```
Then open your browser at: https://shakti-setu-ai.onrender.com/

### Option C: Run Standalone Web App (No dependencies required)
Simply open `client/index.html` in any web browser (Chrome, Edge, Firefox)!
The built-in client engine includes full local simulation with real speech synthesis and interactive agents.

### Option D: Run Streamlit Analytics Dashboard
```powershell
streamlit run streamlit_dashboard.py
```

---

## 📁 Repository Structure

```
shakti-setu/
├── client/
│   ├── index.html            # Responsive UI (Didi, Saathi, Suraksha & Admin views)
│   ├── app.js                # State management, Web Speech, and Multi-Agent UI controller
│   └── styles.css            # Modern glassmorphism, high contrast accessible styling
├── server/
│   ├── main.py               # FastAPI backend with REST endpoints & static server
│   ├── models.py             # Pydantic data schemas
│   └── agents.py             # Autonomous Multi-Agent engine (Order, Fulfilment, Payment, Suraksha)
├── streamlit_dashboard.py    # Analytics & operations console
├── PITCH_DECK.md             # 3-minute hackathon pitch script & Q&A guide
├── run_demo.bat              # 1-click startup script for Windows
└── README.md                 # Complete documentation
```

---

## 🏆 Hackathon Alignment Checklist

- [x] **Agentic AI:** Autonomous multi-agent coordination with real reasoning and actions.
- [x] **Real-World Feasibility:** Addresses ground realities of rural connectivity, low literacy, and absence of street maps.
- [x] **Theme Alignment:** Directly empowers rural women entrepreneurs while providing digital employment to rural youth.
- [x] **Zero Dispute Guarantee:** Solves member mistrust via mathematical and cryptographic transparency.
