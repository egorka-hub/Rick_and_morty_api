import React from "react";

import styles from './index.module.scss'

interface CardProps {
    name: string,
    status: string,
    gender: string,
    image: string
}

const Card: React.FC<CardProps> = ({name, status, gender, image}) => {
    return (
        <div className={styles.card}>
            <div className={styles.wrapper}>
                <div className={styles.image}>
                    <img src={image} alt="card_img"/>
                </div>
                <p className={styles.item}>Name: {name}</p>
                <p className={styles.item}>Status: {status}</p>
                <p className={styles.item}>Gender: {gender}</p>
            </div>
        </div>
    )
}
export default Card;
