// Array global
let listaDeCompras = [];

// Mapeamento do DOM
let formProduto = document.getElementById("formProduto");
let inputNome = document.getElementById("nome");
let inputQuantidade = document.getElementById("quantidade");
let inputPreco = document.getElementById("preco");
let listaCompras = document.getElementById("listaCompras");
let spanTotal = document.getElementById("valorTotal");

// Evento ao Adicionar
formProduto.addEventListener("submit", function(event) {
  event.preventDefault();

  let nome = inputNome.value;
  let quantidade = Number(inputQuantidade.value);
  let preco = Number(inputPreco.value);

  // Guardamos a quantidade, o preço unitário e o cálculo na mesma string
  let itemFormatado = quantidade + "x " + nome + " - R$ " + preco.toFixed(2) + " cada";

  // Guardamos também o valor total desse item específico no array ou calculamos diretamente
  listaDeCompras.push({
    texto: itemFormatado,
    subtotal: quantidade * preco
  });

  atualizarLista();
  formProduto.reset();
  inputNome.focus();
});

// Renderiza a lista e calcula o valor total acumulado
function atualizarLista() {
  listaCompras.innerHTML = "";
  let totalGeral = 0;

  listaDeCompras.forEach(function(item, index) {
    // Adiciona o item na tela
    listaCompras.innerHTML += 
      "<li>" +
        "<span>" + item.texto + "</span>" +
        "<button onclick='removerItem(" + index + ")'>Remover</button>" +
      "</li>";

    // Soma o subtotal ao valor total geral
    totalGeral += item.subtotal;
  });

  // Atualiza o texto do valor total formatado com 2 casas decimais
  spanTotal.innerHTML = totalGeral.toFixed(2);
}
function comprar(){
  let span = document.createElement("span");

  span.textContent = "Compra feita com sucesso!";

  document.body.appendChild(span);

  span.style.position = "fixed";
  span.style.fontSize = "50px"
  span.style.top = "20px";
  span.style.left = "50%";
  span.style.transform = "translateX(-50%)";

  setTimeout(() => {
    span.remove();
  }, 3000);
}

// Remoção
function removerItem(index) {
  listaDeCompras.splice(index, 1);
  atualizarLista(); // Ao redesenhar, o totalGeral é recalculado do zero automaticamente!
}