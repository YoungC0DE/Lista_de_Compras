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
      BASE_API: "https://apiprodutosphp.dev.br",
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
        `${this.BASE_API}/produtos/delete/${id}`
      );
      if (resp.data.message == "Produto deletado!") window.location.reload();
    },
    getAllProducts() {
      const id = window.localStorage.getItem("id");
      axios
        .get(`${this.BASE_API}/produtos/list/${id}`)
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
@import "@/assets/table.css";
</style>
