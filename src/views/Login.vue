<template>
  <div class="section">
    <div class="main">
      <div class="title">
        <h1 data-text="LISTA DE COMPRAS 2.0">LISTA DE COMPRAS 2.0</h1>
        <span>Faça seu login abaixo</span>
      </div>
      <form>
        <InputComponent
          :Type="'email'"
          :Name="'Email'"
          :Placeholder="'E-mail'"
          v-model="data.email"
          :Required="true"
        />
        <InputComponent
          :Type="'password'"
          :Name="'Password'"
          :Placeholder="'Senha'"
          v-model="data.senha"
          :Required="true"
        />
        <InputComponent
          :Type="'button'"
          :Name="'SendData'"
          :Value="'Acessar'"
          v-on:click="Login"
        />
      </form>
      <span class="register">
        Não possui cadastro?
        <router-link to="/register">Clique aqui</router-link>
        para se cadastrar!
      </span>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import VerifyToken from "@/assets/VerifyToken.js";
import InputComponent from "@/components/Input.vue";
import axios from "axios";

export default {
  name: "Login",
  components: { InputComponent },
  data() {
    return {
      BASE_API: "https://apiprodutosphp.dev.br",
    };
  },
  setup() {
    const router = useRouter();
    const redirecionar = () => router.push({ name: "Home" });
    const data = reactive({
      email: null,
      senha: null,
    });
    return {
      redirecionar,
      data,
    };
  },
  methods: {
    Login() {
      axios
        .post(`${this.BASE_API}/usuarios/login`, this.data)
        .then(({ data }) => {
          console.log(data);
          VerifyToken(data.dados[0], "SAVE");
          if (data.code === 200) this.redirecionar();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
@import "@/assets/login.css";
</style>
