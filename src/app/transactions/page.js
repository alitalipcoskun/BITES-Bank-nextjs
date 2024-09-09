"use client"
import PageTemplate from '@/components/PageComponents/PageTemplate'
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react'
import Cookies from "js-cookie"
import { useAuthContext } from '@/components/AuthContext/AuthProvider';

const TransactionsPage = (props) => {
  const token = Cookies.get("jwt");
  const {login} = useAuthContext();
  const [transactions, setTransactions] = useState(undefined);
  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/api/v1/user/profile',
        { token: token },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // Errors will thrown with respect to the response status.
      if (token === undefined) {
        router.push("/login");
      }
      login(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }, [token]);
  const fetchTransactions = useCallback(async () => {
    try {
      // Create an accountNo parameter and set as null at the beginning of the page.
      // If account is not selected, do not send request to the database.
      const response = await axios.get(
        'http://127.0.0.1:8080/api/v1/transaction/list-transactions',
        { token: token },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // Errors will thrown with respect to the response status.
      if (token === undefined) {
        router.push("/login");
      }
      validate
      console.log(response);
      setTransactions(response.data);
      
    }
    catch (error) {
      console.log(error);
    }
  }, [token]);


  useEffect(() => {

    fetchUser();
    fetchTransactions();
  }, [fetchUser]);
  return (
    <PageTemplate>
      <div className = "flex flex-col w-screen h-screen justify-center text-center">
        {transactions && transactions}
      </div>
    </PageTemplate>
  )
}

export default TransactionsPage