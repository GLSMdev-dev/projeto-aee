// ============================================
// SISTEMA AEE - API para Netlify
// Versão com suas configurações
// ============================================

// ============================================
// FUNÇÕES DE LEITURA (Google Sheets API)
// ============================================

async function lerPlanilha(range) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.spreadsheetId}/values/${range}?key=${SHEETS_CONFIG.apiKey}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Erro na API:', response.status);
      return [];
    }
    
    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      console.log('Nenhum dado encontrado na planilha');
      return [];
    }
    
    const headers = data.values[0];
    const registros = [];
    
    for (let i = 1; i < data.values.length; i++) {
      const registro = {};
      headers.forEach((header, idx) => {
        registro[header] = data.values[i][idx] || '';
      });
      registros.push(registro);
    }
    
    return registros;
  } catch (error) {
    console.error('Erro ao ler planilha:', error);
    return [];
  }
}

// ============================================
// LISTAR ESTUDANTES
// ============================================

async function listarEstudantes() {
  mostrarLoading(true);
  
  try {
    if (USAR_GOOGLE_SHEETS_API_PARA_LEITURA) {
      console.log('Usando Google Sheets API para leitura');
      const estudantes = await lerPlanilha(SHEETS_CONFIG.ranges.estudantes);
      return estudantes;
    } else {
      console.log('Usando Apps Script para leitura');
      return await listarEstudantesViaAppsScript();
    }
  } catch (error) {
    console.error('Erro ao listar estudantes:', error);
    return [];
  } finally {
    mostrarLoading(false);
  }
}

async function listarEstudantesViaAppsScript() {
  try {
    const url = `${API_URL}?action=listar&caminho=estudantes&_=${Date.now()}`;
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.estudantes || [];
  } catch (error) {
    console.error('Erro no Apps Script:', error);
    return [];
  }
}

// ============================================
// LISTAR PEIs
// ============================================

async function listarPEIs(estudanteId = null) {
  mostrarLoading(true);
  
  try {
    let todosPEIs = [];
    
    if (USAR_GOOGLE_SHEETS_API_PARA_LEITURA) {
      console.log('Usando Google Sheets API para ler PEIs');
      todosPEIs = await lerPlanilha(SHEETS_CONFIG.ranges.peis);
    } else {
      todosPEIs = await listarPEIsViaAppsScript(estudanteId);
    }
    
    if (estudanteId) {
      return todosPEIs.filter(pei => pei.estudanteId == estudanteId);
    }
    
    return todosPEIs;
  } catch (error) {
    console.error('Erro ao listar PEIs:', error);
    return [];
  } finally {
    mostrarLoading(false);
  }
}

async function listarPEIsViaAppsScript(estudanteId) {
  try {
    let url = `${API_URL}?action=listar&caminho=peis&_=${Date.now()}`;
    if (estudanteId) url += `&estudanteId=${estudanteId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.peis || [];
  } catch (error) {
    console.error('Erro no Apps Script:', error);
    return [];
  }
}

// ============================================
// FUNÇÕES DE ESCRITA (Apps Script)
// ============================================

async function chamarAPI(action, caminho, dados = null, id = null) {
  mostrarLoading(true);
  
  try {
    let url = `${API_URL}?action=${action}&caminho=${caminho}`;
    if (id) url += `&id=${id}`;
    
    const options = {
      method: dados ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    };
    
    if (dados) {
      options.body = JSON.stringify(dados);
    }
    
    console.log(`Chamando API: ${action} ${caminho}`);
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro na chamada API:', error);
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

// ============================================
// CRUD ESTUDANTES (ESCRITA)
// ============================================

async function criarEstudante(estudante) {
  console.log('Criando estudante:', estudante.nome);
  return await chamarAPI('criar', 'estudante', estudante);
}

async function atualizarEstudante(id, estudante) {
  console.log('Atualizando estudante ID:', id);
  return await chamarAPI('atualizar', 'estudante', estudante, id);
}

async function deletarEstudante(id) {
  console.log('Deletando estudante ID:', id);
  return await chamarAPI('deletar', 'estudante', null, id);
}

// ============================================
// CRUD PEIs (ESCRITA)
// ============================================

async function criarPEI(pei) {
  console.log('Criando PEI para estudante ID:', pei.estudanteId);
  return await chamarAPI('criar', 'pei', pei);
}

async function atualizarPEI(id, pei) {
  console.log('Atualizando PEI ID:', id);
  return await chamarAPI('atualizar', 'pei', pei, id);
}

async function deletarPEI(id) {
  console.log('Deletando PEI ID:', id);
  return await chamarAPI('deletar', 'pei', null, id);
}

// ============================================
// VERIFICAR CONEXÃO
// ============================================

async function verificarConexao() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${API_URL}?action=listar&caminho=estudantes&_=${Date.now()}`, {
      method: 'GET',
      signal: controller.signal,
      mode: 'cors'
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.log('Sem conexão com o servidor:', error.message);
    return false;
  }
}

// Testar conexão ao carregar
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Verificando conexão com o servidor...');
  const conectado = await verificarConexao();
  if (conectado) {
    console.log('✅ Conexão com o servidor estabelecida');
  } else {
    console.log('⚠️ Modo offline: usando dados locais');
  }
});