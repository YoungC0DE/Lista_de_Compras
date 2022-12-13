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
      BASE_API: "https://produtosconsulta2.000webhostapp.com",
    };
  },
  methods: {
    Register() {
      console.log(this.data);
      axios
        .post(`${this.BASE_API}/usuarios/register`, "", this.data)
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
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 50%;
  text-align: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
}

.main form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 50%;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.title h1::selection {
  background-color: transparent;
}

.title h1 {
  position: relative;
  color: transparent;
  font-size: 4vw;
  font-weight: bolder;
  -webkit-text-stroke: 0.5px #46586c;
}

.title h1::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #00dfc4;
  -webkit-text-stroke: 0px #46586c;
  border-right: 3px solid #00dfc4;
  overflow: hidden;
  white-space: nowrap;
  animation: animate 4s linear;
}

.section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

a {
  text-decoration: none;
  color: #00dfc4;
}

@keyframes animate {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
