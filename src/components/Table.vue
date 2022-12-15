<template>
  <div>
    <div class="wrapper">
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Medida</th>
            <th scope="col">Valor</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="dados == null">
            <td colspan="6">-</td>
          </tr>
          <tr
            scope="row"
            v-for="(dado, index) in dados"
            :key="index"
            :class="isPar(index)"
            v-else
          >
            <td>{{ dado.id }}</td>
            <td>{{ dado.nome }}</td>
            <td>{{ dado.quantidade }}</td>
            <td>{{ dado.medida }}</td>
            <td>{{ dado.valor }}</td>
            <td>
              <InputComponent
                :Type="'button'"
                :Name="'delete'"
                :Value="'Excluir'"
                class="delete_btn"
                v-on:click="deletarProduto(dado.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <span class="count" v-if="items != null">Total de Items: {{ items }}</span>
  </div>
</template>

<script>
import InputComponent from "./Input.vue";
import axios from "axios";

export default {
  name: "TableComponent",
  components: { InputComponent },
  data() {
    return {
      BASE_API: "http://apiprodutosphp.dev.br",
      BASE_API2: "http://localhost/api_produtos_php",
      dados: null,
      items: null,
    };
  },
  methods: {
    isPar(n) {
      return n % 2 === 0 ? "par" : "";
    },
    async deletarProduto(id) {
      const resp = await axios.delete(
        `${this.BASE_API2}/produtos/delete/${id}`
      );
      if (resp.data.message == "Produto deletado!") window.location.reload();
    },
    getAllProducts() {
      const id = window.localStorage.getItem("id");
      axios
        .get(`${this.BASE_API2}/produtos/list/${id}`)
        .then(({ data }) => {
          try {
            this.items = data.dados.length;
            this.dados = data.dados;
          } catch {
            console.log("Nenhum dado para ser retornado.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getAllProducts();
  },
};
</script>

<style scoped>
table {
  border-radius: 2px;
  border-spacing: 0 !important;
}
thead {
  background-color: rgb(57, 67, 90);
}

tbody {
  margin-top: 20px;
}

.count {
  display: flex;
  color: #46586c;
}

.wrapper {
  max-height: 400px;
  overflow-y: auto;
  border-radius: 2px;
  margin-bottom: 10px;
  border: 2px solid rgb(57, 67, 90);
  border-bottom-width: 4px;
}

.delete_btn,
.delete_btn:hover,
.delete_btn:focus {
  padding: 5px;
}

.delete_btn:hover {
  border-color: rgb(194, 43, 43);
  color: rgb(194, 43, 43);
}

.par {
  background: rgba(57, 67, 90, 0.306);
}

th,
td {
  padding: 12px 20px;
  text-align: center;
}
th {
  padding: 15px 20px;
  position: sticky;
  top: 0px;
  background-color: rgb(57, 67, 90);
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: #7083b08e transparent;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: #7083b08e;
  border-radius: 2px;
  border: 2px solid transparent;
}
</style>
