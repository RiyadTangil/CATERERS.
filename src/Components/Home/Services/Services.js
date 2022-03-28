import React, { useContext, useEffect, useState } from 'react';
import ServiceDetails from '../ServiceDetails/ServiceDetails';
import { addToDatabaseCart } from '../../../utilities/databaseManager';
import { UserCard } from '../../../App';
const Services = () => {
    const [cardItems, setCardItems] = useContext(UserCard);
    const [serviceCollection, setServiceCollection] = useState([])
    useEffect(() => {
        fetch("https://morning-thicket-61908.herokuapp.com/service")
            .then(res => res.json())
            .then(data => setServiceCollection(data))
    }, [])
    const addTOLocalStorage = (id) => {
        addToDatabaseCart(id)
    }
    const handleCard = (id) => {
        const previousItems = [...cardItems,id]
        setCardItems(previousItems)

    }
    return (
        <section style={{ backgroundColor: "#E3E3E3" }} className="service-container">
            <div>

                <div className="text-center pt-5">


                    <h5 className="section-title">OUR SERVICES</h5>
                    <h2>Services We Provide </h2>
                </div>
                <div className="d-flex justify-content-center  align-items-center">
                    {serviceCollection.length < 1 ?

                        <div className="d-flex py-5 my-5 justify-content-center">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                        <div className="w-75 row mt-5 ">
                            {
                                serviceCollection.map(service => <ServiceDetails addTOLocalStorage={addTOLocalStorage} service={service} handleCard={handleCard} key={service.name}></ServiceDetails>)
                            }
                        </div>
                    }
                </div>
            </div>

        </section>
    );
};

export default Services;