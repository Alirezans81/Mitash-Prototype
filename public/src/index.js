const uri = "http://localhost:3000/api";
const response = document.getElementById("response");

function request() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;
  const description = document.getElementById("description").value;

  const params = { name, email, phone, location, description };
  console.log(params);

  axios
    .post(uri + "/requests", params)
    .then((res) => {
      console.log(res);

      response.classList.remove("text-red-500");
      response.classList.add("text-green-500");
      response.innerHTML = res.data.message;

      response.classList.remove("-top-12");
      response.classList.add("top-3");
      setInterval(() => {
        response.classList.remove("top-3");
        response.classList.add("-top-12");
      }, 3000);
    })
    .catch((err) => {
      console.log(err);

      response.classList.remove("text-green-500");
      response.classList.add("text-red-500");
      response.innerHTML = err.response.data.message;

      response.classList.remove("-top-12");
      response.classList.add("top-3");
      setInterval(() => {
        response.classList.remove("top-3");
        response.classList.add("-top-12");
      }, 3000);
    });
}
