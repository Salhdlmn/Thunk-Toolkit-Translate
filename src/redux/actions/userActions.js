import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
! createAsyncThunk
? bizden iki parametre ister
> a: aksiyon'un type değeri
> b: çalışıcak fonksiyon
> > bu async işlemler yapabilir (veritabanı sorguları)
*/
export const getUsers = createAsyncThunk("getUsers", async () => {
  // async işlemler yapılır
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  return res.data;
});
