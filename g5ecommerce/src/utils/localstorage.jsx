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
export const usuario = 33;
export const saveUsuario = (usuario) => {
  localStorage.setItem("usuario", usuario);
};

export const getUsuario = () => {
  const usuario = localStorage.getItem("usuario");
  return usuario;
};
