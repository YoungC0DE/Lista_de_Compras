<template>
    <main>
      <h1 style="text-align: center">Adicionar produto</h1>
      <InputComponent
        :Type="'text'"
        :Name="'nome'"
        :Placeholder="'Nome'"
        v-model="data.nome"
        :Required="true"
      />
      <InputComponent
        :Type="'text'"
        :Name="'Quantidade'"
        :Placeholder="'Quantidade'"
        v-model="data.quantidade"
        :Required="true"
      />
      <InputComponent
        :Type="'text'"
        :Name="'Medida'"
        :Placeholder="'Medida'"
        v-model="data.medida"
        :Required="true"
      />
      <InputComponent
        :Type="'text'"
        :Name="'Valor'"
        :Placeholder="'Valor'"
        v-model="data.valor"
        :Required="true"
      />
      <InputComponent :Type="'button'" :Name="'AddProd'" :Value="'Adicionar'" />
    </main>
</template>

<script>
import InputComponent from "@/components/Input.vue";

export default {
  name: "ModalProduto",
  components: { InputComponent },
  props: {
    show: Boolean,
  },
  data() {
    return {
      openModal: this.show,
      data: {
        nome: null,
        quantidade: null,
        medida: null,
        valor: null,
      },
    };
  },
};
</script>

<style scoped>
main {
  position: relative;
  padding: 20px;
  border-radius: 2px;
  background: #1d2b3a;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  flex-wrap: wrap;
  width: 25%;
  gap: 20px;
}

main input,
main button {
  background: #38516c !important;
}

main div {
  width: 100%;
}

main .actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5%;
}
</style>
