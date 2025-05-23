// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")
const expensesQuntity = document.querySelector("aside header p span")
const ExpensesTotal = document.querySelector("aside header h2")

// Captura o evento input para formatar o valor:
amount.oninput = () => {
  //Obtém o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "")

  // Transforma o valor em centavos para que funione a formatação:
  value = Number(value) / 100

  // Atualiza o valor do input:
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  // Formata o valor no padrão BRL (Real Brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  //Retorna o valor formatado
  return value
}


// Captura o evento de submite do formulário para obter os valores
form.onsubmit = (event) => {
  //fazer com que todo submite a página não carregue
  event.preventDefault()

  // Cria um objeto com detalhes na nova despesas
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()

  }

  // Chama a função que irá adicionar as novas despesas na lista
  expenseAdd(newExpense)
}

// Adiciona um novo item a lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // --------------------- img da lista ----------------------
    const expenseIcon = document.createElement("img")
    
    //pegando a imagem da categoria que eu quero de forma automática
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg` )
    
    // Adicionando a descrição da categoria do item de forma automática, 
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // --------------------- info da despesa ------------------------
      // Criando a div e a classe que vem nela.
      const expenseInfo = document.createElement("div")
      expenseInfo.classList.add("expense-info")

      // adicionando a strong e o span dentro da div.  
      const expenseName = document.createElement("strong")
      expenseName.textContent = newExpense.expense

      // Cria a categoria da despesa.
      const expenseCategory = document.createElement("span")
     expenseCategory.textContent = newExpense.category_name

      //Adiciona name e category na div das informações da despesa.
      expenseInfo.append(expenseName, expenseCategory)
    
    // ---------------- Adicionando o valor da despesa --------------
      // Adicionando a span junto com sua classe e seu conteudo  
      const expenseAmount = document.createElement("span")
      expenseAmount.classList.add("expense-amount")
      expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`

    // --------------- Adicionando o ícone de remover --------------
      const removeIcon = document.createElement("img")
      removeIcon.classList.add("remove-icon")
      removeIcon.setAttribute("src","img/remove.svg")
      removeIcon.setAttribute("alt", "remover")

    // --------- adicionar as informações ao item e a lista ------------
      // Adiciona as informações no item.
      expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

      // Adiciona o itens na lista.
      expenseList.append(expenseItem)

    // ------------------- Atualiza os totais ------------------------
    updateTotals()

    // ------------------ Limpa os formulários e focus ---------------
    formClear()


  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }



}

//Atualizar os totais.
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children
    
    // Atualiza a quantidade de items na lista.
    expensesQuntity.textContent = `${items.length} 
    ${items.length > 1 ? "despesas" : "despesa"}`
  
    // Variável para incrementar o total.
    let total = 0

    //percorre cada item (li) da lista (ul)
    for(let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")
      
      // Removendo caracteres não numéricos e substitui a "," pelo o "."
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

      // Converte o valor para float.
      value = parseFloat(value)

      //Verificar se o número não é válido.
      if(isNaN(value)) {
        return alert ("Não foi possível calcular o total. o valor não parece ser um número")
      }

      //Incrementar o valor total
      total += Number(value)
    }

    // Criando a span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Formata o valor e remove o R$ que será exibido pela small com estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$","")

    //Limpa o conteudo do elemento
    ExpensesTotal.innerHTML = ""

    // Adiciona o símbolo da moeda e o valor formatado
    ExpensesTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais")
  }
}

// Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function (event) {
  // Verificar se o elemento clicado é o ícone de remover
  if(event.target.classList.contains("remove-icon")){
    // Obtém a li pai do elemento clicado.
    const item = event.target.closest(".expense")

    //Remove item da lista.
    item.remove()
  }

  // Atualiza os totais
  updateTotals()
})

// Limpando o formulário

function formClear () {
  //Limpa os inputs
  expense.value = ""
  category.value = ""
  amount.value = ""
  
  // Coloca o focu no input de amount
  expense.focus()
}