<template>
  <div class="section">
    <div class="main">
      <div class="add_prod_form">
        <InputComponent
          :Type="'text'"
          :Name="'NovoProduto'"
          :Placeholder="'Produto'"
          :Required="true"
        />
        <InputComponent
          :Type="'number'"
          :Min="0"
          :Name="'NovoProduto'"
          :Placeholder="'Quantidade'"
          :Required="true"
        />
        <InputComponent
          :Type="'text'"
          :Name="'NovoProduto'"
          :Placeholder="'Medida'"
          :Required="true"
        />
        <InputComponent
          :Type="'number'"
          :Min="0"
          :Name="'NovoProduto'"
          :Placeholder="'Valor'"
          :Required="true"
        />
        <InputComponent
          :Type="'button'"
          :Name="'NovoProduto'"
          :Value="'Adicionar'"
        />
      </div>

      <TableComponent />
      <div class="valor_total">Valor Total: R$ {{ total }}</div>
    </div>
  </div>
</template>

<script>
import TableComponent from "@/components/Table.vue";
import InputComponent from "@/components/Input.vue";
import axios from "axios";

export default {
  name: "Home",
  components: { TableComponent, InputComponent },
  data() {
    return {
      BASE_API: "https://produtosconsulta2.000webhostapp.com",
      total: null,
    };
  },
  methods: {
    getTotal() {
      axios
        .get(`${this.BASE_API}/produtos/total`)
        .then(({ data }) => {
          this.total = data.dados[0].total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getTotal();
  },
};
</script>

<style scoped>
.section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: auto;
  text-align: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}
.valor_total {
  padding: 10px 30px;
  border: 1px solid #46586c;
  border-radius: 2px;
  box-shadow: 0px 0px 10px 0px #46586c;
}

.add_prod_form {
  display: flex;
  flex-direction: row;
  gap: 2px;
}
</style>
