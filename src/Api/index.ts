export const getCurentUser = () => {
  const path = `http://localhost:3000/api/v1/get_current_user`;
  return new Promise((resovle) => {
    fetch(path)
      .then((res) => res.json())
      .then((data) => resovle(data));
  });
};

export const signIn = (body: Object) => {
  const path = `http://localhost:3000/api/v1/sign_in`;
  return new Promise((resolve) => {
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};
