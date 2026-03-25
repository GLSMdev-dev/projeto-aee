// ============================================
// SISTEMA AEE - API (Versão com no-cors)
// ============================================

// ============================================
// FUNÇÕES DE LEITURA (Google Sheets API)
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
    console.error('Erro ao ler planilha:', error);
    return [];
  }
}

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

async function listarPEIs(estudanteId = null) {
  mostrarLoading(true);
  try {
    let todosPEIs = await lerPlanilha(SHEETS_CONFIG.ranges.peis);
    if (estudanteId) {
      return todosPEIs.filter(pei => pei.estudanteId == estudanteId);
    }
    return todosPEIs;
  } catch (error) {
    console.error('Erro:', error);
    return [];
  } finally {
    mostrarLoading(false);
  }
}

// ============================================
// FUNÇÕES DE ESCRITA (via iframe - contorna CORS)
// ============================================

function enviarViaIframe(action, caminho, dados, id = null) {
  return new Promise((resolve, reject) => {
    let url = `${API_URL}?action=${action}&caminho=${caminho}`;
    if (id) url += `&id=${id}`;
    
    // Adicionar dados na URL
    if (dados) {
      url += `&_data=${encodeURIComponent(JSON.stringify(dados))}`;
    }
    
    // Criar iframe invisível
    const iframeId = 'iframe_' + Date.now();
    const iframe = document.createElement('iframe');
    iframe.name = iframeId;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    const timeout = setTimeout(() => {
      document.body.removeChild(iframe);
      reject(new Error('Timeout'));
    }, 30000);
    
    iframe.onload = () => {
      clearTimeout(timeout);
      document.body.removeChild(iframe);
      resolve({ sucesso: true });
    };
    
    iframe.src = url;
  });
}

async function criarEstudante(estudante) {
  mostrarLoading(true);
  try {
    console.log('Criando estudante:', estudante.nome);
    const resultado = await enviarViaIframe('criar', 'estudante', estudante);
    mostrarMensagem('Estudante cadastrado com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('Erro ao criar:', error);
    mostrarMensagem('Erro ao cadastrar estudante', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function atualizarEstudante(id, estudante) {
  mostrarLoading(true);
  try {
    const resultado = await enviarViaIframe('atualizar', 'estudante', estudante, id);
    mostrarMensagem('Estudante atualizado com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    mostrarMensagem('Erro ao atualizar estudante', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function deletarEstudante(id) {
  mostrarLoading(true);
  try {
    const resultado = await enviarViaIframe('deletar', 'estudante', null, id);
    mostrarMensagem('Estudante excluído com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('Erro ao deletar:', error);
    mostrarMensagem('Erro ao excluir estudante', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function criarPEI(pei) {
  mostrarLoading(true);
  try {
    const resultado = await enviarViaIframe('criar', 'pei', pei);
    mostrarMensagem('PEI criado com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('Erro ao criar PEI:', error);
    mostrarMensagem('Erro ao criar PEI', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function atualizarPEI(id, pei) {
  mostrarLoading(true);
  try {
    const resultado = await enviarViaIframe('atualizar', 'pei', pei, id);
    mostrarMensagem('PEI atualizado com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('Erro ao atualizar PEI:', error);
    mostrarMensagem('Erro ao atualizar PEI', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function deletarPEI(id) {
  mostrarLoading(true);
  try {
    const resultado = await enviarViaIframe('deletar', 'pei', null, id);
    mostrarMensagem('PEI excluído com sucesso!', 'success');
    return resultado;
  } catch (error) {
    console.error('Erro ao deletar PEI:', error);
    mostrarMensagem('Erro ao excluir PEI', 'error');
    throw error;
  } finally {
    mostrarLoading(false);
  }
}

async function verificarConexao() {
  try {
    const url = `${API_URL}?action=listar&caminho=estudantes&_=${Date.now()}`;
    const response = await fetch(url, { mode: 'no-cors' });
    return true;
  } catch (error) {
    console.log('Sem conexão:', error.message);
    return false;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Verificando conexão com o servidor...');
  const conectado = await verificarConexao();
  if (conectado) {
    console.log('✅ Conexão com o servidor estabelecida');
  } else {
    console.log('⚠️ Modo offline: usando dados locais');
  }
});
