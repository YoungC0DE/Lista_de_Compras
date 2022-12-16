<template>
  <div class="section">
    <div class="main">
      <TableComponent />
      <div class="valor_total">
        Valor Total = <b v-if="total != null">R$ {{ total }}</b>
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
      BASE_API: "http://apiprodutosphp.dev.br",
      total: null,
      openModal: false,
    };
  },
  setup() {
    const router = useRouter();
    const sair = () => {
      verifyToken("", "CLEAR");
      router.push({ name: "Login" });
    };
    return {
      sair,
    };
  },
  methods: {
    showModal(val) {
      this.openModal = val;
    },
    getTotal() {
      const id = window.localStorage.getItem("id");
      axios
        .get(`${this.BASE_API}/produtos/total/${id}`)
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
    if (!window.localStorage.getItem("id")) this.sair();
  },
};
</script>

<style scoped>
@import "@/assets/home.css";
</style>
