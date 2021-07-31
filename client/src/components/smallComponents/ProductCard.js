import React from 'react';

function ProductCard(props) {
    return (
        <div className="display-card">
        <div className="display-card-header">
            <div className="card-img">
                <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS-CLWeD_TfzJSz-xonMJhBXzeE0GvaY0y1QReB0CaB4e8hyMsnDuRFZ1nC9BGv5oZHbEKjwefBqj6ZQ16oXsQAv-MR0H0Q6zqdYDZWKQ-vNONlPI4IdpGR5A&usqp=CAE"
                    alt=""/>
            </div>
            <h5>Polycab 1sqmm PVC House Wire (90 Metres Coil)</h5>
            <span><b>By:&nbsp;</b>Polycab</span>
        </div>
        <div className="display-card-body">
            <div className="display-card-button">
                <button className="card-update">UPDATE</button>
                <button className="card-delete">DELETE</button>
            </div>
        </div>
    </div>
    );
}

export default ProductCard;