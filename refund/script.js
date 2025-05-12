// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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
form.onsubmite = (event) => {
  //fazer com que todo submite a página não carregue
  event.preventDefault()

  // Cria um objeto com detalhes na nova despesas
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: expense.category,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()

  }

  // Chama a função que irá adicionar as novas despesas na lista
  expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar na lista.
    
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }



}