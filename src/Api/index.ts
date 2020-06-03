export const getCurentUser = () => {
  const path = `http://localhost:3000/api/v1/get_current_user`;
  return new Promise((resovle) => {
    fetch(path)
      .then((res) => res.json())
      .then((data) => resovle(data));
  });
};
