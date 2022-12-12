<template>
  <div class="backdrop">
    <main>cachorro</main>
  </div>
</template>

<style scoped>
.backdrop {
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  top: 0;
}
main {
  position: relative;
  padding: 20px;
  border-radius: 2px;
  background: rgb(255, 255, 255);
  color: black;
}
</style>
