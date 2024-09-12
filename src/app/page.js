"use client"
import { useEffect, useCallback, useContext, useState } from "react";
import Cookies from 'js-cookie';
import { AuthContext } from "@/components/AuthContext/AuthProvider";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import PageTemplate from "@/components/DefaultPage/PageTemplate";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import CreateAccForm from "@/components/Form/CreateAccount/CreateAccForm";
import Table from "@/components/Table/Table";
import { AccountColumns } from "@/components/Data/AccountColumns";
import { Button } from "@/components/ui/button";
import { Dialog } from "primereact/dialog";
import { useErrorBoundary } from "react-error-boundary";
import BalanceForm from "@/components/Form/Balance/BalanceForm";




export default function Home() {
  // Error handling
  const { showBoundary } = useErrorBoundary();


  const { login, user, axiosInstance, validateStatus } = useContext(AuthContext);
  const token = Cookies.get("jwt");
  const router = useRouter();
  const [createdAcc, setCreatedAcc] = useState(undefined);
  const [creationError, setCreationError] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [userPhone, setUserPhone] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [balanceDialog, setBalanceDialog] = useState(false);

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
      fetchAccounts(response.data.phone);
    }
    catch (error) {
      const errMsg = validateStatus(error);
      setCreationError(errMsg.label, errMsg.value);
    }
  }, [token, createdAcc]);


  const fetchAccounts = useCallback(async (phone) => {
    try {
      console.log(phone);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axiosInstance.defaults.headers.get["Content-Type"] = 'application/json';
      const response = await axiosInstance.get(
        `/api/v1/account/accounts`,
        {
          params: {
            phoneNumber: phone
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
      showBoundary(error);
    }
  }, [token, userPhone]);


  useEffect(() => {
    fetchUser();

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
      //const errMsg = validateStatus(error);
      //setCreationError(errMsg);
      showBoundary(error);
    }
  }

  const onDelete = async () => {
    setDeleteDialog(false);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';
    const response = await axiosInstance.post("/api/v1/account/delete-account", {
      "no": selectedItem.no
    });


    fetchAccounts(userPhone);
  }

  return (
    <>
      <PageTemplate>{user === undefined ? (<Spinner className="m-auto"></Spinner>) : (!user ? "Redirecting.." :
        <div className="flex flex-col w-screen h-screen text-center justify-center">
          <Card className="shadow-xl flex flex-col w-[80vw] sm:w-fit h-fit justify-center text-left m-auto container">
            <CardTitle className="container py-4 px-6 text-left">
              Account informations
            </CardTitle>
            <CardDescription className="container py-4 px-6 text-left">
              Welcome to BITES Bank! {user && `${user.name} ` + `${user.surname}`}
            </CardDescription>
            <CardContent className="flex flex-col justify-center align-middle w-fit h-fit">
              {creationError && <p>{creationError}</p>}

              <Dialog header="Create a new account" visible={createDialog} onHide={() => { if (!createDialog) return; setCreateDialog(false); }}
                style={{ width: '50vw', }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <CreateAccForm onSubmit={onSubmit} errMsg={creationError} />
                <Button onClick={() => { if (!createDialog) return; setCreateDialog(false); }}
                  className="w-full sm:w-fit sm:mt-4">Close</Button>
              </Dialog>

              <Dialog header="Delete Account" visible={deleteDialog} onHide={() => { if (!deleteDialog) return; setDeleteDialog(false); }}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                {selectedItem !== null && <p className="mb-4">Are you sure about deleting <bold className="font-bold">{selectedItem.no}</bold> account?</p>}
                <Button onClick={() => { if (!deleteDialog) return; setDeleteDialog(false); }} className="w-full sm:w-fit mr-2">No</Button>
                <Button onClick={onDelete} className="w-full sm:w-fit">Yes</Button>
              </Dialog>

              <Dialog header="Add balance" visible={balanceDialog} onHide={() => { if (!balanceDialog) return; setBalanceDialog(false); }}
                style={{ width: '50vw', }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <BalanceForm
                  accounts={user.accounts}
                />
              </Dialog>
              <div className="flex flex-row align-middle w-fit my-4">
                <Button
                  label="Create Account"
                  onClick={() => setCreateDialog(true)}
                  className="w-full sm:w-fit"
                >
                  Create
                </Button>
                <Button
                  onClick={() => { setDeleteDialog(true) }}
                  className="w-full sm:w-fit ml-2"
                  disabled={selectedItem === null}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => { setBalanceDialog(true) }}
                  className="w-full sm:w-fit ml-2"
                >
                  Add Balance
                </Button>
              </div>
              <Table data={accounts} columns={AccountColumns} setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}></Table>
            </CardContent>
          </Card>
        </div>)}</PageTemplate>
    </>)
}
