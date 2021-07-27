const inputList = document.querySelector('.lista-de-tarefas');
const buttonTarefa = document.querySelector('.adc-tarefa');
const listTarefa = document.querySelector('.lista-tarefa');

function criaLi() {
    const li = document.createElement('li');
    return li; 
}

inputList.addEventListener('keypress', function (e) {if (e.keyCode === 13){
    if(!inputList.value) return;
    criaTarefa(inputList.value)
};   
});

function limpaInput() {
    inputList.value = '';
    inputList.focus();
}

function criaButaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar')
    botaoApagar.innerText = 'Apagar';
    li.appendChild(botaoApagar);
}

function criaTarefa (textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    listTarefa.appendChild(li)
    limpaInput();
    criaButaoApagar(li);
    salvarTarefas();
}

buttonTarefa.addEventListener('click', function(e){
    if(!inputList.value) return;
    criaTarefa(inputList.value)
});

document.addEventListener('click', function(e) {
    const element = e.target;
    if(element.classList.contains('apagar')){
      element.parentElement.remove();
      salvarTarefas();

    }
});

function salvarTarefas() {
    const liTarefas = listTarefa.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefaList of liTarefas){
        let tarefaTexto = tarefaList.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefaJson = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefaJson)
}

function adcTarefaSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
    console.log(listaDeTarefas)
}
adcTarefaSalvas()