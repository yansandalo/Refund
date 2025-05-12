// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")

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

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }



}