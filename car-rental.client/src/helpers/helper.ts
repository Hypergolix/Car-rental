import { NavigateFunction } from "react-router-dom";

export const signIn = async (username:string, password:string, navigate:NavigateFunction) => {
  if (username !== '' && password !== '')
  {
    const data = {
      username: username,
      password: password,
    }
  
    const response = await fetch(`https://localhost:7221/api/authenticate`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json()
    if (json.message === 'Unauthorized') {
      alert("Incorrect username or password");
    }else {
      saveToken(username, json.token, navigate)
    }
  }
}

export const saveToken = async (username:string, token:string, navigate:NavigateFunction) => {
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  console.log(localStorage.getItem("token"));
  
  const response2 = await fetch(`https://localhost:7221/api/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
  });
  const json2 = await response2.json();
  console.log(json2);
  if (json2[0].username === "test")
  {
  }
  navigate(-1);
}

export const signOut = async (navigate:NavigateFunction) => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  navigate('/');
}