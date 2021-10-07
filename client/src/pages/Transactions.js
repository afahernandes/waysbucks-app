import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import btnapprove from "../assets/aprove.svg";
import btncancel from "../assets/cancel.svg";
import Loading from "../component/Loading";
import ViewPayment from "../component/modals/ViewPayment";
import { API } from "../config/api";
import { AppContext } from "../context/AppContext";
function Transactions() {
  const router = useHistory();
  const [state, dispatch] = useContext(AppContext);
  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(transactions);

  // fetch data toppings
  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const response = await API("/transactions");
      console.log(response);
      setTransaction(response.data.data.transactions);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch data on render
  useEffect(() => {
    fetchTransaction();
  }, [wait]);

  const handleApprove = async (id) => {
    setWait(true);
    const body = JSON.stringify({
      status: "On The Way",
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      await API.patch("/transaction/" + id, body, config);
      
      await Swal.fire(
        "Approved",
        "The transaction's status successfully",
        "success"
      ); 
    
      setWait(false)
    } catch (err) {
      console.log(err.response.data.message);
    } 
  };

  const handleCancel = async (id) => {
    setWait(true);
    const body = JSON.stringify({
      status: "Canceled",
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      await API.patch("/transaction/" + id, body, config);
      
      await Swal.fire(
        "Canceled",
        "The transaction  successfully Canceled",
        "cancel"
        
      );  setWait(false);  } catch (err) {
      console.log(err.response.data.message);
     
    } 
  };

  return loading || !transactions || transactions.length < 1 ? (
    <Loading />
  ) : (
    <div className="container">
      <h3 className="header3">Income Transaction</h3>
      <table
        className="table table-bordered"
        style={{ borderColor: "#000000" }} 
      >
        <thead style={{ backgroundColor: "#E5E5E5"}}>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col" width="25%">Address</th>
            <th scope="col">Post Code</th>
            <th scope="col">Income</th>
            <th scope="col">Attachment</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, i) => (
            <tr key={transaction.id}>
              <td>{i + 1}</td>
              <td>{transaction.name}</td>
              <td>{transaction.address}</td>
              <td>{transaction.postcode}</td>
              <td align="right"><label style={{color:"#061E99"}}>{Number(transaction.income).toLocaleString()}</label></td>
              <td className="text-center">
                <ViewPayment
                  setShow={show}
                  handleClose={handleClose}
                  id={transaction.id}
                  image={transaction.attachment}
                />
              </td>
              <td >
                 {transaction.status === "Waiting Approve" ? (
                <label style={{color:"#FF9900"}}>{transaction.status}</label>
                ) : transaction.status === "Success" ? (
                  <label style={{color:"#78A85A"}}>{transaction.status}</label>
                ) : transaction.status === "On The Way" ? (
                  <label style={{color:"#00D1FF"}}>{transaction.status}</label>
                ) : (
                  <label style={{color:"#E83939"}}>{transaction.status}</label>
                )}
              </td>
              <td className="text-center">
                {transaction.status === "Waiting Approve" ? (
                  <>
                    <Button
                      variant="danger"
                      size="sm"
                      style={{ margin: "2px" }}
                      onClick={() => handleCancel(transaction.id)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      style={{ margin: "2px" }}
                      onClick={() => handleApprove(transaction.id)}
                    >
                      Approve
                    </Button>
                  </>
                ) : transaction.status === "Completed" ? (
                  <img src={btnapprove} alt="success" />
                ) : transaction.status === "Canceled" ? (
                  <img src={btncancel} alt="cancel" />
                ) : (
                  <img src={btnapprove} alt="cancel" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
