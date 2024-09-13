"use client"
import PageTemplate from '@/components/DefaultPage/PageTemplate'
import axios from 'axios';
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useAuthContext } from '@/components/AuthContext/AuthProvider';
import { Skeleton } from '@/components/ui/skeleton';
import Cookies from 'js-cookie';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TransactionForm from '@/components/Form/Transaction/TransactionForm';
import { TransactionColumns } from './TransactionColumns';
import Table from '@/components/Table/Table';






const TransactionsPage = (props) => {

  const token = Cookies.get("jwt");
  const { login, user, axiosInstance } = useAuthContext();
  const [transactions, setTransactions] = useState(undefined);

  const [selectedItem, setSelectedItem] = useState(undefined);
  const [phone, setPhone] = useState("");
  const [accountNo, setAccountNo] = useState("");





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
      setPhone(response.data.phone);
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
          body: {
            phoneNumber: phone,
            accountNo: accountNo
          }
        }
      );
      // Errors will thrown with respect to the response status.
      if (token === undefined) {
        router.push("/login");
      }
      validate
      console.log(response);
      setTransactions(response.data);
      console.log(response);

    }
    catch (error) {
      console.log(error);
    }
  }, [token, accountNo]);

  const setSearchAccount = (account) => {
    console.log(account);
    setAccountNo(account);
  }


  useEffect(() => {
    //onChange={(e) => 
    //  setTransactionData((prev) => {
    //    return {
    //      ...prev,
    //      fromAcc: e.target.value
    //    };
    //  })
    //}
    console.log(accountNo);
    fetchUser();
    fetchTransactions();
  }, [fetchUser]);



  return (
    <PageTemplate>
      <div className="flex flex-col h-screen justify-center text-center">
        <Card className="container w-fit sm:w-[40vw] m-auto">
          <CardHeader>Transactions</CardHeader>
          <CardContent>
            {user === undefined ?
              <>
                <Skeleton className="w-72 sm:h-10 sm:w-80 mb-2" />
                <Skeleton className="h-10 w-[225px] mb-2" />
                <Skeleton className="h-8 w-[200px] mb-2" />
                <Skeleton className="h-8 w-[200px]" />
              </>
              :
              <>
                <TransactionForm 
                accounts={user.accounts}
                accountNo={accountNo}
                setAccountNo={setSearchAccount}
                />
                <Table
                  columns={TransactionColumns}
                  data={transactions}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              </>

            }

          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  )
}

export default TransactionsPage