# 🌞 Solar-IQ: AI Solar Performance Analyzer

**Smart Solar System Performance Evaluation Using AI**  
Built with ❤️ using **Lovable App Builder + Custom AI Logic**

---

## 🚀 Overview

**Solar-IQ** is an AI-powered solar performance analyzer that estimates, evaluates, and optimizes the efficiency of solar panels using real-time input parameters such as irradiance, panel area, efficiency, and measured power.

The app intelligently compares **theoretical** vs **actual** output, identifies **losses**, and provides **performance improvement insights** — all through a clean, interactive UI.

👉 **Live Preview:** [Solar-IQ AI Analyzer (Lovable)](https://preview--solar-iq-ai-analyzer.lovable.app/)

---

## 🧠 Core Logic (This Repository)

This repository contains only the **analytical logic and AI computation engine** used in the Solar-IQ app.  
It includes the mathematical model and AI reasoning used to generate performance insights in the Lovable front-end.

---

## 📘 Working Principle

### 1️⃣ User Inputs
- Solar panel area (m²)
- Efficiency (%)
- Solar irradiance (W/m²)
- Measured power output (W)

### 2️⃣ Theoretical Power Calculation
\[
P_{theoretical} = Area \times Irradiance \times \left(\frac{Efficiency}{100}\right)
\]

### 3️⃣ Performance Ratio (PR)
\[
PR = \frac{P_{actual}}{P_{theoretical}} \times 100
\]

- A PR of **100%** means the system is performing at ideal conditions.  
- Lower PR indicates **losses** due to dust, temperature rise, wiring inefficiencies, or shading.

### 4️⃣ AI Insight Generation
The AI module interprets computed results and generates human-readable insights such as:
- “Panel performance is 82% — cleaning recommended.”
- “Excellent output — system running near ideal efficiency.”
- “Low efficiency detected — possible temperature or wiring loss.”

---

## 🧩 Example Calculation

| Parameter | Value |
|------------|--------|
| Panel Area | 20 m² |
| Efficiency | 20% |
| Irradiance | 1000 W/m² |
| Measured Output | 3200 W |

**Theoretical Power:**  
\[
20 × 1000 × 0.2 = 4000W
\]

**Performance Ratio:**  
\[
(3200 / 4000) × 100 = 80%
\]

**AI Insight:**  
“Panel is underperforming by 20%. Check for dust accumulation or inverter losses.”

---

## ⚙️ Files Included

| File | Description |
|------|--------------|
| `solar_iq_logic.py` | Core computation logic for theoretical and actual power comparison |
| `ai_analysis_prompt.json` | Lovable-compatible AI prompt structure |
| `formulas.md` | List of all equations and constants used |
| `README.md` | Documentation (this file) |

---

## 💡 Integration with Lovable

The **Lovable app** handles:
- **User Interface** for data input and visualization  
- **AI interaction** using this repo’s logic in the prompt  
- **Visualization** of performance comparison and recommendations  

Your **GitHub repository** stores the reusable core logic that Lovable connects to via AI prompt references.

---

## 🧰 Tech Stack

| Component | Technology |
|------------|-------------|
| **Frontend** | Lovable (React + Tailwind based) |
| **Computation Logic** | Python |
| **AI Analysis** | GPT-powered prompt |
| **Hosting** | Lovable Preview + GitHub integration |

---

## 🔍 Key Features

✅ Accurate solar power estimation  
✅ Real-time performance ratio computation  
✅ AI-based diagnostic insights  
✅ Lightweight, modular logic (for integration in any system)  
✅ Expandable for IoT, SCADA, or blockchain-based data flow  

---

## 🔮 Future Enhancements

- ⚡ Integration with real inverter data via API  
- 🌦️ Real-time irradiance from live weather feeds  
- 🧾 Auto-generated daily/monthly performance reports  
- 🤖 Predictive maintenance alerts using AI trend analysis  

---



