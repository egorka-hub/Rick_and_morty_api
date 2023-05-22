import React, {useMemo} from "react";

import {useSelector} from "react-redux";
import {getCatalogState} from "../../redux/slices/catalog/selectors";
import {useAppDispatch} from "../../redux/store";
import {setNextPage, setPrevPage, setCurrentPage} from "../../redux/slices/catalog/slice";

import cn from 'classnames';

import styles from './index.module.scss';

const Pagination: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
      amountPages,
      currentPage,
    } = useSelector(getCatalogState)

    const amount = useMemo(() => {
      return  [...Array(amountPages)]
    }, [amountPages])

    const onClickNext = (e: React.SyntheticEvent) => {
      if (e) {
        dispatch(setNextPage(currentPage + 1))
      }
    };

    const onClickBack = (e: React.SyntheticEvent) => {
      if (e) {
        dispatch(setPrevPage(currentPage - 1))
      }
    }

  const handleSetPage = (i: number) => {
    dispatch(setCurrentPage(i))
  }

    return (
        <div className={styles.center}>
            <div className={styles.pagination}>
              {currentPage !== 0 && <div className={styles.btn} onClick={onClickBack}>&laquo;</div>}
                {
                  amount.map((_, index: number) => (
                        <div
                          key={index}
                          className={cn(styles.btn, {[styles.active]: index === currentPage })}
                          onClick={() => handleSetPage(index)}
                        >
                            {index + 1}
                        </div>
                    ))
                }
              {currentPage + 1 !== amountPages && <div className={styles.btn} onClick={onClickNext}>&raquo;</div>}
            </div>
        </div>
    )
}
export default Pagination;
