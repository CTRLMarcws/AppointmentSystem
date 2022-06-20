const btn = document.getElementById("button-submit");
const form = document.getElementById("apply-new-app");

const formToJson = (params, data) => {
  params.forEach((element) => {
    if (typeof element == "object") {
      data[element.id] = element.value;
    }
  });
  return data;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let childs = Object.entries(e.target.getElementsByClassName("inputs")).flat();
  let values = {
    app_date: "",
    app_state: "",
    app_doc_name: "",
    app_client: "",
    app_value: "",
  };

  values = formToJson(childs, values);

  console.log(values)

  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: values,
  };
  let url = '/appointments/applynew';
  
  try {
    let res = await fetch(url, fetchOptions)
    let { serverDataResponse } = res;
    console.log(serverDataResponse)
  } catch (error) {
    console.error(error)
  }
});
