// ============================================
// SISTEMA AEE - API (JSONP - sem CORS)
// ============================================

// ============================================
// FUNÇÃO PRINCIPAL (JSONP)
// ============================================

function chamarJSONP(action, caminho, dados = null, id = null) {
  return new Promise((resolve, reject) => {
    let url = `${API_URL}?action=${action}&caminho=${caminho}`;
    if (id) url += `&id=${id}`;
    
    if (dados) {
      url += `&_data=${encodeURIComponent(JSON.stringify(dados))}`;
    }
    
    url += `&_=${Date.now()}`;
    
    const callbackName = 'jsonp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);
    
    window[callbackName] = function(response) {
      delete window[callbackName];
      if (document.body.contains(script)) document.body.removeChild(script);
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
      if (document.body.contains(script)) document.body.removeChild(script);
      reject(new Error('Falha na comunicação com o servidor'));
    };
    
    document.body.appendChild(script);
    
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
    const resultado = await chamarJSONP('listar', 'estudantes');
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
    const resultado = await chamarJSONP('criar', 'estudante', estudante);
    mostrarMensagem('✅ Estudante cadastrado com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('❌ Erro:', error);
    mostrarMensagem('❌ Erro ao cadastrar estudante', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function atualizarEstudante(id, estudante) {
  mostrarLoading(true);
  try {
    const resultado = await chamarJSONP('atualizar', 'estudante', estudante, id);
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
    const resultado = await chamarJSONP('deletar', 'estudante', null, id);
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

// ============================================
// CRUD PEIs
// ============================================

async function listarPEIs(estudanteId = null) {
  mostrarLoading(true);
  try {
    let url = `${API_URL}?action=listar&caminho=peis&_=${Date.now()}`;
    if (estudanteId) url += `&estudanteId=${estudanteId}`;
    
    const resultado = await chamarJSONP('listar', 'peis');
    return resultado.peis || [];
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
    const resultado = await chamarJSONP('criar', 'pei', pei);
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
    const resultado = await chamarJSONP('atualizar', 'pei', pei, id);
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
    const resultado = await chamarJSONP('deletar', 'pei', null, id);
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

// ============================================
// VERIFICAÇÃO DE CONEXÃO
// ============================================

async function verificarConexao() {
  try {
    await chamarJSONP('listar', 'estudantes');
    return true;
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
