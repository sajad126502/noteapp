// @flow
import {React,useState} from 'react';
import { Login } from './Login';
export function Logout() {
localStorage.removeItem("myjwt")
  return (
    <div>
      <Login/>
    </div>
  );
};