export const indicatorOrder: string[] = ['Real GDP growth (%)', 'Nominal GDP (USD)', 'GDP per capita (USD)', 'Inflation rate (%)', 'Official exchange rate (local currency units per US$)', 'Fiscal balance (% of GDP)', 'Public debt (% of GDP)', 'Current account (% of GDP)', 'Export growth (%)', 'Import growth (%)', 'Unemployment rate (% of labor force)', 'Total labor force (number of people)', 'Employment to population ratio (%)']

export const indicatorCategories: Record<string, string[]> = {
    'Growth & Output': ['Real GDP growth (%)', 'Nominal GDP (USD)', 'GDP per capita (USD)'],
    'Inflation & Prices': ['Inflation rate (%)', 'Official exchange rate (local currency units per US$)'],
    'Fiscal': ['Fiscal balance (% of GDP)', 'Public debt (% of GDP)'],
    'External Sector': ['Current account (% of GDP)', 'Export growth (%)', 'Import growth (%)'],
    'Employment & Labor': ['Unemployment rate (% of labor force)', 'Total labor force (number of people)', 'Employment to population ratio (%)']
}

export const category_colors: Record<string, string> = {
    "Growth & Output": "bg-blue-50",
    "Inflation & Prices": "bg-slate-50",
    "Fiscal": "bg-sky-50",
    "External Sector": "bg-indigo-50",
    "Employment & Labor": "bg-cyan-50",
};


export const indicator_descriptions: Record<string, string> = {
    'Real GDP growth (%)': 'Annual percentage change in gross domestic product (GDP) adjusted for inflation, reflecting the economy\'s real growth rate.',
    'Nominal GDP (USD)': 'Gross domestic product measured in current U.S. dollars, unadjusted for inflation.',
    'GDP per capita (USD)': 'Nominal GDP divided by midyear population, representing average economic output per person.',

    'Inflation rate (%)': 'Annual percentage change in consumer prices, measuring the rate at which the general price level rises.',
    'Official exchange rate (local currency units per US$)': 'The rate at which one U.S. dollar can be exchanged for local currency, as determined by official channels.',

    'Fiscal balance (% of GDP)': 'Government revenue minus expenditure, expressed as a percentage of GDP. A positive value indicates a surplus; negative a deficit.',
    'Public debt (% of GDP)': 'Total government debt as a percentage of GDP, reflecting the burden of debt relative to the economy\'s size.',

    'Current account (% of GDP)': 'Balance of trade, net income from abroad, and net current transfers, expressed as a percentage of GDP.',
    'Export growth (%)': 'Annual percentage change in the value of goods and services exported.',
    'Import growth (%)': 'Annual percentage change in the value of goods and services imported.',

    'Unemployment rate (% of labor force)': 'The percentage of the labor force that is actively seeking but unable to find work.',
    'Total labor force (number of people)': 'The total number of people aged 15+ who are either employed or actively looking for work.',
    'Employment to population ratio (%)': 'The proportion of a country’s working-age population that is currently employed.',
}


export const policySensitiveIndicators: string[] = [
  'Inflation rate (%)',
  'Official exchange rate (local currency units per US$)',
  'Fiscal balance (% of GDP)',
  'Public debt (% of GDP)',
  'Current account (% of GDP)',
  'Unemployment rate (% of labor force)',
  'Employment to population ratio (%)'
];


export const benchmarkIndicators: string[] = [
  'Real GDP growth (%)',
  'Nominal GDP (USD)',
  'GDP per capita (USD)',
  'Export growth (%)',
  'Import growth (%)',
  'Total labor force (number of people)'
];
