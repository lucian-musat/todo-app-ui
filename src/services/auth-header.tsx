export default function authHeader() {
  const userDataStorage = localStorage.getItem("user");
  if (userDataStorage) {
    const user = JSON.parse(userDataStorage);

    if (user && user.token) {
      return { Authorization: user.token };
    } else {
      return {};
    }
  }
}
