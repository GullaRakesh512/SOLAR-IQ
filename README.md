# ☀️ SolarIQ - Smart Solar Performance Analyzer

A web application built by [Your Name] to analyze and estimate the performance, savings, and environmental impact of a solar panel installation.

**Live App:** [https://solar-iq-ai-analyzer.lovable.app](https://solar-iq-ai-analyzer.lovable.app)

---


## 🚀 Features

* **Instantaneous Power Calculation:** Calculates peak DC power output.
* **Energy Estimation:** Provides daily and monthly energy generation (in kWh), factoring in a real-world Performance Ratio.
* **Financial Savings:** Estimates monthly cost savings based on a user-defined tariff.
* **Environmental Impact:** Calculates monthly CO₂ emissions saved.
* **AI Performance Insights:** (This is your key feature!) Provides actionable recommendations based on the system's calculated efficiency.

---

## 🛠️ Technologies Used

* **Frontend:** HTML, CSS
* **Backend:** Python (with Flask framework)
* **Deployment:** Lovable.app (or wherever you hosted it)

---

## 💡 Core Logic

The analyzer uses standard photovoltaic formulas to determine peak power and then applies a realistic **Performance Ratio (PR) of 85%** to estimate the actual AC energy output.

**1. Instantaneous DC Power:**
`Power (W) = Panel Area (m²) * Panel Efficiency (%) * Solar Irradiance (W/m²)`

**2. Daily Energy (AC):**
`Energy (kWh) = (Power (W) * Avg. Sunlight Hours * 0.85_PR) / 1000`

**3. CO₂ Savings:**
A carbon intensity factor of **0.85 kg CO₂/kWh** is used to estimate environmental savings.

---

## How to Run This Project Locally

(This section is for other developers)

1.  **Clone the repository:**
    `git clone https://github.com/your-username/solariq-app.git`
2.  **Navigate to the directory:**
    `cd solariq-app`
3.  **Install dependencies:**
    `pip install -r requirements.txt`
    *(**Note:** You'll need to create a `requirements.txt` file by running `pip freeze > requirements.txt` in your project folder)*
4.  **Run the app:**
    `flask run`
