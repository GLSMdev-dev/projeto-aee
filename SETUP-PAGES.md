# 📋 Guia Visual: Habilitar GitHub Pages

## ⚡ TL;DR - 2 Minutos

1. Ir para: https://github.com/GLSMdev-dev/projeto-aee/settings/pages
2. Selecionar "GitHub Actions" em Source
3. Clicar "Save"
4. Fazer push: `git push origin main`
5. Aguardar deploy (1-2 min)
6. Acessar: https://glsmsdev-dev.github.io/projeto-aee/

---

## 🎯 Passo-a-Passo com Screenshots (Descrição)

### PASSO 1: Abrir Settings do Repositório
```
GitHub.com → Seu Repositório → Settings (tab no topo)
```

### PASSO 2: Acessar Pages
No menu esquerdo:
```
Settings → Pages
```

### PASSO 3: Configurar Source
Você verá algo assim:

```
┌──────────────────────────────────────────────────────────┐
│ Source                                                   │
│                                                          │
│ ○ Deploy from a branch                                  │
│ ◉ GitHub Actions                    ← SELECIONAR ISTO  │
│                                                          │
│                          [Save]                          │
└──────────────────────────────────────────────────────────┘
```

**Clique em "GitHub Actions"** e depois em **"Save"**

### PASSO 4: Confirmar Habilitação
Após salvar, você verá:

```
✅ Your GitHub Pages site is currently being built 
   from the main branch using GitHub Actions.

🔗 Visit site: https://glsmsdev-dev.github.io/projeto-aee/
```

---

## 🚀 Iniciar Deploy

### Opção A: Automático (Push)
```bash
# No terminal do seu PC
cd ~/Área\ de\ Trabalho/codes/projeto-aee-main
git push origin main

# Isso dispara o workflow automaticamente!
```

### Opção B: Manual (GitHub Web)
1. Ir para: https://github.com/GLSMdev-dev/projeto-aee/actions
2. Selecionar workflow "Deploy to GitHub Pages"
3. Clicar "Run workflow"
4. Confirmar

---

## 📊 Monitorar Deploy

### Ver Status do Workflow
```
GitHub → Actions → "Deploy to GitHub Pages" (workflow)
```

Você verá dois jobs:
1. **build** ✅
   - Checkout código
   - Gera config.js a partir de secrets
   - Upload artifact

2. **deploy** ✅
   - Faz deploy para GitHub Pages

### Logs Esperados
Quando tudo funciona:
```
✅ build completed
   ├─ ✅ Checkout
   ├─ ✅ Create config.js from template
   └─ ✅ Upload artifact
✅ deploy completed
   └─ ✅ Deploy to GitHub Pages
     Pages enabled for this repo
     Deployment successful!
```

---

## 🌐 Acessar o Sistema

Após deploy bem-sucedido (1-2 minutos):

```
https://glsmsdev-dev.github.io/projeto-aee/
```

Você deve ver:
- 🔐 Página de login do Sistema AEE
- Todos os assets carregando (CSS, JS, imagens)
- config.js carregado com valores dos secrets

---

## ⚠️ Possíveis Problemas

### "Deploy job is waiting for approval"
**Solução:**
1. Settings → Environments → github-pages
2. Desabilitar "Require reviewers"

### "Artifact not found in build"
**Solução:**
- Verificar se build job tem erro nos logs
- Confirmar que config-template.js existe
- Confirmar que secrets estão preenchidos

### Site mostra "404"
**Solução:**
- Aguardar 5 minutos (cache do GitHub Pages)
- Hard refresh: Ctrl+Shift+R
- Confirmar que Pages está usando gh-pages branch

### "Your site is ready to be published" (aviso amarelo)
**Solução:**
- Completamente normal
- Site já está sendo publicado
- Aguardar propagação de DNS (até 10 min)

---

## ✅ Checklist Final

- [ ] GitHub Pages habilitado em Settings → Pages
- [ ] Source: "GitHub Actions" selecionado
- [ ] Workflow: .github/workflows/deploy.yml corrigido
- [ ] 5 Secrets configurados:
  - [ ] API_URL
  - [ ] DEPLOYMENT_ID
  - [ ] SPREADSHEET_ID
  - [ ] API_KEY
  - [ ] PUBLIC_URL
- [ ] Push feito: `git push origin main`
- [ ] Workflow completou (build + deploy)
- [ ] Site acessível: https://glsmsdev-dev.github.io/projeto-aee/

---

## 🎯 URL Final

Seu sistema estará em:
```
https://glsmsdev-dev.github.io/projeto-aee/
```

Compartilhe este link com seus usuários! 🎉

---

**Dúvidas?** Ver:
- [DEPLOY-GITHUB-PAGES.md](DEPLOY-GITHUB-PAGES.md) - Documentação completa
- [GITHUB-SECRETS.md](GITHUB-SECRETS.md) - Configuração de secrets
- [QUICKSTART.md](QUICKSTART.md) - Início rápido
