# 🚀 Corrigindo Deploy no GitHub Pages

## ⚠️ Erro Identificado

```
Error: Get Pages site failed. Please verify that the repository has Pages enabled 
and configured to build using GitHub Actions
```

### Causa
GitHub Pages não estava habilitado ou não estava configurado para usar GitHub Actions como fonte de build.

## ✅ Solução (Implementada)

### 1. Workflow Corrigido
O arquivo `.github/workflows/deploy.yml` foi corrigido:
- ❌ Removido: Step "Setup Pages" que causava o erro
- ✅ Adicionado: Job "deploy" separado com environment `github-pages`
- ✅ Estrutura correta: build job → deploy job (com dependency)

### 2. Estrutura Agora Correta
```yaml
jobs:
  build:
    - Checkout código
    - Gera config.js a partir de secrets
    - Upload artifact para GitHub
  
  deploy:
    - Depende do build estar completo
    - Tem environment "github-pages"
    - Faz o deploy para o Pages
```

## 🔧 Configuração Necessária no GitHub

### Passo 1: Ir para Settings → Pages
```
https://github.com/GLSMdev-dev/projeto-aee/settings/pages
```

### Passo 2: Habilitar GitHub Pages
1. Em "Source", selecionar: **"GitHub Actions"**
2. Clicar em "Save"

```
┌─────────────────────────────────────┐
│  Source                             │
│  ○ Deploy from a branch             │
│  ◉ GitHub Actions                   │ ← Selecionar isto
│                                     │
│  [Save]                             │
└─────────────────────────────────────┘
```

### Passo 3: Confirmar Configuração
Após salvar, você verá:
- ✅ "Your GitHub Pages site is currently being built from the `main` branch."
- 📍 URL do site: `https://glsmsdev-dev.github.io/projeto-aee/`

## 🚀 Fazer o Deploy

### Opção 1: Automático (Recomendado)
```bash
# Fazer push para main
git push origin main

# Isso dispara o workflow automaticamente
# Monitorar em: GitHub → Actions
```

### Opção 2: Manual
1. Ir para: https://github.com/GLSMdev-dev/projeto-aee/actions
2. Selecionar workflow: "Deploy to GitHub Pages"
3. Clicar em "Run workflow"
4. Esperar completar (~1-2 minutos)

## 📊 Acompanhar o Deploy

### No GitHub Actions
1. Ir para: https://github.com/GLSMdev-dev/projeto-aee/actions
2. Clicar no workflow "Deploy to GitHub Pages"
3. Ver status:
   ```
   ✅ build     [concluído]
      └─ Checkout
      └─ Create config.js from template
      └─ Upload artifact
   
   ✅ deploy    [concluído]
      └─ Deploy to GitHub Pages
   ```

### Logs Esperados
```
🔧 Gerando config.js...
✅ Template encontrado. Gerando config.js...
✅ config.js gerado
=== Primeiras linhas do config.js ===
const API_URL = 'https://script.google.com/macros/d/ABC123/useless';
const DEPLOYMENT_ID = 'ABC123';

Pages enabled for this repo successfully
Deployment successful!
✅ Deployment to github-pages completed successfully
```

## 🌐 Acessar o Sistema

Após deploy bem-sucedido:
```
https://glsmsdev-dev.github.io/projeto-aee/
```

## ⚙️ Estrutura do Deploy

```
main branch (GitHub)
    ↓ push
GitHub Actions workflow (deploy.yml)
    ↓
Build job:
  1. Checkout code
  2. Gera config.js (com secrets)
  3. Upload artifact
    ↓
Deploy job:
  1. Baixa artifact
  2. Faz deploy para gh-pages branch
    ↓
GitHub Pages
    ↓
Site publicado: https://glsmsdev-dev.github.io/projeto-aee/
```

## 🔒 Segurança Mantida

- ✅ Secrets **nunca** aparecem em logs públicos
- ✅ `config.js` é gerado apenas no build
- ✅ Artifacts temporários são deletados após deploy
- ✅ `gh-pages` branch gerenciado automaticamente

## ❓ Troubleshooting

### "Deploy job waiting for approval"
**Solução:** Ir em Settings → Environments → github-pages → Desabilitar "Require reviewers"

### "Artifact not found"
**Solução:** Verificar se build job completou com sucesso nos logs

### Site não atualiza
**Solução:** 
- Fazer hard refresh: Ctrl+Shift+R
- Esperar até 5 minutos (cache)
- Verificar URL: deve ser https://glsmsdev-dev.github.io/projeto-aee/

### "404 - Page not found"
**Solução:**
- Confirmar que index.html existe na raiz
- Confirmar que GitHub Pages está apontando para gh-pages branch (automático)

## 📝 Checklist de Deploy

- [ ] Configurar GitHub Pages: Settings → Pages → "GitHub Actions"
- [ ] Verificar workflow: `.github/workflows/deploy.yml`
- [ ] Configurar 5 secrets (API_URL, DEPLOYMENT_ID, etc.)
- [ ] Fazer push para main: `git push origin main`
- [ ] Acompanhar workflow: https://github.com/GLSMdev-dev/projeto-aee/actions
- [ ] Acessar site: https://glsmsdev-dev.github.io/projeto-aee/

## 🎉 Pronto!

Após seguir estes passos, seu sistema estará publicado e acessível na web! 🚀

---

**Última atualização:** 30 de abril de 2026  
**Workflow:** deploy.yml corrigido  
**Status:** ✅ Pronto para deploy
