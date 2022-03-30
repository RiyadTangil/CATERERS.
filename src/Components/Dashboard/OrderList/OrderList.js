import React, { useEffect, useState } from 'react';
import SideVarNav from '../SidvarNav/SideVarNav';

const OrderList = () => {
    const [orderList, setOrderList] = useState([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        fetch("http://localhost:5000/orders")
            .then(res => res.json())
            .then(data => setOrderList(data))


    }, [orderList])
    const updateOrderStatus = (status, productKey) => {
        const updatedOrders = [];
        orderList.map(order => {
            if (order._id === productKey) {
                order.status = status;
            }
            updatedOrders.push(order)
            setOrderList(updatedOrders);
        })
        let statusUpdatingInfo = {
            id: productKey,
            status: status
        };
        fetch(`http://localhost:5000/orders/${productKey}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(statusUpdatingInfo)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    console.log({ result });
                }
            })
        setShow(true)
    }
    return (
        <div className="row">
            <SideVarNav/>
            <div className="col-md-9 ">
                <div className=" p-4 pr-5" style={{ backgroundColor: "#F4FDFB" }}>
                    <h5 className="text-brand">All Orders</h5>
                    <div>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th className="text-secondary text-left" scope="col">Sr No</th>
                                    <th className="text-secondary " scope="col">Name</th>
                                    <th className="text-secondary " scope="col">Email</th>
                                    <th className="text-secondary" scope="col">Phone number</th>
                                    <th className="text-secondary" scope="col">Price</th>

                                    <th className="text-secondary" scope="col">Pay with</th>
                                    <th className="text-secondary" scope="col">status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderList?.map((order, index) =>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td className="">{order?.user?.name}</td>
                                            <td className=" ">{order?.user?.email}</td>
                                            <td>{order?.user?.phoneNo}</td>
                                            <td> ${order?.price}</td>
                                            <td>Credit cart</td>
                                            <td>
                                                <select
                                                    className={order.status === "Pending" ? "btn btn-danger" : order.status === "Done" ? "btn btn-success" : "btn btn-info"}
                                                    defaultValue={order.status}
                                                    onChange={e => updateOrderStatus(e.target.value, order._id)}>
                                                    <option className="bg-white text-muted">Pending</option>
                                                    <option className="bg-white text-muted">On going</option>
                                                    <option className="bg-white text-muted">Done</option>
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;