// ============================================
// CONFIGURAÇÃO DO SISTEMA
// ============================================

const API_URL = '{{API_URL}}';
const DEPLOYMENT_ID = '{{DEPLOYMENT_ID}}';

const SHEETS_CONFIG = {
  spreadsheetId: '{{SPREADSHEET_ID}}',
  apiKey: '{{API_KEY}}',
  publicUrl: '{{PUBLIC_URL}}',
  ranges: {
    estudantes: 'estudantes!A:J',
    peis: 'peis!A:J',
    users: 'users!A:G'
  }
};

const USAR_LEITURA_RAPIDA = true;

// Lista de anos escolares
const ANOS_ESCOLARES = [
  '1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano',
  '6º Ano', '7º Ano', '8º Ano', '9º Ano'
];

console.log('✅ Configuração carregada');
