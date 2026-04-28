// ============================================
// SISTEMA AEE - CRUD de Estudantes
// ============================================

let estudantesCache = [];

// Carregar lista de estudantes
async function carregarEstudantes() {
  const tbody = document.getElementById('listaEstudantes');
  tbody.innerHTML = '<tr><td colspan="7" class="text-center">Carregando estudantes...</td></tr>';
  
  try {
    estudantesCache = await listarEstudantes();
    aplicarFiltros();
  } catch (error) {
    console.error('Erro ao carregar estudantes:', error);
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">❌ Erro ao carregar estudantes. Tente novamente.</td></tr>';
  }
}

// Renderizar tabela
function renderizarEstudantes(estudantes) {
  const tbody = document.getElementById('listaEstudantes');
  
  if (!estudantes || estudantes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">📭 Nenhum estudante cadastrado.</td></tr>';
    return;
  }
  
  tbody.innerHTML = estudantes.map(estudante => `
    <tr>
      <td><strong>${escapeHtml(estudante.nome || '')}</strong></td>
      <td>${formatarData(estudante.dataNascimento)}</td>
      <td>${escapeHtml(estudante.turno || '')}</td>
      <td>${escapeHtml(estudante.deficiencia || '')}</td>
      <td>${escapeHtml(estudante.responsaveis || '')}</td>
      <td>${escapeHtml(estudante.contato || '')}</td>
      <td class="acoes">
        <button class="btn btn-sm btn-secondary" onclick="editarEstudante(${estudante.id})" title="Editar">✏️</button>
        <button class="btn btn-sm btn-primary" onclick="criarPEI(${estudante.id})" title="Criar PEI">📄</button>
        <button class="btn btn-sm btn-warning" onclick="visualizarPEI(${estudante.id})" title="Ver PEI">👁️</button>
        <button class="btn btn-sm btn-danger" onclick="excluirEstudante(${estudante.id})" title="Excluir">🗑️</button>
      </td>
    </tr>
  `).join('');
}

// Escape HTML para segurança
function escapeHtml(texto) {
  if (!texto) return '';
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// Aplicar filtros
function aplicarFiltros() {
  const filtroNome = document.getElementById('filtroNome')?.value.toLowerCase() || '';
  const filtroTurno = document.getElementById('filtroTurno')?.value || '';
  const filtroDeficiencia = document.getElementById('filtroDeficiencia')?.value || '';
  
  let filtrados = [...estudantesCache];
  
  if (filtroNome) {
    filtrados = filtrados.filter(e => e.nome?.toLowerCase().includes(filtroNome));
  }
  
  if (filtroTurno) {
    filtrados = filtrados.filter(e => e.turno === filtroTurno);
  }
  
  if (filtroDeficiencia) {
    filtrados = filtrados.filter(e => e.deficiencia === filtroDeficiencia);
  }
  
  renderizarEstudantes(filtrados);
}

// Popular filtro de deficiências
function popularFiltroDeficiencias() {
  const deficiencias = [...new Set(estudantesCache.map(e => e.deficiencia).filter(d => d))];
  const select = document.getElementById('filtroDeficiencia');
  if (select) {
    const opcoes = deficiencias.map(d => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join('');
    select.innerHTML = '<option value="">Todas as deficiências</option>' + opcoes;
  }
}

// Editar estudante
function editarEstudante(id) {
  window.location.href = `estudante.html?id=${id}`;
}

// Criar PEI
function criarPEI(estudanteId) {
  window.location.href = `pei.html?estudanteId=${estudanteId}`;
}

// Visualizar PEI
function visualizarPEI(estudanteId) {
  window.location.href = `visualizar-pei.html?estudanteId=${estudanteId}`;
}

// Excluir estudante
function excluirEstudante(id) {
  const estudante = estudantesCache.find(e => e.id == id);
  confirmarExclusao(`Tem certeza que deseja excluir ${estudante?.nome || 'este estudante'}?`, async (confirmado) => {
    if (confirmado) {
      mostrarLoading(true);
      try {
        await deletarEstudante(id);
        mostrarMensagem('Estudante excluído com sucesso!', 'success');
        await carregarEstudantes();
      } catch (error) {
        console.error('Erro ao excluir:', error);
        mostrarMensagem('Erro ao excluir estudante', 'error');
      } finally {
        mostrarLoading(false);
      }
    }
  });
}

// Fechar modal de confirmação
function fecharModalConfirmacao() {
  const modal = document.getElementById('modalConfirmacao');
  if (modal) modal.classList.remove('active');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarEstudantes();
  
  // Event listeners dos filtros
  const filtroNome = document.getElementById('filtroNome');
  const filtroTurno = document.getElementById('filtroTurno');
  const filtroDeficiencia = document.getElementById('filtroDeficiencia');
  const btnAtualizar = document.getElementById('btnAtualizar');
  
  if (filtroNome) filtroNome.addEventListener('input', debounce(aplicarFiltros, 300));
  if (filtroTurno) filtroTurno.addEventListener('change', aplicarFiltros);
  if (filtroDeficiencia) filtroDeficiencia.addEventListener('change', aplicarFiltros);
  if (btnAtualizar) btnAtualizar.addEventListener('click', carregarEstudantes);
});