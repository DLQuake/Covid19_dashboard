import React from 'react';

const StatItem = ({ heading, value }) => {
    return (
        <div className="level-item has-text-centered">
            <div>
                <p className="heading">{heading}</p>
                <p className="title">{value.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default StatItem;
