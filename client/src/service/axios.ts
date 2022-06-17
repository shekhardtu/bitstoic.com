import axios from "axios";
import { env } from "process";

export default axios.create({
  // baseURL: "http://localhost:8282",
  baseURL: "https://bitstoic-pp.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});
