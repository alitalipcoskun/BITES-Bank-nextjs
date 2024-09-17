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
import { useRouter } from 'next/navigation';

const TransactionsPage = (props) => {
  const { LoginUser, axiosInstance, checkToken, token } = useAuthContext();
  const [transactions, setTransactions] = useState(undefined);
  const [creationError, setCreationError] = useState({ "root": undefined });
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [phone, setPhone] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [loadingState, setLoadingState] = useState(true);
  const [userAccounts, setUserAccounts] = useState([]);

  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const response = await axiosInstance.post(
        '/api/v1/user/profile',
        { token: token }
      );
      console.log(response);
      // Errors will thrown with respect to the response status.
      if (token === undefined) {
        router.push("/login");
      }
      LoginUser(response.data);
      setPhone(response.data.phone);
      setUserAccounts(response.data.accounts || []);
      console.log(response.data);
    }
    catch (error) {
      setCreationError((prev) => {
        return {
          ...prev,
          "root": error.message
        }
      });
    }
  }, [token, LoginUser, axiosInstance, router]);

  const fetchTransactions = useCallback(async (account) => {
    try {
      // Create an accountNo parameter and set as null at the beginning of the page.
      // If account is not selected, do not send request to the database.
      console.log(account, phone);
      const response = await axiosInstance.get(
        '/api/v1/transaction/list-transactions',
        {
          params: {
            phoneNumber: phone,
            accountNo: account
          }
        }
      );
      // Errors will thrown with respect to the response status.
      if (response.status === 200) {
        setTransactions(response.data);
      } else {
        setCreationError({ "root": "No transaction found" });
      }

    }
    catch (error) {
      console.log(error);
    }
  }, [token, accountNo, phone, router]);

  const setSearchAccount = async (account) => {
    try {
      fetchTransactions(account);
      setCreationError({ "root": undefined });

    } catch (error) {
      setCreationError({ "root": error.message });
    }

  }

  useEffect(() => {
    setLoadingState(true);
    checkToken();
    if (token === undefined || token === null) {
      router.push("/login");
    }
    // Perfom get and post operation for user profile and account informations nested.
    fetchUser();
    // Set a timeout to redirect if loading takes too long
    const redirectTimeout = setTimeout(() => {
      if (loadingState) {
        checkToken();
        console.log(token);
        if (token === undefined || token === null) {
          console.log("Loading timeout reached. Redirecting to login.");
          router.push("/login");
          return;
        }
        fetchUser();
        setLoadingState(false);
      }
    }, 10000); // 10 seconds timeout
    setLoadingState(false);
    return () => clearTimeout(redirectTimeout);

  }, [fetchUser, checkToken, router, token, loadingState]);

  return (
    <PageTemplate>
      <div className="flex flex-col h-screen justify-center text-center">
        <Card className="container w-fit sm:w-[40vw] m-auto">
          <CardHeader>Transactions</CardHeader>
          <CardContent>
            {loadingState ?
              <>
                <Skeleton className="w-72 sm:h-10 sm:w-80 mb-2" />
                <Skeleton className="h-10 w-[225px] mb-2" />
                <Skeleton className="h-8 w-[200px] mb-2" />
                <Skeleton className="h-8 w-[200px]" />
              </>
              :
              <>
                <TransactionForm
                  accounts={userAccounts}
                  accountNo={accountNo}
                  setAccountNo={setSearchAccount}
                />
                <p className={`text-red-500 ${creationError.root ? "visible" : "invisible"}`}>
                  {creationError.root}
                </p>
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