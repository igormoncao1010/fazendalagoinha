// URLs para API (exemplo para dolar e ouro)
// Usarei ExchangeRate-API para dólar e simulação para ouro
// Para ouro usarei valor fixo simulado, pois API gratuita não é trivial

async function fetchCotacaoDolar() {
  try {
    // Exemplo usando ExchangeRate-API (precisa chave, mas tem free trial)
//    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    
    // Como não dá pra garantir chave aqui, vou usar API do BrasilAPI para dolar comercial:
    const res = await fetch('https://brasilapi.com.br/api/taxas/v1/dolar');
    const data = await res.json();
    // data.venta (preço do dólar venda)
    return parseFloat(data.venta).toFixed(2);
  } catch (error) {
    return null;
  }
}

async function fetchCotacaoOuro() {
  try {
    // Simulando preço do ouro por grama em R$
    // Você pode integrar APIs como Metals-API (pago)
    // Aqui vou simular um valor fixo variável:
    const simulatedPrice = (310 + Math.random() * 10).toFixed(2); // R$ 310 a 320
    return simulatedPrice;
  } catch {
    return null;
  }
}

function updateCotacoes(dolar, ouro) {
  const dolarElem = document.getElementById('cotacao-dolar');
  const ouroElem = document.getElementById('cotacao-ouro');
  const melElem = document.getElementById('cotacao-mel');
  const carbonoElem = document.getElementById('cotacao-carbono');

  dolarElem.textContent = dolar ? `R$ ${dolar.replace('.', ',')}` : 'Erro';
  ouroElem.textContent = ouro ? `R$ ${ouro.replace('.', ',')}` : 'Erro';

  // Valores fixos para mel e carbono, podem ser atualizados manualmente
  melElem.textContent = 'R$ 35,00'; 
  carbonoElem.textContent = 'R$ 100,00';
}

async function atualizarCotacoes() {
  const dolar = await fetchCotacaoDolar();
  const ouro = await fetchCotacaoOuro();

  updateCotacoes(dolar, ouro);
}

// Atualiza as cotações ao carregar a página e a cada 5 minutos
window.addEventListener('load', () => {
  atualizarCotacoes();
  setInterval(atualizarCotacoes, 5 * 60 * 1000);
});
