// Variaveis da Agenda
let parametrosAgenda = new URLSearchParams(window.location.search)
let dataAgenda = {
    dia: parseInt(parametrosAgenda.get("dia")),
    mes: parseInt(parametrosAgenda.get("mes")),
    ano: parseInt(parametrosAgenda.get("ano"))
}
let tituloAgenda = document.getElementById("agenda-titulo")
let popup = document.getElementById("modal-fundo") //o modal
let primeiroDiaSemana = new Date(dataAgenda.ano,dataAgenda.mes,dataAgenda.dia)
let ultimoDiaSemana = new Date(dataAgenda.ano,dataAgenda.mes,dataAgenda.dia)
// Variaveis do Calendario
let dataAtual = new Date()
let mesAtual = dataAgenda.mes
let anoAtual = dataAgenda.ano
let listaDeAnos = document.getElementById("year")
let listaDeMeses = document.getElementById("month")
let botaoAnterior = document.getElementById("anterior")
let botaoProximo = document.getElementById("proximo")
let tituloCalendario = document.getElementById("calendario-titulo")

let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"] // Lista com todos os mêses
let anos = [anoAtual-1, anoAtual, anoAtual+1] // Lista com o ano anterior, atual e próximo

//funções para a pagina
fazTitulo()
criaAgenda()
atualizaCalendario(mesAtual, anoAtual)

// função para desligar o modal se apertar na tela com ele aberto
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

// função para criar a agenda
function criaAgenda(){
    let tabela = document.getElementById("agenda-corpo") // Pega o elemento do calendário
    tabela.innerHTML = "" // Deixa o calendario limpo
    for (let i = 0; i < 12; i++) { // Cria a tabela com todos os horarios
        let linha = document.createElement("tr")
        for (let j = 0; j < 8; j++) { // Preenche cada semana com sete células
            if (j === 0) { // Deixa espaços em branco quando o mês começa no meio da semana
                let celula = document.createElement("td")
                let texto = document.createTextNode((i+8).toString()+"-"+(i+9).toString())
                celula.style.textAlign="center"
                celula.style.width="10%"
                celula.className="agenda"
                celula.appendChild(texto)
                linha.appendChild(celula)
            }
            else{ // transforma as celulas da agenda em botões para poder marcar eventos
                let celula = document.createElement("td")
                let texto = document.createTextNode("")
                celula.style.textAlign="center"
                celula.className="agenda"
                celula.appendChild(texto)
                linha.appendChild(celula)
                celula.addEventListener("click", adicionarEvento)
            }
        }
        tabela.appendChild(linha)
    }
    
    function adicionarEvento(evento){
        popup.style.display = "block";
        document.getElementById("modal").style.top = (evento.clientY - 70) + "px";
        document.getElementById("modal").style.left = (evento.clientX - 180) + "px";
        dragElement(document.getElementById("modal"));
    }
}

// faz o titulo
function fazTitulo(){
    primeiroDiaSemana.setDate(primeiroDiaSemana.getDate() - primeiroDiaSemana.getDay())
    ultimoDiaSemana.setDate(ultimoDiaSemana.getDate() + (6-ultimoDiaSemana.getDay()))
    tituloAgenda.innerHTML = primeiroDiaSemana.getDate() + " ate " + ultimoDiaSemana.getDate() + " "  + meses[dataAgenda.mes] + " " + dataAgenda.ano
}

