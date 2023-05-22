import React from "react";

import { genderNames, statusNames } from './consts';

import styles from "./index.module.scss";

interface FilterProps {
    setStatus: (val: string) => void,
    setGender: (val: string) => void,
    setName: (val: string) => void

}
const Filter: React.FC<FilterProps> = ({ setStatus, setGender, setName }) => {

    const handleSelectChangeStatus = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value)
    }

    const handleSelectChangeGender = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value)
    }

    const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <div className={styles.filter}>
            <div className={styles.wrapper}>
                <h2>Filter</h2>
                <div className={styles.selectBlock}>
                    <div>
                        <h3>Status</h3>
                        <select onChange={handleSelectChangeStatus}>
                            {
                                statusNames.map((name: string, index: number) => (
                                    <option value={name} key={index}>{name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <h3>Gender</h3>
                        <select onChange={handleSelectChangeGender}>
                            {
                                genderNames.map((name, index) => (
                                    <option value={name} key={index}>{name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className={styles.search}>
                        <h3>Search the Name</h3>
                        <div>
                            <input onChange={handleSearchName} type="search" placeholder="Name:" id="name-search" name="name"/>
                            <button type="button">Search</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Filter;
