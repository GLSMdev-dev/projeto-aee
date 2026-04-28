# 🔐 Configuração de GitHub Secrets - Sistema AEE

## 📋 Visão Geral

Este projeto usa **GitHub Secrets** para armazenar informações sensíveis (API keys, IDs de planilhas, etc.) de forma segura. Os secrets **nunca** são commitados no repositório - apenas o template está no Git.

### Fluxo de Segurança
```
Repository (GitHub Secrets ocultos)
           ↓
GitHub Actions Workflow (deploy.yml / deploy-dev.yml)
           ↓
Lê secrets do ambiente
           ↓
Substitui placeholders em config-template.js
           ↓
Gera config.js em tempo de build
           ↓
Deploy para GitHub Pages
```

## 🔧 Secrets Necessários

Você precisa configurar **5 secrets** no repositório:

| Secret | Descrição | Exemplo |
|--------|-----------|---------|
| `API_URL` | URL do Google Apps Script deployment | `https://script.google.com/macros/d/ABC123xyz...` |
| `DEPLOYMENT_ID` | ID do deployment do Apps Script | `ABC123xyz` |
| `SPREADSHEET_ID` | ID da planilha Google Sheets | `1qW2eR3tY4uIoPaFdH5gJ6kL7z8x9c0v` |
| `API_KEY` | Google API Key para Sheets | `AIzaSyD...` |
| `PUBLIC_URL` | URL pública da planilha (opcional) | `https://docs.google.com/spreadsheets/d/...` |

## 📱 Como Configurar os Secrets

### Passo 1: Ir para as Configurações do Repositório
1. Abrir: https://github.com/GLSMdev-dev/projeto-aee/settings
2. Ou: Repository → Settings

### Passo 2: Acessar Secrets and Variables
1. Lado esquerdo: "Secrets and variables" 
2. Clique em "Actions"
3. Aba "Repository secrets"

### Passo 3: Adicionar Cada Secret

#### 3.1 - `API_URL` (Obrigatório)
```
Name: API_URL
Value: https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/useless
```
Onde `YOUR_DEPLOYMENT_ID` é o ID publicado do Apps Script.

#### 3.2 - `DEPLOYMENT_ID` (Obrigatório)
```
Name: DEPLOYMENT_ID
Value: AIzaSyD1qW2eR3tY4uI5oPaS6FdH7gJ8kL9zX (exemplo)
```
Obtido em: Google Cloud Console → APIs & Services → Credentials

#### 3.3 - `SPREADSHEET_ID` (Obrigatório)
```
Name: SPREADSHEET_ID
Value: 1qW2eR3tY4uIoPaFdH5gJ6kL7z8x9c0v (exemplo)
```
Da URL da planilha:
```
https://docs.google.com/spreadsheets/d/[ESTE_É_O_ID]/edit
```

#### 3.4 - `API_KEY` (Obrigatório)
```
Name: API_KEY
Value: AIzaSyC...xyz (chave completa da Google API)
```

#### 3.5 - `PUBLIC_URL` (Opcional)
```
Name: PUBLIC_URL
Value: https://docs.google.com/spreadsheets/d/1qW2eR3tY4uIoPaFdH5gJ6kL7z8x9c0v/edit
```

## 🔍 Verificar se Está Funcionando

### Local (Desenvolvimento)
Para testar localmente, crie um arquivo `.env.local` (NÃO COMMITAR):
```bash
# .env.local (adicionado ao .gitignore)
API_URL=sua_url_aqui
DEPLOYMENT_ID=seu_id_aqui
SPREADSHEET_ID=seu_id_aqui
API_KEY=sua_chave_aqui
PUBLIC_URL=sua_url_publica_aqui
```

### No GitHub Actions
1. Fazer push para a branch `main` (ou `develop/novas-features` para dev)
2. Ir para: Repository → Actions
3. Ver o workflow `deploy.yml` rodando
4. Verificar logs:
   ```
   ✅ config.js gerado
   ```

## 📝 Arquivo Template (config-template.js)

Este arquivo contém **placeholders** que serão substituídos pelos secrets:

```javascript
const API_URL = '{{API_URL}}';
const DEPLOYMENT_ID = '{{DEPLOYMENT_ID}}';

const SHEETS_CONFIG = {
  spreadsheetId: '{{SPREADSHEET_ID}}',
  apiKey: '{{API_KEY}}',
  publicUrl: '{{PUBLIC_URL}}',
  ranges: {
    estudantes: 'estudantes!A:J',
    peis: 'peis!A:L',
    users: 'users!A:G'
  }
};
```

Os placeholders `{{VAR_NAME}}` são substituídos pelo workflow durante o build.

## 🛡️ Boas Práticas de Segurança

✅ **Faça Isso:**
- Usar GitHub Secrets para valores sensíveis
- Usar `config-template.js` no repositório
- Adicionar `config.js` ao `.gitignore`
- Rotacionar API keys periodicamente
- Usar contas de serviço específicas (não pessoais)

❌ **Nunca Faça Isso:**
- Commitar `config.js` no Git
- Compartilhar secrets em chat/email
- Usar mesma API key em dev/prod
- Deixar secrets em logs públicos
- Comprometer repositories com acesso antigo

## 🔄 Atualizar um Secret

Se precisar mudar uma chave:

1. GitHub → Settings → Secrets → Update
2. Alterar o valor
3. Fazer push para disparar novo build
4. O novo `config.js` será gerado automaticamente

## 📊 Estrutura Esperada

Após o workflow, `js/config.js` deve ficar assim:

```javascript
// ============================================
// CONFIGURAÇÃO DO SISTEMA AEE (GERADO NO DEPLOY)
// ============================================

const API_URL = 'https://script.google.com/macros/d/ABC123xyz/useless';
const DEPLOYMENT_ID = 'ABC123xyz';

const SHEETS_CONFIG = {
  spreadsheetId: '1qW2eR3tY4uIoPaFdH5gJ6kL7z8x9c0v',
  apiKey: 'AIzaSyD...',
  publicUrl: 'https://docs.google.com/spreadsheets/d/...',
  ranges: {
    estudantes: 'estudantes!A:J',
    peis: 'peis!A:L',
    users: 'users!A:G'
  }
};

const USAR_LEITURA_RAPIDA = true;

const ANOS_ESCOLARES = ['1º Ano', '2º Ano', ...];

console.log('✅ Configuração carregada');
```

## 🚨 Troubleshooting

### Workflow falha com "config.js não encontrado"
**Solução:** Verificar se o arquivo `js/config-template.js` existe no repositório

### Console mostra "Configuração não carregada"
**Solução:** 
- Verificar se `js/config.js` existe (gerado pelo workflow)
- Confirmar que secrets estão preenchidos corretamente
- Fazer hard refresh (Ctrl+Shift+R)

### API retorna 403 (sem acesso)
**Solução:**
- Verificar se API_KEY tem permissões corretas
- Verificar se SPREADSHEET_ID está correto
- Confirmar que a chave não expirou

### Deploy não atualiza o config.js
**Solução:**
- Fazer push para disparar workflow
- Limpar cache do GitHub Pages (pode levar 5 min)
- Verificar abas "Actions" para erros

## 📚 Referências

- [GitHub Secrets Docs](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Google API Keys](https://cloud.google.com/docs/authentication/api-keys)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Google Apps Script Deployment](https://developers.google.com/apps-script/guides/deployment)

## 👤 Permissões Necessárias

Para adicionar secrets, você precisa ser:
- Owner do repositório, OU
- Ter permissão "Admin" no repositório

---

**Última atualização:** 28 de abril de 2026  
**Status:** ✅ Sistema implementado e seguro
