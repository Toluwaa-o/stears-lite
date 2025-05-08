# Stears Lite – Frontend

Stears Lite is a data-driven frontend application that lets users explore macroeconomic trends behind African companies. It allows users to search for a company, then view key metrics such as GDP, inflation, and interest rates from the country it operates in, alongside news insights.

## 🔧 Tech Stack

* **Next.js** + **TypeScript**
* **TailwindCSS** for styling
* **Radix UI** for accessible components
* **MUI Charts** for data visualization
* **FastAPI** backend (external API)

## 🚀 Features

* 🔎 Search for African companies
* 🌍 Fetch macroeconomic indicators from the World Bank
* 🧠 Tooltips and trend visualizations for each metric
* 📰 Company-specific news with sentiment analysis
* 📈 Volatility badges and data comparisons with 2020 as the baseline

## 📦 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Toluwaa-o/stears-lite.git
   cd stears-lite
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

4. **Set up your `.env.local`**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

## 🔗 Backend API

This frontend connects to a FastAPI backend. Make sure the backend is running and accessible at the `NEXT_PUBLIC_API_URL`.
