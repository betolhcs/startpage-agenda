let today = new Date()

let mesAtual = today.getMonth()
let anoAtual = today.getFullYear()

let listaDeAnos = document.getElementById("year")
let listaDeMeses = document.getElementById("month")

let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"] // Lista com todos os mêses
let anos = [anoAtual-1, anoAtual, anoAtual+1] // Lista com o ano anterior, atual e próximo

let botaoAnterior = document.getElementById("anterior")
let botaoProximo = document.getElementById("proximo")

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

let titulo = document.getElementById("titulo")
atualizaCalendario(mesAtual, anoAtual)

function proximo() {
    anoAtual = (mesAtual === 11) ? anoAtual + 1 : anoAtual
    mesAtual = (mesAtual + 1) % 12
    atualizaCalendario(mesAtual, anoAtual)
}

function hoje() {
    anoAtual = today.getFullYear()
    mesAtual = today.getMonth()
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
    let tabela = document.getElementById("calendar-body") // Pega o elemento do calendário
    tabela.innerHTML = "" // Deixa o calendario limpo
    // Muda o titulo da página
    titulo.innerHTML = meses[mes] + " " + ano
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
                if (dia === today.getDate() && ano === today.getFullYear() && mes === today.getMonth()) {
                    celula.style.backgroundColor="#eeeeee"
                    celula.style.color="#222222"
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

        if (mes == 0 && year == anos[0]){ // esconde os botões de proximo e anterior quando chega no limite de anos
            botaoAnterior.style.visibility="hidden"
        }
        else{
            botaoAnterior.style.visibility="visible"
        }
        if (mes == 11 && year == anos[2]){
            botaoProximo.style.visibility="hidden"
        }
        else{
            botaoProximo.style.visibility="visible"
        }
    }

    function iniciaAgenda(ano, mes, dia){
        teste = new Date(ano, mes, dia)
        alert(teste.getDay())
        window.location.href = "file:///C:/Users/betol/Desktop/PaginaDeInicio-Agenda/agenda.html?dia=" + dia +"?mes=" + mes;
    }
}
