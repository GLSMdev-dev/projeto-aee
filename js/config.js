// ============================================
// CONFIGURAÇÃO DO SISTEMA AEE
// ============================================

// URL do Web App (Apps Script - VERSÃO FINAL)
const API_URL = 'https://script.google.com/macros/s/AKfycbwgf7IOPouerldwTSWRgQGX8H6aDmWtV2CYEgn6JHPg5RtBFD9Y7dm6B-vVvKIm8Nxi_A/exec';

// Código de implantação
const DEPLOYMENT_ID = 'AKfycbwgf7IOPouerldwTSWRgQGX8H6aDmWtV2CYEgn6JHPg5RtBFD9Y7dm6B-vVvKIm8Nxi_A';

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

console.log('✅ Configuração carregada');
