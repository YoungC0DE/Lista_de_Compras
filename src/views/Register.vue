<template>
  <div class="section">
    <div class="main">
      <div class="title">
        <h1 data-text="LISTA DE COMPRAS 2.0">LISTA DE COMPRAS 2.0</h1>
        <span>Crie sua conta e em seguida faça o login</span>
      </div>

      <form>
        <InputComponent
          :Type="'text'"
          :Name="'Nome'"
          :Placeholder="'Nome de usuário'"
          v-model="data.nome"
          :Required="true"
        />
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
          :Value="'Cadastrar'"
          v-on:click="Register()"
        />
      </form>
      <span class="register">
        Já possui cadastro?
        <router-link to="/">Clique aqui</router-link>
        para se logar!
      </span>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import InputComponent from "../components/Input.vue";
import axios from "axios";

export default {
  name: "Register",
  components: { InputComponent },
  setup() {
    const router = useRouter();
    const redirecionar = () => router.push({ name: "Login" });
    const data = reactive({
      email: null,
      senha: null,
    });
    return {
      redirecionar,
      data,
    };
  },
  data() {
    return {
      BASE_API: "https://apiprodutosphp.dev.br",
    };
  },
  methods: {
    Register() {
      console.log(this.data);
      axios
        .post(`${this.BASE_API}/usuarios/register`, this.data)
        .then((resp) => {
          console.log(resp);
          this.redirecionar();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
@import "@/assets/register.css";
</style>
