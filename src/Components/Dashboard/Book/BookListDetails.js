import React from 'react';
const BookListDetails = ({ booking ,orderLength}) => {
    const statusStyle = `text-light p-2 rounded-3 ${booking.status === 'Done' ? 'bg-success' : booking.status === 'Pending' ? 'bg-danger' : 'bg-warning'}`
    return (
        <div className={` ${orderLength==1?"col-md-12":"col-md-6"} col-sm-12`}>
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img style={{ height: '100px' }} src="https://img.freepik.com/free-photo/concept-indian-cuisine-baked-chicken-wings-legs-honey-mustard-sauce-serving-dishes-restaurant-black-plate-indian-spices-wooden-table-background-image_127425-18.jpg?size=626&ext=jpg" class="img-fluid rounded-start" alt="..."></img>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 class="card-title">$ {booking.price}</h5>
                                <p className={statusStyle}>{booking.status}</p></div>
                            <p class="card-text"><small class="text-muted"> Ordered at {booking.orderTime.slice(0, 10)}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className=" text-center shadow p-4">

                <div className="d-flex justify-content-between">
                    {
                        booking.image ? <img style={{ height: '50px' }}
                            src={`data:image/png;base64,${booking.image.img}`} />
                            :
                            <img style={{ height: '50px' }} className="img-fluid mb-3"
                                src={`https://morning-thicket-61908.herokuapp.com/${booking.img}`} alt="" />
                    }

                  
                </div>
                <h5 className="my-2 ">{booking.name}</h5>
                <h6 className="my-2">{booking.serviceName}</h6>

                <p className="text-secondary">{booking.description}</p>


            </div> */}


        </div>
    );
};

export default BookListDetails;