import React from "react";
import Select from 'react-select';

import {useAppDispatch} from "../../redux/store";
import {setName, setGender, setStatus} from "../../redux/slices/catalog/slice";

import {STATUS_NAMES, GENDER_NAMES} from './consts';

import styles from "./index.module.scss";

const Filter: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleSelectStatus = (v: any) => {
        dispatch(setStatus(v.value))
    }
    const handleSelectGender = (v: any) => {
        dispatch(setGender(v.value))
    }

    const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setName(e.target.value))
    }

    return (
        <div className={styles.filter}>
            <div className={styles.wrapper}>
                <h3>Filter</h3>
                <div className={styles.block}>
                    <div className={styles.select}>
                        <div className={styles.name}>Статус</div>
                        <Select
                          name='status'
                          defaultValue={STATUS_NAMES[0]}
                          options={STATUS_NAMES}
                          onChange={handleSelectStatus}
                        />
                    </div>
                    <div className={styles.select}>
                        <div className={styles.name}>Гендер</div>
                        <Select
                          name='gender'
                          defaultValue={GENDER_NAMES[0]}
                          options={GENDER_NAMES}
                          onChange={handleSelectGender}
                        />
                    </div>

                    <div className={styles.search}>
                        <div className={styles.name}>Поиск по имени</div>
                        <input onChange={handleSearchName} type="search" placeholder="Name:" id="name-search" name="name"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Filter;
