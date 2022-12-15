const verifyToken = (data, method) => {
  if (method == "SAVE") {
    window.localStorage.setItem("nome", data.nome);
    window.localStorage.setItem("id", data.id);
    window.localStorage.setItem("acesso", data.acesso);
  } else if (method == "CLEAR") {
    window.localStorage.clear();
  } else return;
};

export default verifyToken;
