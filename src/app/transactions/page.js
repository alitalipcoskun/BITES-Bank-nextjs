"use client"
import PageTemplate from '@/components/PageComponents/PageTemplate'
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react'
import { useAuthContext } from '@/components/AuthContext/AuthProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { userAgent } from 'next/server';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import Cookies from 'js-cookie';

const digitsOnly = (value) => /^\d{10}$/.test(value)

const positiveOnly = (value) => {
  return (float(value) > 0) ? false : true;
}

const schema = yup.object({
  fromAcc: yup.string("Account no format is all decimal with 10 length").test("Digits only", "This field should have only decimals with length of 10.", digitsOnly),
  toAcc: yup.string("Account no format is all decimal with 10 length").required("Surname is required").test("Digits only", "This field should have only decimals with length of 10.", digitsOnly),
  balanceChange: yup.number().required("Balance change is required").test("Positive Check", "This field must be positive.", positiveOnly),
});


const TransactionsPage = (props) => {
  // Library allows control and give feedback to user precisely.
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });
  const token = Cookies.get("jwt");
  const {login, user, axiosInstance} = useAuthContext();
  const [transactions, setTransactions] = useState(undefined);
  const fetchUser = useCallback(async () => {
      try {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';
  
        const response = await axiosInstance.post(
          '/api/v1/user/profile',
          { token: token }
        );
        console.log(response);
        // Errors will thrown with respect to the response status.
        if (token === undefined) {
          router.push("/login");
        }
        login(response.data);
        console.log(response.data);
      }
      catch (error) {
        const errMsg = validateStatus(error);
        setCreationError(errMsg.label, errMsg.value);
      }
  }, [token]);
  const fetchTransactions = useCallback(async () => {
    try {
      // Create an accountNo parameter and set as null at the beginning of the page.
      // If account is not selected, do not send request to the database.
      const response = await axios.get(
        '/api/v1/transaction/list-transactions',
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
    console.log(user);
  }, [fetchUser]);
  return (
    <PageTemplate>
      <div className = "flex flex-col w-screen h-screen justify-center text-center">
      {user === undefined ? <Skeleton></Skeleton>:<select className="w-72" {...register("fromAcc", { required: true })} placeholder="" disabled={isSubmitting}>
                {user["accounts"].map((item, idx) => {
                    return <option value={item} key={idx}>{item}</option>
                })}
            </select>}
            <Input {...register("toAcc", {required: true})} placeholder="" disabled={isSubmitting}></Input>
            <Input {...register("balanceChange", {required: true})} disabled={isSubmitting} ></Input>
        {transactions && transactions}
      </div>
    </PageTemplate>
  )
}

export default TransactionsPage