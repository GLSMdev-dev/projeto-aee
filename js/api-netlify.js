// ============================================
// SISTEMA AEE - API (Apenas Apps Script)
// ============================================

// ============================================
// FUNÇÕES DE COMUNICAÇÃO COM APPS SCRIPT
// ============================================

async function chamarAppsScript(action, caminho, dados = null, id = null) {
  return new Promise((resolve, reject) => {
    let url = `${API_URL}?action=${action}&caminho=${caminho}`;
    if (id) url += `&id=${id}`;
    
    // Adicionar dados na URL
    if (dados) {
      url += `&_data=${encodeURIComponent(JSON.stringify(dados))}`;
    }
    
    // Adicionar timestamp para evitar cache
    url += `&_=${Date.now()}`;
    
    // Criar script JSONP para contornar CORS
    const callbackName = 'callback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);
    
    window[callbackName] = function(response) {
      delete window[callbackName];
      document.body.removeChild(script);
      if (response && response.erro) {
        reject(new Error(response.erro));
      } else {
        resolve(response);
      }
    };
    
    const script = document.createElement('script');
    script.src = url + `&callback=${callbackName}`;
    script.onerror = () => {
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error('Falha na comunicação com o servidor'));
    };
    
    document.body.appendChild(script);
    
    // Timeout
    setTimeout(() => {
      if (window[callbackName]) {
        delete window[callbackName];
        if (document.body.contains(script)) document.body.removeChild(script);
        reject(new Error('Timeout na requisição'));
      }
    }, 30000);
  });
}

// ============================================
// CRUD ESTUDANTES
// ============================================

async function listarEstudantes() {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('listar', 'estudantes');
    return resultado.estudantes || [];
  } catch (error) {
    console.error('Erro ao listar:', error);
    return [];
  } finally {
    mostrarLoading(false);
  }
}

async function criarEstudante(estudante) {
  mostrarLoading(true);
  try {
    console.log('📝 Criando estudante:', estudante.nome);
    const resultado = await chamarAppsScript('criar', 'estudante', estudante);
    mostrarMensagem('✅ Estudante cadastrado com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('❌ Erro ao criar:', error);
    mostrarMensagem('❌ Erro ao cadastrar estudante', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function atualizarEstudante(id, estudante) {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('atualizar', 'estudante', estudante, id);
    mostrarMensagem('✅ Estudante atualizado com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('❌ Erro ao atualizar:', error);
    mostrarMensagem('❌ Erro ao atualizar estudante', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function deletarEstudante(id) {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('deletar', 'estudante', null, id);
    mostrarMensagem('✅ Estudante excluído com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('❌ Erro ao deletar:', error);
    mostrarMensagem('❌ Erro ao excluir estudante', 'error');
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
    let url = 'listar';
    let caminho = 'peis';
    let params = {};
    if (estudanteId) params.estudanteId = estudanteId;
    
    const resultado = await chamarAppsScript('listar', 'peis', null, null, params);
    return resultado.peis || [];
  } catch (error) {
    console.error('Erro ao listar PEIs:', error);
    return [];
  } finally {
    mostrarLoading(false);
  }
}

async function criarPEI(pei) {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('criar', 'pei', pei);
    mostrarMensagem('✅ PEI criado com sucesso!', 'success');
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
    mostrarMensagem('✅ PEI atualizado com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('❌ Erro ao atualizar PEI:', error);
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
    mostrarMensagem('✅ PEI excluído com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('❌ Erro ao deletar PEI:', error);
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
    await chamarAppsScript('listar', 'estudantes');
    return true;
  } catch (error) {
    console.log('⚠️ Sem conexão:', error.message);
    return false;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🔍 Verificando conexão com o servidor...');
  const conectado = await verificarConexao();
  if (conectado) {
    console.log('✅ Conexão com o servidor estabelecida');
  } else {
    console.log('⚠️ Modo offline: usando dados locais');
  }
});
