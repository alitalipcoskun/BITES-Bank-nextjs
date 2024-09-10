"use client"
import { useEffect, useCallback, useContext, useState } from "react";
import Cookies from 'js-cookie';
import { AuthContext } from "@/components/AuthContext/AuthProvider";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import PageTemplate from "@/components/PageComponents/PageTemplate";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import CreateAccForm from "@/components/Form/CreateAccForm";
import Table from "@/components/Table/Table";
import { AccountColumns } from "@/components/Data/AccountColumns";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";





export default function Home() {
  const { login, user, axiosInstance, validateStatus } = useContext(AuthContext);
  const token = Cookies.get("jwt");
  const router = useRouter();
  const [createdAcc, setCreatedAcc] = useState(undefined);
  const [creationError, setCreationError] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [userPhone, setUserPhone] = useState("");

  const [createDialog, setCreateDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

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
      setUserPhone(response.data.phone);
    }
    catch (error) {
      const errMsg = validateStatus(error);
      setCreationError(errMsg.label, errMsg.value);
    }
  }, [token, createdAcc]);


  const fetchAccounts = useCallback(async () => {
    console.log(userPhone);
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axiosInstance.defaults.headers.get["Content-Type"] = 'application/json';

      console.log(user.phone);
      const response = await axiosInstance.get(
        `/api/v1/account/accounts`,
        {
          params: {
            phoneNumber: user.phone
          }
        }
      );
      console.log(response);
      // Errors will thrown with respect to the response status.
      if (token === undefined) {
        router.push("/login");
      }
      setAccounts(response.data);
      console.log(response.data);
    }
    catch (error) {
      const errMsg = validateStatus(error);
      //setCreationError(errMsg.label, errMsg.value);
    }
  }, [token, userPhone]);


  useEffect(() => {
    fetchUser();
    fetchAccounts();
  }, [fetchUser, fetchAccounts]);


  const onSubmit = async (payload) => {
    console.log(payload);
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';
      const response = await axiosInstance.post("/api/v1/account/new-account", {
        "money_type": payload.account_type
      });
      setCreatedAcc(response.data);

    } catch (error) {
      const errMsg = validateStatus(error);
      setCreationError(errMsg);
    }
  }

  const onDelete = async () => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';
    const response = await axiosInstance.post("/api/v1/account/delete-account", {
      "no": selectedItem.no
    });


    fetchAccounts();
  }


  return (
    <>
      <PageTemplate>{user === undefined ? (<Spinner className="m-auto"></Spinner>) : (!user ? "Redirecting.." :
        <div className="flex flex-col w-screen h-screen text-center justify-center">
          <Card className="shadow-xl flex flex-col w-[80vw] sm:w-fit h-fit justify-center text-left m-auto container">
            <CardTitle className="container">
              Account informations
            </CardTitle>
            <CardDescription className="container">
              Welcome to BITES Bank! {user && `${user.name}`}
            </CardDescription>
            <CardContent className="flex flex-col justify-center align-middle w-fit h-fit">
              {creationError && <p>{creationError}</p>}

              <Button label="Show" icon="pi pi-external-link" onClick={() => setCreateDialog(true)} />
              <Dialog header="Create a new account" visible={createDialog} onHide={() => { if (!createDialog) return; setCreateDialog(false); }}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <CreateAccForm onSubmit={onSubmit} errMsg={creationError} />
                <Button onClick={() => { if (!createDialog) return; setCreateDialog(false); }}>Close</Button>
              </Dialog>
              <Button onClick={onDelete}>Delete</Button>
              <Table data={accounts} columns={AccountColumns} setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}></Table>
            </CardContent>
          </Card>
        </div>)}</PageTemplate>
    </>
  );
}
