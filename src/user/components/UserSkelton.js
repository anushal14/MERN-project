import React from "react";
import './UserSkeleton.css'

const UserSkeleton = (props) => {
    return (
        <li className="user-item">
            <div class="skeleton-card">
                <div class="header">
                    <div class="header-img skeleton" src="" />
                    <div class="title" data-title>
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text"></div>
                    </div>
                </div>
                
            </div>
        </li>
    )

}

export default UserSkeleton;