# 🚀 Quick Start - Sistema AEE

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Configurar GitHub Secrets
1. Ir para: https://github.com/GLSMdev-dev/projeto-aee/settings/secrets/actions
2. Adicionar 5 secrets (veja [GITHUB-SECRETS.md](GITHUB-SECRETS.md) para detalhes):
   - `API_URL`
   - `DEPLOYMENT_ID`
   - `SPREADSHEET_ID`
   - `API_KEY`
   - `PUBLIC_URL`

### 2️⃣ Fazer Push
```bash
git push origin main
```

### 3️⃣ Workflow Automático
- GitHub Actions executa `deploy.yml`
- Substitui placeholders no `config-template.js`
- Gera `config.js` (não commitado)
- Faz deploy para GitHub Pages
- ✅ Sistema pronto!

### 4️⃣ Acessar o Sistema
```
https://glsmsdev-dev.github.io/projeto-aee/
```

## 📁 Estrutura do Projeto

```
projeto-aee/
├── index.html                    # Login
├── admin.html                    # Painel administrativo
├── estudante.html               # Cadastro/edição de estudante
├── pei.html                     # ✅ Criar PSAEE (CORRIGIDO)
├── visualizar-pei.html          # Visualizar PSAEE anterior
├── usuario.html                 # Gerenciar usuários
├── gestor.html                  # Painel do gestor
├── login.html                   # Página de login
│
├── js/
│   ├── config-template.js       # Template com placeholders {{VAR}}
│   ├── config.js                # ❌ Gerado no deploy (gitignored)
│   ├── api-netlify.js          # API para Google Sheets/Apps Script
│   ├── estudantes.js           # CRUD de estudantes
│   ├── utils.js                # Funções utilitárias
│   └── pdf.js                  # Geração de PDFs
│
├── css/
│   └── style.css               # Estilos globais
│
├── assets/
│   └── (imagens do projeto)
│
├── .github/workflows/
│   ├── deploy.yml              # Deploy para produção (main branch)
│   └── deploy-dev.yml          # Deploy DEV (develop/novas-features)
│
├── .gitignore                  # js/config.js é ignorado
├── CORRECAO-PEI.md            # ✅ Solução do problema de PEI
├── GITHUB-SECRETS.md          # 🔐 Configuração de secrets
└── README.md
```

## 🔐 Segurança

- ✅ Secrets **nunca** aparecem no Git
- ✅ `config.js` é gerado no build
- ✅ GitHub Pages faz deploy automaticamente
- ✅ Sem exposição de API keys

## 🧪 Funcionalidades Principais

### 👤 Perfis de Usuário
- **Admin**: Acesso total, gerencia usuários
- **Gestor**: Visualiza relatórios, monitora PEIs
- **Professor**: Cria e gerencia PEIs dos estudantes

### 📋 Fluxos Principais
1. **Professor cria PSAEE**
   - Seleciona estudante
   - Preenche objetivos, atividades, estratégias, recursos
   - Registra relato do atendimento
   - Salva automaticamente

2. **Gestor visualiza dados**
   - Painel com estatísticas
   - Filtros por período, deficiência, professor
   - Exportação de relatórios

3. **Admin gerencia sistema**
   - Cadastra usuários
   - Configura permissões
   - Mantém base de dados

## 📚 Documentação

- [GITHUB-SECRETS.md](GITHUB-SECRETS.md) - Como configurar secrets
- [CORRECAO-PEI.md](CORRECAO-PEI.md) - Solução do problema de PEI
- [API.md](API.md) - (Futuro) Documentação da API

## 💾 Banco de Dados (Google Sheets)

Estrutura esperada:

**Aba: estudantes**
```
id | matricula | nome | dataNascimento | turno | anoEscolar | deficiencia | CID | descricao
```

**Aba: peis**
```
id | estudanteId | professorId | dataAtendimento | objetivos | atividades | estrategias | recursos | materialApoio | relatoAtendimento | dataCriacao | status
```

**Aba: users**
```
id | nome | email | username | perfil | activityStatus
```

## 🔗 Recursos Externos

- [Google Sheets API](https://developers.google.com/sheets/api)
- [Google Apps Script](https://developers.google.com/apps-script)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

## ❓ Problemas Comuns

**Problema:** "Configuração não carregada"
- **Solução:** Verificar se secrets estão preenchidos em GitHub Settings

**Problema:** "API retorna 404"
- **Solução:** Confirmar SPREADSHEET_ID e API_KEY são válidas

**Problema:** Deploy falhou
- **Solução:** Ir para Actions → Ver logs do workflow

## 🆘 Suporte

Para erros específicos, ver logs em:
- GitHub Actions: https://github.com/GLSMdev-dev/projeto-aee/actions
- Console do navegador: F12 → Console

---

**Pronto?** Siga os 4 passos acima e o sistema estará funcionando! 🎉
