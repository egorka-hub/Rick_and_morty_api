import React, {useEffect} from "react";

import Card from "../../components/Card";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";

import {useSelector} from 'react-redux';
import {useAppDispatch} from "../../redux/store";
import {getCatalogState} from '../../redux/slices/catalog/selectors';
import {loadData} from "../../redux/slices/catalog/thunk";
import {LOADING_STATUS} from "../../redux/consts";
import useDebounce from "../../hooks/useDebounce";

import styles from './index.module.scss';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
      data,
      currentPage,
      amountPages,
      name,
      gender,
      status,
      error,
      loadingStatus
    } = useSelector(getCatalogState)

    const debouncedName = useDebounce(name, 500);

    useEffect(() => {
        if (status === 'All' || gender === 'All') {
          dispatch(loadData({currentPage, gender, status, name: debouncedName}))
        } else {
          dispatch(loadData({currentPage, gender, status, name: debouncedName}))
        }
    }, [status, gender, debouncedName, currentPage, dispatch]);

    let content;

    if (loadingStatus === LOADING_STATUS.IDLE) {
        content = <div className={styles.cards}>
          {data.results.map((obj, index) => (
            <Card
              key={index}
              image={obj.image}
              name={obj.name}
              status={obj.status}
              gender={obj.gender}
            />
          ))}
        </div>
    }
    if (loadingStatus === LOADING_STATUS.LOADING) {
      content = 'Идёт загрузка...'
    }
    if (loadingStatus === LOADING_STATUS.ERROR) {
      content = 'Произошла ошибка ' + error
    }

    const isSHowPagination = !!data.results.length && amountPages !== 1 && loadingStatus === LOADING_STATUS.IDLE

  return (
        <div className={styles.wrapper}>
            <Filter />
            <div className={styles.content}>
              {content}
              {isSHowPagination && <Pagination/>}
            </div>
        </div>
    )
}
export default Home;
