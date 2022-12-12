<template>
  <div class="section">
    <div class="main">
      <TableComponent />
      <div class="valor_total">
        Valor Total = <b>R$ {{ total }}</b>
      </div>
      <div class="add_prod_form">
        <InputComponent
          :Type="'button'"
          :Name="'NewProduct'"
          :Value="'Adicionar'"
          v-on:click="showModal(true)"
        />
        <InputComponent
          :Type="'button'"
          :Name="'Exit'"
          :Value="'Sair'"
          v-on:click="logout"
        />
      </div>
    </div>
  </div>
  <div class="backdrop" v-if="openModal">
    <InputComponent
      class="closebtn"
      :Type="'button'"
      :Name="'close'"
      :Value="'fechar (X)'"
      v-on:click="showModal(false)"
    />
    <ModalProduto />
  </div>
</template>

<script>
import TableComponent from "@/components/Table.vue";
import InputComponent from "@/components/Input.vue";
import ModalProduto from "@/components/ModalProduto.vue";
import { useRouter } from "vue-router";
import verifyToken from "@/assets/VerifyToken.js";
import axios from "axios";

export default {
  name: "Home",
  components: { TableComponent, InputComponent, ModalProduto },
  data() {
    return {
      BASE_API: "https://produtosconsulta2.000webhostapp.com",
      total: null,
      openModal: false,
    };
  },
  setup() {
    const router = useRouter();
    const sair = () => router.push({ name: "Login" });
    return {
      sair,
    };
  },
  methods: {
    showModal(val) {
      this.openModal = val;
    },
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
    logout() {
      this.sair();
    },
  },
  mounted() {
    this.getTotal();
    if (!verifyToken());
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
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
}
.valor_total {
  padding: 10px 30px;
  border: 1px solid #46586c;
  border-radius: 2px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8em;
  box-shadow: 0px 0px 5px 0px #46586c;
}

.add_prod_form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.add_prod_form button {
  padding: 5px 10px;
}

.backdrop {
  position: absolute;
  background: rgba(0, 0, 0, 0.475);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  top: 0;
}

.backdrop .closebtn {
  position: absolute;
  top: 30px;
  right: 480px;
  background-color: #38516c !important;
  padding: 5px;
  z-index: 2;
}
</style>
