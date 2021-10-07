import React from "react";

const CardTopping = ({...props}) => {
    
  const {id, name, image} = props.topping;

  return (
      <div className="col-md-3">
          <div >
              <div className="img-card">
                  <label className="block-check">
                    <center>
                      <img src={image} alt={name} className="img-topping" />
                     </center> <input 
                          type="checkbox"
                          id={id}
                          className="hidden-check"
                          onChange={props.onChange}
                          checked={props.checked}
                      />
                      <span className="checkmark"></span>
                  </label>
              </div>
                 <center>
                   
                  <span className="text-topping">{name}</span>
                  </center>
            </div>
      </div>
  );
};

export default CardTopping;