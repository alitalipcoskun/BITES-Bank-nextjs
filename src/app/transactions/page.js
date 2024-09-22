"use client"
import PageTemplate from '@/components/DefaultPage/PageTemplate'
import React, { useCallback, useEffect, useState} from 'react'
import { useAuthContext } from '@/components/AuthContext/AuthProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TransactionForm from '@/components/Form/Transaction/TransactionForm';
import { TransactionColumns } from './TransactionColumns';
import Table from '@/components/Table/Table';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const TransactionsPage = (props) => {
  const { LoginUser, checkToken } = useAuthContext();
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
      const token = Cookies.get('jwt');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`,
        { token: token },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response);
      // Errors will thrown with respect to the response status.
      if (!token) {
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
  }, [LoginUser, router]);

  const fetchTransactions = useCallback(async (account) => {
    try {
      if (!account) {
        console.log("No account selected");
        return;
      }

      const token = Cookies.get('jwt');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/transaction/list-transactions`,
        {
          params: {
            phoneNumber: phone,
            accountNo: account
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200 && response.data) {
        setTransactions(response.data);
      } else {
        setCreationError({ "root": "No transactions found or error occurred" });
      }

    }
    catch (error) {
      console.error("Error fetching transactions:", error);
      setCreationError({ "root": error.response?.data?.message || "Failed to fetch transactions" });
    }
  }, [phone]);

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
    const token = Cookies.get('jwt');
    if (!token) {
      router.push("/login");
    }
    // Perfom get and post operation for user profile and account informations nested.
    fetchUser();
    // Set a timeout to redirect if loading takes too long
    const redirectTimeout = setTimeout(() => {
      if (loadingState) {
        checkToken();
        const token = Cookies.get('jwt');
        if (!token) {
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

  }, [fetchUser, checkToken, router, loadingState]);

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