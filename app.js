 //let titulo = document.querySelector('h1')
 //titulo.innerHTML = 'Jogo do número secreto'

 //let paragrafo = document.querySelector('p')
 //paragrafo.innerHTML = 'Escolha um número entre 1 a 10'

let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1;

//Foi criado uma função de Tag/Campo para não ter que ficar replicando os códigos
function exibirTextoNaTela(tag, texto){
   let campo = document.querySelector(tag);
   campo.innerHTML = texto;
   //Responsive Voice só funciona se importar no código e no HTML
   responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});

}

function exibirMensagemInicial(){
exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial()

function verificarChute(){
   //O .value no final é para puxar apenas a informação inserida
   let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
      exibirTextoNaTela('h1', 'Acertou!');
      let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
      let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
      exibirTextoNaTela('p', mensagemTentativas);
      document.getElementById('reiniciar').removeAttribute('disabled')
    } else{
      if(chute > numeroSecreto){
         exibirTextoNaTela('p', 'O número secreto é menor');
      } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
      }
      tentativas++;
      limparCampo();
    }
 }

 function gerarNumeroAleatorio(){
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeElementosLista = listaNumerosSorteados.length;
  
  //Esse if é para verificar se a quantidade de elementos na lista atingiu a quantidade máxima
  //Caso tenha atingido a lista é reiniciada
  if(quantidadeElementosLista == numeroLimite){
    listaNumerosSorteados = []
  }
  //O .includes verifica se a informação está na lista
  if(listaNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
  }else{
    //O .push adiciona item ao final da lista
    listaNumerosSorteados.push(numeroEscolhido);
    console.log(listaNumerosSorteados)
    return numeroEscolhido;
  }
 }

 function limparCampo(){
   //Não colocou o .value no querySelector porque só quer pegar o campo e não o valor
   chute = document.querySelector('input');
   //Aqui foi informado o .value para alterar o valor do campo
   chute.value = '';
 }

 function reiniciarJogo(){
   numeroSecreto = gerarNumeroAleatorio();
   limparCampo()
   tentativas = 1
   exibirMensagemInicial()
   document.getElementById('reiniciar').setAttribute('disabled', true)
 }