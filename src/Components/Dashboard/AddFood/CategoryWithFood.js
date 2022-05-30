import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Items from './Items';

const CategoryWithFood = ({ categorizedFoods, index, setShow, handleDelete, handleEdit }) => {

    return (

        <div className="accordion-item ">
            <h2 className="accordion-header " id={`heading${index + 1}`}>
                <button className={`accordion-button  my-accordion-item ${index + 1 !== 1 && "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index + 1}`} aria-expanded={index + 1 === 1 ? "true" : "false"} aria-controls={`collapse${index + 1}`}>
                    <span className="d-flex flex-column">
                        <span className="bars"></span>
                        <span className="bars"></span>
                    </span> {categorizedFoods?.categoryName}
                </button>
            </h2>
            <div id={`collapse${index + 1}`} className={`accordion-collapse collapse ${index + 1 === 1 && "show"} `} aria-labelledby={`heading${index + 1}`} data-bs-parent={`#accordionExample`}>
                <div className="accordion-body">
                    {categorizedFoods?.foods?.map((item, index) =>
                        <Items
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            item={item} />)}
                    <h5
                        onClick={() => setShow(true)}
                        className="d-flex align-items-center cursor-pointer pt-3">
                        <span className="d-block mx-3">
                            <FontAwesomeIcon className="bars-bg" icon={faPlus} />
                        </span> Add Item
                    </h5>
                </div>
            </div>
        </div >



    );
};

export default CategoryWithFood;