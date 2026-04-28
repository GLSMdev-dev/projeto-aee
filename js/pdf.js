// ============================================
// SISTEMA AEE - Geração de PDF
// ============================================

// Carregar bibliotecas (serão adicionadas no HTML)
// Usaremos html2canvas + jsPDF

async function gerarPDF(elementoId, nomeArquivo = 'pei-estudante.pdf') {
  mostrarLoading(true);
  
  try {
    // Verificar se as bibliotecas estão carregadas
    if (typeof html2canvas === 'undefined') {
      throw new Error('Biblioteca html2canvas não carregada');
    }
    if (typeof jspdf === 'undefined' && typeof jsPDF === 'undefined') {
      throw new Error('Biblioteca jsPDF não carregada');
    }
    
    const elemento = document.getElementById(elementoId);
    if (!elemento) {
      throw new Error('Elemento não encontrado');
    }
    
    // Capturar o elemento como canvas
    const canvas = await html2canvas(elemento, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // Criar PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    // Adicionar primeira página
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Adicionar páginas extras se necessário
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Salvar PDF
    pdf.save(nomeArquivo);
    mostrarMensagem('PDF gerado com sucesso!', 'success');
    
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    mostrarMensagem('Erro ao gerar PDF: ' + error.message, 'error');
  } finally {
    mostrarLoading(false);
  }
}

// Função para imprimir diretamente
function imprimirPEI() {
  const conteudo = document.getElementById('peiParaImpressao');
  if (!conteudo) return;
  
  const janelaImpressao = window.open('', '_blank');
  janelaImpressao.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>PEI - Plano Educacional Individualizado</title>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
          color: #212529;
          line-height: 1.5;
        }
        .pei-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #2c6e9e;
        }
        .pei-header h1 {
          color: #2c6e9e;
          margin-bottom: 10px;
        }
        .pei-header h2 {
          color: #4c9f70;
          font-size: 1.2rem;
        }
        .info-escola {
          background: #e8f0f7;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .info-estudante {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #2c6e9e;
        }
        .info-estudante h3 {
          color: #2c6e9e;
          margin-bottom: 10px;
        }
        .grid-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }
        .secao {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }
        .secao h3 {
          background: #2c6e9e;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 1rem;
        }
        .secao h4 {
          color: #4c9f70;
          margin: 10px 0 5px 0;
        }
        .lista {
          padding-left: 20px;
          margin: 8px 0;
        }
        .lista li {
          margin: 5px 0;
        }
        .badge {
          display: inline-block;
          background: #e9ecef;
          padding: 4px 10px;
          border-radius: 15px;
          margin: 3px;
          font-size: 0.85rem;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #dee2e6;
          text-align: center;
          font-size: 0.8rem;
          color: #6c757d;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none;
          }
          .secao {
            break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      ${conteudo.innerHTML}
      <div class="footer">
        <p>Documento gerado pelo Sistema AEE - PEI em ${new Date().toLocaleDateString('pt-BR')}</p>
      </div>
    </body>
    </html>
  `);
  
  janelaImpressao.document.close();
  janelaImpressao.print();
}