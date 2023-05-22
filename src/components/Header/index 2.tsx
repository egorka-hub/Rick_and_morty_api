import React from "react";

import styles from './index.module.scss'

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
              <h1>Rick and Morty API</h1>
            </div>
        </div>
    )
}

export default Header;
