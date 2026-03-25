// ============================================
// SISTEMA AEE - Utilitários
// ============================================

// Mostrar/ocultar loading
function mostrarLoading(mostrar = true) {
  const loadingEl = document.getElementById('loading');
  if (loadingEl) {
    if (mostrar) {
      loadingEl.classList.add('active');
    } else {
      loadingEl.classList.remove('active');
    }
  }
}

// Exibir mensagem toast (alert temporário)
function mostrarMensagem(mensagem, tipo = 'success') {
  const toast = document.createElement('div');
  toast.className = `alert alert-${tipo}`;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.zIndex = '3000';
  toast.style.maxWidth = '300px';
  toast.style.boxShadow = 'var(--shadow-hover)';
  toast.textContent = mensagem;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Confirmar exclusão com modal
function confirmarExclusao(mensagem, callback) {
  const modal = document.getElementById('modalConfirmacao');
  const msgEl = document.getElementById('confirmacaoMensagem');
  const confirmarBtn = document.getElementById('confirmarExclusao');
  const cancelarBtn = document.getElementById('cancelarExclusao');
  
  msgEl.textContent = mensagem;
  modal.classList.add('active');
  
  const handleConfirmar = () => {
    modal.classList.remove('active');
    confirmarBtn.removeEventListener('click', handleConfirmar);
    cancelarBtn.removeEventListener('click', handleCancelar);
    callback(true);
  };
  
  const handleCancelar = () => {
    modal.classList.remove('active');
    confirmarBtn.removeEventListener('click', handleConfirmar);
    cancelarBtn.removeEventListener('click', handleCancelar);
    callback(false);
  };
  
  confirmarBtn.addEventListener('click', handleConfirmar);
  cancelarBtn.addEventListener('click', handleCancelar);
}

// Formatar data para exibição
function formatarData(dataStr) {
  if (!dataStr) return '';
  // Tenta converter se for string
  const data = new Date(dataStr);
  if (isNaN(data.getTime())) return dataStr;
  return data.toLocaleDateString('pt-BR');
}

// Formatar data para input date (YYYY-MM-DD)
function formatarDataInput(dataStr) {
  if (!dataStr) return '';
  const partes = dataStr.split('/');
  if (partes.length === 3) {
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }
  return dataStr;
}

// Gerar ID temporário (para frontend)
function gerarIdTemp() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce para campos de busca
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}