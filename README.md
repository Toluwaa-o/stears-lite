# Stears Lite – Frontend

Stears Lite is a data-driven frontend application that lets users explore detailed company data for African businesses. Users can search for a company and view key metrics such as number of investors, funding rounds, valuation, revenue, employee count, and other vital statistics, alongside relevant news insights.

## 🔧 Tech Stack

* **Next.js** + **TypeScript**
* **TailwindCSS** for styling
* **chart.js & react-chartjs-2** for data visualization
* **Next.js** + **TypeScript** + **MongoDB (Mongoose)** backend (internal API)
* **FastAPI** backend (external API)

## 🚀 Features

* 🔎 Search for African companies
* 📊 View key company metrics: investors, funding, valuation, revenue, employee count, etc.
* 🧠 Tooltips and visualizations for company data trends
* 📰 Company-specific news with sentiment analysis
* 📈 Performance badges and comparisons against industry benchmarks


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

This frontend connects to a FastAPI backend and NextJS backend. Make sure the backend is running and accessible at the `NEXT_PUBLIC_API_URL`.
