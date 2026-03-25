// ============================================
// CONFIGURAÇÃO DO SISTEMA AEE
// ============================================

// URL do Web App (seu Apps Script)
const API_URL = 'https://script.google.com/macros/s/AKfycbwOAZFrWXEY1P7Md_u-AKn8pMlgRt7_EGB9s0R2yjPl5wwcVpjCMvhR4Yi219RVsIX67A/exec';

// Código de implantação
const DEPLOYMENT_ID = 'AKfycbwOAZFrWXEY1P7Md_u-AKn8pMlgRt7_EGB9s0R2yjPl5wwcVpjCMvhR4Yi219RVsIX67A';

// Configuração para leitura direta via Google Sheets API
const SHEETS_CONFIG = {
  // ID da sua planilha
  spreadsheetId: '1kmInW5nE1FkEEXKrshFOIMCtFvpZ40FOqtmI8lvla50',
  
  // Sua API Key
  apiKey: 'AIzaSyACvSKy0LPzd7pA45HRK0Mv1ZS843FoaYM',
  
  ranges: {
    estudantes: 'estudantes!A:I',
    peis: 'peis!A:J'
  }
};

// Flag para usar leitura via API (mais rápida) ou via Apps Script
// TRUE = usa Google Sheets API (leitura mais rápida)
// FALSE = usa Apps Script (leitura mais lenta)
const USAR_GOOGLE_SHEETS_API_PARA_LEITURA = true;