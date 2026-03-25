// ============================================
// SISTEMA AEE - API (Apenas Apps Script)
// VERSÃO CORRIGIDA
// ============================================

async function chamarAppsScript(action, caminho, dados = null, id = null) {
  // Construir URL corretamente
  let url = `${API_URL}?action=${action}&caminho=${caminho}`;
  if (id) url += `&id=${id}`;
  if (dados) url += `&_data=${encodeURIComponent(JSON.stringify(dados))}`;
  url += `&_=${Date.now()}`;
  
  console.log('📤 URL:', url);
  
  try {
    const response = await fetch(url);
    const resultado = await response.json();
    console.log('📥 Resposta:', resultado);
    return resultado;
  } catch (error) {
    console.error('❌ Erro na chamada:', error);
    throw error;
  }
}

async function listarEstudantes() {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('listar', 'estudantes');
    return resultado.estudantes || [];
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
    const resultado = await chamarAppsScript('criar', 'estudante', estudante);
    if (resultado.sucesso) {
      mostrarMensagem('✅ Estudante cadastrado com sucesso!', 'success');
    } else {
      mostrarMensagem('❌ Erro: ' + (resultado.erro || 'Desconhecido'), 'error');
    }
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
    mostrarMensagem('✅ Estudante atualizado!', 'success');
    return resultado;
  } catch (error) {
    console.error('❌ Erro:', error);
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
    console.error('❌ Erro:', error);
    mostrarMensagem('❌ Erro ao excluir', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function listarPEIs(estudanteId = null) {
  mostrarLoading(true);
  try {
    const resultado = await chamarAppsScript('listar', 'peis');
    let peis = resultado.peis || [];
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
    const resultado = await chamarAppsScript('criar', 'pei', pei);
    mostrarMensagem('✅ PEI criado!', 'success');
    return resultado;
  } catch (error) {
    console.error('❌ Erro:', error);
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
    console.error('❌ Erro:', error);
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
    console.error('❌ Erro:', error);
    mostrarMensagem('❌ Erro ao excluir PEI', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function verificarConexao() {
  try {
    const resultado = await chamarAppsScript('listar', 'estudantes');
    return resultado && !resultado.erro;
  } catch (error) {
    return false;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🔍 Verificando conexão...');
  const conectado = await verificarConexao();
  if (conectado) {
    console.log('✅ Conexão estabelecida');
  } else {
    console.log('⚠️ Modo offline');
  }
});
