// ============================================
// SISTEMA AEE - API COMPLETA
// ============================================

// ============================================
// FUNÇÕES DE COMUNICAÇÃO
// ============================================

async function chamarAppsScript(action, entity, dados = null, id = null, params = {}) {
  let url = `${API_URL}?action=${action}&entity=${entity}`;
  if (id) url += `&id=${id}`;
  if (dados) url += `&_data=${encodeURIComponent(JSON.stringify(dados))}`;
  
  // Adicionar parâmetros extras
  for (const [key, value] of Object.entries(params)) {
    if (value) url += `&${key}=${encodeURIComponent(value)}`;
  }
  
  url += `&_=${Date.now()}`;
  
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
}

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
    console.error('Erro na leitura:', error);
    return [];
  }
}

// ============================================
// CRUD ESTUDANTES
// ============================================

async function listarEstudantes() {
  if (USAR_LEITURA_RAPIDA) {
    return await lerPlanilha(SHEETS_CONFIG.ranges.estudantes);
  } else {
    const resultado = await chamarAppsScript('listar', 'estudantes');
    return resultado.dados || [];
  }
}

async function criarEstudante(estudante) {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('criar', 'estudante', estudante);
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
    const resultado = await chamarAppsScript('atualizar', 'estudante', estudante, id);
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
    const resultado = await chamarAppsScript('deletar', 'estudante', null, id);
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
// CRUD PEIs
// ============================================

async function listarPEIs(estudanteId = null) {
  mostrarLoading(true);
  try {
    if (USAR_LEITURA_RAPIDA) {
      let peis = await lerPlanilha(SHEETS_CONFIG.ranges.peis);
      if (estudanteId) {
        peis = peis.filter(p => p.estudanteId == estudanteId);
      }
      // Ordenar por data (mais recente primeiro)
      peis.sort((a, b) => {
        const dateA = a.dataCriacao ? new Date(a.dataCriacao.split(' ')[0].split('/').reverse().join('-')) : 0;
        const dateB = b.dataCriacao ? new Date(b.dataCriacao.split(' ')[0].split('/').reverse().join('-')) : 0;
        return dateB - dateA;
      });
      return peis;
    } else {
      const resultado = await chamarAppsScript('listar', 'peis');
      let peis = resultado.dados || [];
      if (estudanteId) {
        peis = peis.filter(p => p.estudanteId == estudanteId);
      }
      return peis;
    }
  } catch (error) {
    console.error('Erro:', error);
    return [];
  } finally {
    mostrarLoading(false);
  }
}

async function criarPEI(pei) {
  console.log('criarPEI recebido:', pei);
  mostrarLoading(true);
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      pei.professorId = user.id;
    }
    pei.status = 'ativo';
    const resultado = await chamarAppsScript('criar', 'pei', pei);
    console.log('Resultado criarPEI:', resultado);
    mostrarMensagem('✅ PEI criado!', 'success');
    return resultado;
  } catch (error) {
    console.error('❌ Erro ao criar PEI:', error);
    mostrarMensagem('❌ Erro ao criar PEI', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function atualizarPEI(id, pei) {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('atualizar', 'pei', pei, id);
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
    const resultado = await chamarAppsScript('deletar', 'pei', null, id);
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
// CRUD USUÁRIOS
// ============================================

async function listarUsers() {
  const resultado = await chamarAppsScript('listar', 'users');
  return resultado.dados || [];
}

async function listarProfessores() {
  const users = await listarUsers();
  return users.filter(u => u.perfil === 'professor' && u.activityStatus === 'true');
}

async function criarUser(user) {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('criar', 'user', user);
    mostrarMensagem('✅ Usuário criado!', 'success');
    return resultado;
  } catch (error) {
    mostrarMensagem('❌ Erro ao criar usuário', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function atualizarUser(id, user) {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('atualizar', 'user', user, id);
    mostrarMensagem('✅ Usuário atualizado!', 'success');
    return resultado;
  } catch (error) {
    mostrarMensagem('❌ Erro ao atualizar usuário', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function deletarUser(id) {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('deletar', 'user', null, id);
    mostrarMensagem('✅ Usuário excluído!', 'success');
    return resultado;
  } catch (error) {
    mostrarMensagem('❌ Erro ao excluir usuário', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

// ============================================
// LOGIN
// ============================================

async function fazerLoginAPI(username, senha) {
  const url = `${API_URL}?action=login&_data=${encodeURIComponent(JSON.stringify({ username, senha }))}&_=${Date.now()}`;
  const response = await fetch(url);
  return await response.json();
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

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🔍 Verificando conexão...');
  const conectado = await verificarConexao();
  if (conectado) {
    console.log('✅ Conexão estabelecida (leitura rápida)');
  } else {
    console.log('⚠️ Modo offline');
  }
});
