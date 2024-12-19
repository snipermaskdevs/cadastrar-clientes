const clientForm = document.getElementById("client-form");
const clientList = document.getElementById("client-list");
const exportBtn = document.getElementById("export-btn");
const importFile = document.getElementById("import-file");

let clientData = [];

// Adiciona um novo cliente ao array
clientForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newClient = {
    name: document.getElementById("name").value || "Não informado",
    cpf: document.getElementById("cpf").value || "Não informado",
    phone: document.getElementById("phone").value || "Não informado",
    email: document.getElementById("email").value || "Não informado",
    address: document.getElementById("address").value || "Não informado",
    city: document.getElementById("cidade").value || "Não informado",
    state: document.getElementById("estado").value || "Não informado",
    zipcodes: document.getElementById("codigopostal").value || "Não informado",
  };

  clientData.push(newClient);
  renderClientList();
  clientForm.reset();
});

// Renderiza a lista de clientes
function renderClientList() {
  clientList.innerHTML = clientData.map((client, index) => `
    <li>
      <div class="info">
        <span>Nome:</span> ${client.name}<br>
        <span>CPF:</span> ${client.cpf}<br>
        <span>Telefone:</span> ${client.phone}<br>
        <span>Email:</span> ${client.email}<br>
        <span>Endereço:</span> ${client.address}<br>
        <span>Cidade:</span> ${client.city}<br>
        <span>Estado:</span> ${client.state}<br>
        <span>Zip Código:</span> ${client.zipcodes}
      </div>
      <div class="actions">
        <button class="edit-btn" onclick="editClient(${index})">Editar</button>
        <button class="delete-btn" onclick="deleteClient(${index})">Excluir</button>
      </div>
    </li>
  `).join("");
}

// Edita um cliente da lista
function editClient(index) {
  const client = clientData[index];
  document.getElementById("name").value = client.name !== "Não informado" ? client.name : "";
  document.getElementById("cpf").value = client.cpf !== "Não informado" ? client.cpf : "";
  document.getElementById("phone").value = client.phone !== "Não informado" ? client.phone : "";
  document.getElementById("email").value = client.email !== "Não informado" ? client.email : "";
  document.getElementById("address").value = client.address !== "Não informado" ? client.address : "";
  document.getElementById("cidade").value = client.city !== "Não informado" ? client.city : "";
  document.getElementById("estado").value = client.state !== "Não informado" ? client.state : "";
  document.getElementById("codigopostal").value = client.zipcodes !== "Não informado" ? client.zipcodes : "";

  deleteClient(index);
}

// Exclui um cliente da lista
function deleteClient(index) {
  clientData.splice(index, 1);
  renderClientList();
}

// Exporta os dados para um arquivo JSON
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(clientData, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "client_data.json";
  link.click();
});

// Importa dados de um arquivo JSON
importFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      clientData = JSON.parse(event.target.result);
      renderClientList();
    };
    reader.readAsText(file);
  }
});