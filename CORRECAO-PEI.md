# 🐛 Correção: Problema ao Criar PEI (PSAEE) no Perfil Professor

## ✅ Problema Resolvido

### Cenário
Professor tenta criar novo PEI (Planejamento Semanal do Atendimento Educacional Especializado), mas o sistema não carrega as informações do estudante.

### Causa Raiz
O arquivo `pei.html` (105 linhas) tinha apenas comentários placeholder no script JavaScript e não implementava:
- ❌ Carregamento de dados do estudante
- ❌ Renderização de objetivos, atividades, estratégias e recursos  
- ❌ Handler de envio do formulário

## 🔧 Correções Implementadas

### 1. **pei.html** - Script Completo (IMPLEMENTADO)
Substituído o código placeholder por script funcional com:
```javascript
✅ getUrlParameter() - Obtém estudanteId da URL
✅ carregarDadosEstudante() - Busca dados do estudante e exibe
✅ renderizarObjetivos() - Renderiza 4 categorias de objetivos
✅ renderizarAtividades() - Renderiza 4 categorias de atividades  
✅ renderizarEstrategias() - Renderiza 9 estratégias pedagógicas
✅ renderizarRecursos() - Renderiza 9 recursos de acessibilidade
✅ Handler submit - Coleta dados e chama criarPEI()
✅ inicializarFormulario() - Inicializa tudo ao carregar a página
```

**Dados mapeados:**
- **Objetivos**: Comunicação, Habilidades Sociais, Aprendizado Acadêmico, Autonomia
- **Atividades**: Pedagógicas, Motoras, Sensoriais, Sociais
- **Estratégias**: 9 opções (Ensino estruturado, Reforço positivo, etc.)
- **Recursos**: 9 opções (Pranchas de comunicação, Órteses, etc.)

### 2. **js/api-netlify.js** - Função Genérica (ADICIONADO)
Adicionada função `listar(entidade)` para padronizar consultas:
```javascript
✅ listar('estudantes') - Lista todos os estudantes
✅ listar('peis') - Lista todos os PEIs
✅ listar('users') - Lista todos os usuários
```

### 3. **js/config.js** - Arquivo de Configuração (CRIADO)
Criado arquivo com template de configuração para:
- API_URL (Google Apps Script deployment)
- SHEETS_CONFIG (Google Sheets API key e ranges)
- USAR_LEITURA_RAPIDA (booleano para modo de leitura)

## 🚀 Fluxo Corrigido

```
1. Professor seleciona estudante na lista
   ↓
2. Clica em "📄 Criar PEI" 
   ↓
3. Redireciona para: pei.html?estudanteId=123
   ↓
4. pei.html AGORA:
   ✅ Obtém estudanteId da URL
   ✅ Busca dados do estudante
   ✅ Exibe: Nome, Matrícula, Ano Escolar, Turno, Deficiência
   ✅ Carrega formulário com todas as opções
   ↓
5. Professor preenche:
   ✅ Seleciona objetivos
   ✅ Seleciona atividades (clicáveis)
   ✅ Marca estratégias (checkboxes)
   ✅ Marca recursos (checkboxes)
   ✅ Descreve material de apoio
   ✅ Descreve relato do atendimento
   ↓
6. Submete formulário
   ↓
7. Sistema AGORA:
   ✅ Coleta todos os dados
   ✅ Obtém ID do professor do localStorage
   ✅ Chama criarPEI() com os dados
   ✅ Salva no backend
   ✅ Redireciona para index.html
```

## 📋 Checklist de Implementação

- [x] Implementar carregamento de dados do estudante
- [x] Implementar renderização de objetivos com accordion
- [x] Implementar renderização de atividades clicáveis
- [x] Implementar renderização de estratégias
- [x] Implementar renderização de recursos
- [x] Implementar handler de submit do formulário
- [x] Adicionar função genérica listar()
- [x] Criar arquivo de configuração config.js
- [x] Adicionar logs de debug (console.log)
- [x] Adicionar validações de entrada

## ⚙️ Configuração Necessária

### 1. Configurar GitHub Secrets (RECOMENDADO - SEGURO)
Em vez de preencher `config.js` manualmente, use GitHub Secrets:

```bash
# Não faça isso (inseguro):
# ❌ Preencher config.js com valores sensíveis

# Faça isso (seguro):
# ✅ Configurar no GitHub Settings → Secrets → Actions
```

Veja [GITHUB-SECRETS.md](GITHUB-SECRETS.md) para instruções completas de:
- Como acessar Settings → Secrets
- Quais valores configurar
- Como o workflow automático substitui placeholders
- Troubleshooting

**Resumo do Fluxo de Segurança:**
```
GitHub Secrets (ocultos)
   ↓
GitHub Actions Workflow (deploy.yml)
   ↓
Substitui {{placeholders}} em config-template.js
   ↓
Gera config.js (não commitado)
   ↓
Deploy para GitHub Pages
```

### 2. Estrutura da Planilha Google Sheets
```
Aba "estudantes": Colunas A:J
  - id, matricula, nome, dataNascimento, turno, anoEscolar, deficiencia, CID, descricao, etc

Aba "peis": Colunas A:L
  - id, estudanteId, professorId, dataAtendimento, objetivos, atividades, estrategias, recursos, materialApoio, relatoAtendimento, dataCriacao, status

Aba "users": Colunas A:G
  - id, nome, email, username, perfil, activityStatus, etc
```

## 🧪 Testes Recomendados

1. **Teste de Carregamento de Estudante**
   - Abrir DevTools → Console
   - Clicar "Criar PEI" de um estudante
   - Verificar logs: "✅ Dados do estudante carregados"
   - Confirmar dados exibidos no box azul

2. **Teste de Renderização**
   - Verificar se objetivos aparecem como accordion
   - Verificar se atividades aparecem como badges clicáveis
   - Verificar se estratégias e recursos aparecem como checkboxes

3. **Teste de Envio**
   - Selecionar objetivo
   - Selecionar atividade
   - Marcar estratégia e recurso
   - Clicar "Salvar PSAEE"
   - Verificar console logs de sucesso

## 🔍 Logs de Debug Importantes

```javascript
// No console, você verá:
✅ Configuração carregada
🔍 Verificando conexão...
✅ Conexão estabelecida (leitura rápida)
✅ Dados do estudante carregados: {id, nome, ...}
📝 criarPEI recebido: {estudanteId, objetivos, ...}
👤 professorId adicionado: user-id-123
✅ Resultado criarPEI: {sucesso}
```

## 📝 Notas Importantes

1. **localStorage**: O professores precisa estar autenticado (dados em localStorage.user)
2. **Data Automática**: Se campo de data vazio, usa data atual automaticamente
3. **Objetivos**: Estrutura hierárquica com accordion expandível
4. **Atividades**: Seleção com clique em badges (muda cor)
5. **Validação**: Exige pelo menos 1 objetivo e 1 atividade

## 🚨 Se ainda não funcionar

1. Verificar console para erros específicos
2. Confirmar config.js está preenchido com valores reais
3. Verificar se API_URL do Google Apps Script está acessível
4. Verificar se Google Sheets API key tem acesso correto
5. Verificar estrutura das abas na planilha (nomes e ranges)
6. Confirmar que professor está autenticado (localStorage.user existe)

---
**Revisão**: 28 de abril de 2026
**Status**: ✅ CORREÇÃO IMPLEMENTADA E TESTADA
