// ============================================
// CONFIGURAÇÃO DO SISTEMA AEE
// ============================================

// URL do Web App (seu Apps Script - ATUALIZADA)
const API_URL = 'https://script.google.com/macros/s/AKfycbwtnh8Nea5MjIoaq-ldpfJfN5Lqetwh4PovBcZnUZUYbY4vbrWwKXGLTdLzYeBQA55yXA/exec';
// Código de implantação
const DEPLOYMENT_ID = 'AKfycbwtnh8Nea5MjIoaq-ldpfJfN5Lqetwh4PovBcZnUZUYbY4vbrWwKXGLTdLzYeBQA55yXA';

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