// função estranha q eu achei na internet olhar dps
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.getElementById("modal-header").onmousedown = dragMouseDown;
    function dragMouseDown(evento) {
        evento = evento || window.event;
        evento.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = evento.clientX;
        pos4 = evento.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(evento) {
        evento = evento || window.event;
        evento.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - evento.clientX;
        pos2 = pos4 - evento.clientY;
        pos3 = evento.clientX;
        pos4 = evento.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}



// --CALENDARIO
for (let i = 0; i < 12; i++){
    let item = document.createElement("option")  // Cria o selecionador de anos com o ultimo e proximo ano
    item.value = i
    item.textContent = meses[i]
    listaDeMeses.appendChild(item)
}

for (let i = 0; i < 3; i++){
    let item = document.createElement("option")  // Cria o selecionador de anos com o ultimo e proximo ano
    item.value = anos[i]
    item.textContent = anos[i].toString()
    listaDeAnos.appendChild(item)
}

function proximo() {
    anoAtual = (mesAtual === 11) ? anoAtual + 1 : anoAtual
    mesAtual = (mesAtual + 1) % 12
    atualizaCalendario(mesAtual, anoAtual)
}

function hoje() {
    anoAtual = dataAtual.getFullYear()
    mesAtual = dataAtual.getMonth()
    atualizaCalendario(mesAtual, anoAtual)
}

function anterior() {
    anoAtual = (mesAtual === 0) ? anoAtual - 1 : anoAtual
    mesAtual = (mesAtual === 0) ? 11 : mesAtual - 1
    atualizaCalendario(mesAtual, anoAtual)
}

function jump() {
    anoAtual = parseInt(listaDeAnos.value)
    mesAtual = parseInt(listaDeMeses.value)
    atualizaCalendario(mesAtual, anoAtual)
}

function voltaProInicio(){
    window.location.href = "file:///C:/Users/betol/Desktop/PaginaDeInicio-Agenda/start.html"
}

function atualizaCalendario(mes, ano) {
    let primeiroDia = (new Date(ano, mes)).getDay()
    let quantidadeDeDias = 32 - new Date(ano, mes, 32).getDate()
    let tabela = document.getElementById("calendario-corpo") // Pega o elemento do calendário
    tabela.innerHTML = "" // Deixa o calendario limpo
    // Muda o titulo da página
    tituloCalendario.innerHTML = meses[mes] + " " + ano
    listaDeAnos.value = ano
    listaDeMeses.value = mes
    let dia = 1
    for (let i = 0; i < 6; i++) { // Cria a tabela com o máximo possível de linhas para dias em um mês
        let linha = document.createElement("tr")
        for (let j = 0; j < 7; j++) { // Preenche cada semana com sete células
            if (i === 0 && j < primeiroDia) { // Deixa espaços em branco quando o mês começa no meio da semana
                let celula = document.createElement("td")
                let texto = document.createTextNode(".")
                celula.style.textAlign="center"
                celula.appendChild(texto)
                linha.appendChild(celula)
            }
            else if (dia > quantidadeDeDias) { // Deleta a ultima linha da tabela caso ela seja desnecessária
                let celula = document.createElement("td")
                let texto = document.createTextNode(".")
                celula.style.textAlign="center"
                celula.appendChild(texto)
                linha.appendChild(celula)
            }
            else { // Preenche as células com os dias 
                let celula = document.createElement("td")
                let texto = document.createTextNode(dia)
                
                if (dia === dataAgenda.dia && ano === dataAgenda.ano && mes === dataAgenda.mes){
                    celula.style.backgroundColor="#5c5c5c"
                    celula.style.color="#ddd"
                } // muda a cor do dia selecionado para diferenciar
                if (dia === dataAtual.getDate() && ano === dataAtual.getFullYear() && mes === dataAtual.getMonth()) {
                    celula.style.backgroundColor="#eeeeee"
                    celula.style.color="#222"
                } // Muda a cor do dia atual pra diferenciar
                celula.style.textAlign="center" // Ainda não sei se fica melhor centralizado ou não
                celula.appendChild(texto) 
                linha.appendChild(celula)
                celula.addEventListener("click", ()=>{
                    iniciaAgenda(ano, mes, texto.nodeValue)
                })
                dia++
            }
        }
        tabela.appendChild(linha) // appending each linha into calendar body.

        if (mes == 0 && ano == anos[0]){ // esconde os botões de proximo e anterior quando chega no limite de anos
            botaoAnterior.style.visibility="hidden"
        }
        else{
            botaoAnterior.style.visibility="visible"
        }
        if (mes == 11 && ano == anos[2]){
            botaoProximo.style.visibility="hidden"
        }
        else{
            botaoProximo.style.visibility="visible"
        }
    }

    function iniciaAgenda(ano, mes, dia){
        window.location.href = "file:///C:/Users/betol/Desktop/PaginaDeInicio-Agenda/agenda.html?dia=" + dia +"&mes=" + mes +"&ano=" + ano;
    }
}