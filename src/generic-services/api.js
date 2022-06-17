import axios from "axios";
// import auth from "../auth";

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

class Api {
  execute(url,method, dataObject={}, isLoading = true) {
    return new Promise(function (resolve, reject) {
      if (isLoading) {
        document.getElementById("loader").style.display = "flex";
      }
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
      })
      authAxios({
        method: method,
        url: url,
        data: dataObject,
        headers: {
          'content-type': 'application/json'
        }
      }).then((res) =>{
        document.getElementById("loader").style.display = "none";
        resolve(res);
      }).catch((err) =>{
        document.getElementById("loader").style.display = "none";
        if (err.response.status === 401) {
          //navigate user to signin screen here
        }
        reject(err);
      })
    })
  }

  get(url) {
    return new Promise((resolve, reject )=> {
      axios.get(url).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  }
}

export default new Api();
