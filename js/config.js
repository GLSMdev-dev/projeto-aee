// ============================================
// CONFIGURAÇÃO DO SISTEMA AEE - VERSÃO FINAL
// ============================================

// URL do Web App (Apps Script)
const API_URL = 'https://script.google.com/macros/s/AKfycbx_V_XghYTCgxC2Z8fKcp4LNz2fmmDiD9_IwSQfklksZNLTohA94YCpOeh4Eo8wkqqsrg/exec';

// Código de implantação
const DEPLOYMENT_ID = 'AKfycbx_V_XghYTCgxC2Z8fKcp4LNz2fmmDiD9_IwSQfklksZNLTohA94YCpOeh4Eo8wkqqsrg';

// Configuração para leitura direta via Google Sheets API
const SHEETS_CONFIG = {
  spreadsheetId: '1kmInW5nE1FkEEXKrshFOIMCtFvpZ40FOqtmI8lvla50',
  apiKey: 'AIzaSyACvSKy0LPzd7pA45HRK0Mv1ZS843FoaYM',
  publicUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_xMy3mNYKEtHVe9zEthTPPi_LS7oUz6Z9pF53lDUkJXbLVEvjyPn__ubSH4Tde9jankHavQUVuVWv/pubhtml',
  ranges: {
    estudantes: 'estudantes!A:I',
    peis: 'peis!A:J'
  }
};

// Flag para usar leitura via API (mais rápida) ou via Apps Script
const USAR_GOOGLE_SHEETS_API_PARA_LEITURA = true;

console.log('✅ Configuração carregada - Versão Final');
