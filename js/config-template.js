// ============================================
// CONFIGURAÇÃO DO SISTEMA AEE
// Este arquivo é gerado automaticamente pelo GitHub Actions
// As variáveis são injetadas a partir dos secrets
// ============================================

// URL do Web App (seu Apps Script)
const API_URL = '{{API_URL}}';

// Código de implantação
const DEPLOYMENT_ID = '{{DEPLOYMENT_ID}}';

// Configuração para leitura direta via Google Sheets API
const SHEETS_CONFIG = {
  spreadsheetId: '{{SPREADSHEET_ID}}',
  apiKey: '{{API_KEY}}',
  publicUrl: '{{PUBLIC_URL}}',
  ranges: {
    estudantes: 'estudantes!A:I',
    peis: 'peis!A:J'
  }
};

// Flag para usar leitura via API (mais rápida) ou via Apps Script
const USAR_GOOGLE_SHEETS_API_PARA_LEITURA = true;

console.log('✅ Configuração carregada via GitHub Actions');
