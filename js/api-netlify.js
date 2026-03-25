// ============================================
// SISTEMA AEE - API OTIMIZADA
// Leitura: Google Sheets API (rápido)
// Escrita: Apps Script (lento, mas necessário)
// ============================================

// ============================================
// LEITURA RÁPIDA (Google Sheets API)
// ============================================

async function lerPlanilha(range) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.spreadsheetId}/values/${range}?key=${SHEETS_CONFIG.apiKey}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    if (!data.values || data.values.length === 0) return [];
    
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
    console.error('Erro na leitura rápida:', error);
    return [];
  }
}

// ============================================
// ESCRITA (Apps Script - via fetch)
// ============================================

async function escreverAppsScript(action, caminho, dados = null, id = null) {
  let url = `${API_URL}?action=${action}&caminho=${caminho}`;
  if (id) url += `&id=${id}`;
  if (dados) url += `&_data=${encodeURIComponent(JSON.stringify(dados))}`;
  url += `&_=${Date.now()}`;
  
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Erro na escrita:', error);
    throw error;
  }
}

// ============================================
// CRUD ESTUDANTES (LEITURA RÁPIDA)
// ============================================

async function listarEstudantes() {
  mostrarLoading(true);
  try {
    const estudantes = await lerPlanilha(SHEETS_CONFIG.ranges.estudantes);
    return estudantes;
  } catch (error) {
    console.error('Erro:', error);
    return [];
  } finally {
    mostrarLoading(false);
  }
}

async function criarEstudante(estudante) {
  mostrarLoading(true);
  try {
    console.log('📝 Criando estudante:', estudante.nome);
    const resultado = await escreverAppsScript('criar', 'estudante', estudante);
    mostrarMensagem('✅ Estudante cadastrado!', 'success');
    return resultado;
  } catch (error) {
    mostrarMensagem('❌ Erro ao cadastrar', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function atualizarEstudante(id, estudante) {
  mostrarLoading(true);
  try {
    const resultado = await escreverAppsScript('atualizar', 'estudante', estudante, id);
    mostrarMensagem('✅ Estudante atualizado!', 'success');
    return resultado;
  } catch (error) {
    mostrarMensagem('❌ Erro ao atualizar', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function deletarEstudante(id) {
  mostrarLoading(true);
  try {
    const resultado = await escreverAppsScript('deletar', 'estudante', null, id);
    mostrarMensagem('✅ Estudante excluído!', 'success');
    return resultado;
  } catch (error) {
    mostrarMensagem('❌ Erro ao excluir', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

// ============================================
// CRUD PEIs (LEITURA RÁPIDA)
// ============================================

async function listarPEIs(estudanteId = null) {
  mostrarLoading(true);
  try {
    let peis = await lerPlanilha(SHEETS_CONFIG.ranges.peis);
    if (estudanteId) {
      peis = peis.filter(p => p.estudanteId == estudanteId);
    }
    return peis;
  } catch (error) {
    console.error('Erro:', error);
    return [];
  } finally {
    mostrarLoading(false);
  }
}

async function criarPEI(pei) {
  mostrarLoading(true);
  try {
    const resultado = await escreverAppsScript('criar', 'pei', pei);
    mostrarMensagem('✅ PEI criado!', 'success');
    return resultado;
  } catch (error) {
    mostrarMensagem('❌ Erro ao criar PEI', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function atualizarPEI(id, pei) {
  mostrarLoading(true);
  try {
    const resultado = await escreverAppsScript('atualizar', 'pei', pei, id);
    mostrarMensagem('✅ PEI atualizado!', 'success');
    return resultado;
  } catch (error) {
    mostrarMensagem('❌ Erro ao atualizar PEI', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function deletarPEI(id) {
  mostrarLoading(true);
  try {
    const resultado = await escreverAppsScript('deletar', 'pei', null, id);
    mostrarMensagem('✅ PEI excluído!', 'success');
    return resultado;
  } catch (error) {
    mostrarMensagem('❌ Erro ao excluir PEI', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

// ============================================
// VERIFICAÇÃO DE CONEXÃO
// ============================================

async function verificarConexao() {
  try {
    await lerPlanilha(SHEETS_CONFIG.ranges.estudantes);
    return true;
  } catch (error) {
    return false;
  }
}
// ============================================
// FUNÇÕES PARA USUÁRIOS (ADMIN)
// ============================================

async function listarUsers() {
  const resultado = await chamarAppsScript('listar', 'users');
  return resultado.dados || [];
}

async function criarUser(user) {
  return await chamarAppsScript('criar', 'user', user);
}

async function atualizarUser(id, user) {
  return await chamarAppsScript('atualizar', 'user', user, id);
}

async function deletarUser(id) {
  return await chamarAppsScript('deletar', 'user', null, id);
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🔍 Verificando conexão...');
  const conectado = await verificarConexao();
  if (conectado) {
    console.log('✅ Conexão estabelecida (leitura rápida)');
  } else {
    console.log('⚠️ Modo offline');
  }
});
