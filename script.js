// script.js

// Formatação de número para moeda BRL
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  
  // Cálculo da parcela fixa (Sistema Price)
  function calcularParcela(valorFinanciado, taxaJurosMensal, numParcelas) {
    if (taxaJurosMensal === 0) {
      return valorFinanciado / numParcelas;
    } else {
      const parcela =
        (valorFinanciado * taxaJurosMensal) /
        (1 - Math.pow(1 + taxaJurosMensal, -numParcelas));
      return parcela;
    }
  }
  
  // Simulador de financiamento
  document.getElementById('financeForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const preco = parseFloat(document.getElementById('preco').value);
    const entrada = parseFloat(document.getElementById('entrada').value);
    const parcelas = parseInt(document.getElementById('parcelas').value);
    const resultado = document.getElementById('resultado');
  
    // Validações básicas
    if (isNaN(preco) || preco <= 0) {
      alert('Por favor, informe um preço válido para a moto.');
      return;
    }
    if (isNaN(entrada) || entrada < 0) {
      alert('Por favor, informe um valor válido para a entrada.');
      return;
    }
    if (entrada > preco) {
      alert('A entrada não pode ser maior que o preço da moto.');
      return;
    }
    if (isNaN(parcelas) || parcelas < 1 || parcelas > 60) {
      alert('Número de parcelas deve ser entre 1 e 60.');
      return;
    }
  
    const taxaJurosMensal = 0.015; // 1.5% ao mês
    const valorFinanciado = preco - entrada;
  
    if (valorFinanciado === 0) {
      resultado.textContent = 'Parabéns! Você pagou a moto à vista.';
      return;
    }
  
    const valorParcela = calcularParcela(valorFinanciado, taxaJurosMensal, parcelas);
    const valorTotalPago = entrada + valorParcela * parcelas;
  
    resultado.innerHTML = `
      <p><strong>Valor financiado:</strong> ${formatarMoeda(valorFinanciado)}</p>
      <p><strong>Taxa de juros mensal:</strong> ${(taxaJurosMensal * 100).toFixed(2)}%</p>
      <p><strong>Quantidade de parcelas:</strong> ${parcelas}</p>
      <p><strong>Valor da parcela:</strong> ${formatarMoeda(valorParcela)}</p>
      <p><strong>Valor total pago:</strong> ${formatarMoeda(valorTotalPago)}</p>
    `;
  });
  
  // Personalização da moto
  function mostrarCustomizacao() {
    const cor = document.getElementById('cor').value;
    const acessorios = Array.from(
      document.querySelectorAll('#customForm input[type="checkbox"]:checked')
    ).map(el => el.value);
  
    const resultadoDiv = document.getElementById('customizacaoResultado');
  
    let texto = `<p>Cor selecionada: <strong>${cor}</strong></p>`;
    if (acessorios.length > 0) {
      texto += `<p>Acessórios extras selecionados:</p><ul>`;
      acessorios.forEach(item => {
        texto += `<li>${item}</li>`;
      });
      texto += `</ul>`;
    } else {
      texto += `<p>Nenhum acessório extra selecionado.</p>`;
    }
  
    resultadoDiv.innerHTML = texto;
  }
  