export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

//// Usuario

export const saveUsuario = (usuario) => {
  localStorage.setItem("usuario", usuario);
};

export const getUsuario = () => {
  const usuario = localStorage.getItem("usuario");
  return usuario;
};

export const getNomeUsuario = () => {
  const nomeUsuario = localStorage.getItem("nomeUsuario");
  return usuario;
};
