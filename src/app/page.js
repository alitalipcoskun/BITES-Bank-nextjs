"use client"
import { useEffect, useCallback, useContext, useState } from "react";
import Cookies from 'js-cookie';
import { AuthContext } from "@/components/AuthContext/AuthProvider";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import PageTemplate from "@/components/DefaultPage/PageTemplate";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import CreateAccForm from "@/components/Form/CreateBankAccount/CreateAccForm";
import Table from "@/components/Table/Table";
import { AccountColumns } from "@/components/Data/AccountColumns";
import { Button } from "@/components/ui/button";
import { Dialog } from "primereact/dialog";
import { useErrorBoundary } from "react-error-boundary";
import BalanceForm from "@/components/Form/Balance/BalanceForm";



export default function Home() {
  // Error handling
  const { showBoundary } = useErrorBoundary();

  // Axios configuration.
  const { login, user, axiosInstance } = useContext(AuthContext);
  const token = Cookies.get("jwt");
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';

  // Routing unauthorized users.
  const router = useRouter();

  // Account creation state
  const [createdAcc, setCreatedAcc] = useState(undefined);

  // Account state
  const [accounts, setAccounts] = useState(undefined);

  // User phone number state
  const [userPhone, setUserPhone] = useState("");

  // It is used in Table component and delete operation to provide information to user and making delete operation.
  const [selectedItem, setSelectedItem] = useState(null);

  // Error handling state
  const [error, setError] = useState({
    root: { message: "" },
    create: { message: "" },
    account: { message: "" }
  });

  // Performing state operations for 3 different screeens.
  const [dialog, setDialog] = useState({
    delete: false,
    create: false,
    balance: false
  });


  // Performs post operation to get user information from the backend service.
  const fetchUser = useCallback(async () => {
    try {
      const response = await axiosInstance.post(
        '/api/v1/user/profile',
        { token: token }
      );

      // Errors will thrown with respect to the response status.
      if (token === undefined) {
        router.push("/login");
      }

      // Goes to context and updates user information
      login(response.data);
      // Sets user mobile phone
      setUserPhone(response.data.phone);
      // Performs fetch operation to get the account information of the current session.
      fetchAccounts(response.data.phone);
      // Verifies that there is no error on root, clears them.
      setError("root", undefined);
    }

    catch (error) {
      setError("root", {
        message: error.response.data.message
      });
      // Crucial error, user should not be able to see the page.
      showBoundary(error.reponse.data.message);
    }
  }, [token, createdAcc]);


  // Performs get operation to reach to account information of the user.
  const fetchAccounts = useCallback(async (phone) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/account/accounts`,
        {
          params: {
            phoneNumber: phone
          }
        }
      );

      // Errors will thrown with respect to the response status.
      if (token === undefined) {
        router.push("/login");
      }
      // Set accounts to response data to display it on the screen
      setAccounts(response.data);
      // Verifies that there is no error on the account, clears them.
      setError("account", undefined);
    }
    catch (error) {
      // Catches error and displays it.
      setError("account", {
        message: error.response.data.message
      });
    }
  }, [token, userPhone]);


  useEffect(() => {
    // Perfom get and post operation for user profile and account informations nested.
    fetchUser();

  }, [fetchUser, fetchAccounts]);



  // Performs post operation to create account for the current session.
  const onSubmit = async (payload) => {
    console.log(payload);
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';
      const response = await axiosInstance.post("/api/v1/account/new-account", {
        "money_type": payload.account_type
      });
      // For displaying feedback to the user
      setCreatedAcc(response.data);
      // Verify that operation performed correctly. Clears previous errors about create operation.
      setError("create", undefined);

    } catch (error) {
      setError("create",
        { message: error.response.data.message }
      );
    }
  }

  const onDelete = async () => {
    try {
      setDialog((prev) => {
        return {
          ...prev,
          delete: true
        }
      });
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';
      const response = await axiosInstance.post("/api/v1/account/delete-account", {
        "no": selectedItem.no
      });

      setError("root", undefined);
      fetchAccounts(userPhone);
    } catch (error) {
      setError("root",
        { message: error.response.data.message });
    }
  }

  return (
    <>
      <PageTemplate>
        {user === undefined ?
          (<Spinner className="m-auto"></Spinner>) :
          (!user ? "Redirecting.." :
            <div className="flex flex-col w-screen h-screen text-center justify-center">
              <Card className="shadow-xl flex flex-col w-[80vw] sm:w-fit h-fit justify-center text-left m-auto container">
                <CardTitle className="container py-4 px-6 text-left">
                  Account informations
                </CardTitle>
                <CardDescription className="container py-4 px-6 text-left">
                  Welcome to BITES Bank! {user && `${user.name} ` + `${user.surname}`}
                </CardDescription>
                <CardContent
                  className="flex flex-col justify-center align-middle w-fit h-fit">
                  {error["create"] && <p>{error["create"].message || ""}</p>}

                  <Dialog
                    header="Create a new account"
                    visible={dialog["create"]}
                    onHide={() => {
                      if (!dialog["create"]) return; setDialog((prev) => {
                        return {
                          ...prev,
                          create: false
                        }
                      });
                    }}
                    style={{ width: '50vw', }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    <CreateAccForm onSubmit={onSubmit} errMsg={error} />
                    <Button
                      onClick={() => {
                        if (!dialog) return; setDialog((prev) => {
                          return {
                            ...prev,
                            create: false
                          }
                        });
                      }}
                      className="w-full sm:w-fit sm:mt-4"
                    >
                      Close
                    </Button>
                  </Dialog>

                  <Dialog
                    header="Delete Account"
                    visible={dialog["delete"]}
                    onHide={() => {
                      if (!dialog) return; setDialog((prev) => {
                        return {
                          ...prev,
                          delete: false
                        }
                      });
                    }}
                    style={{ width: '50vw' }}
                    breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    {
                      selectedItem !== null &&
                      <p className="mb-4">Are you sure about deleting <bold className="font-bold">{selectedItem.no}</bold> account?</p>
                    }
                    <Button
                      onClick={() => {
                        if (!dialog["delete"]) return;
                        setDialog((prev) => {
                          return {
                            ...prev,
                            delete: false
                          }
                        });
                      }}
                      className="w-full sm:w-fit mr-2"
                    >
                      No
                    </Button>
                    <Button
                      onClick={onDelete}
                      className="w-full sm:w-fit"
                    >
                      Yes
                    </Button>
                  </Dialog>

                  <Dialog
                    header="Add balance"
                    visible={dialog["balance"]}
                    onHide={() => {
                      if (!dialog["balance"]) return;
                      setDialog((...prev) => {
                        return {
                          ...prev,
                          balance: false
                        }
                      });
                    }}
                    style={{ width: '50vw', }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    <BalanceForm
                      accounts={user.accounts}
                    />
                  </Dialog>
                  <div className="flex flex-row align-middle w-fit my-4">
                    <Button
                      label="Create Account"
                      onClick={() => setDialog((prev) => {
                        return {
                          ...prev,
                          create: true
                        }
                      })}
                      className="w-full sm:w-fit"
                    >
                      Create
                    </Button>
                    <Button
                      onClick={() => {
                        setDialog((prev) => {
                          return {
                            ...prev,
                            delete: true
                          }
                        })
                      }}
                      className="w-full sm:w-fit ml-2"
                      disabled={selectedItem === null}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        setDialog((prev) => {
                          return {
                            ...prev,
                            balance: true
                          }
                        })
                      }}
                      className="w-full sm:w-fit ml-2"
                    >
                      Add Balance
                    </Button>
                  </div>
                  <Table
                    data={accounts}
                    columns={AccountColumns}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                  />
                </CardContent>
              </Card>
            </div>)}
      </PageTemplate>
    </>)
}
