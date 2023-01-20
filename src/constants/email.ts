export const USER_VERIFICATION_EMAIL = (name: string, code: string) => {
  return `
  <div style="text-align: center; width: 100%; height: 100%; background: black; color: white;">
    <img src="https://scontent.faep9-2.fna.fbcdn.net/v/t1.6435-9/73257648_699185753906957_503143044925620224_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=o2CVxmBDjrkAX9YQlZu&_nc_ht=scontent.faep9-2.fna&oh=00_AfCJkfVQZu1YF_x5yNmZOH1UFkTAIF8SXkKo3EjWgQcw-g&oe=63F21BD4"
    style="width: 30%"
    alt="logo voces">
    <h1>¡Hola ${name}!</h1>
    <h1>Necesitamos que actives tu cuenta.</h1>
    <h2>Tu código es: <strong style="color: #fc01a0">${code}</strong></h2>
  </div>
`;
};

export const USER_VERIFICATION_EMAIL_TITLE = "VOCES: ACTIVACIÓN DE USUARIO";
