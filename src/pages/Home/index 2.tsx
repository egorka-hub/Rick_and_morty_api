import React, {useEffect, useState} from "react";

import Card from "../../components/Card";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";

import type { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from '../../redux/slices/filter/selectors';
import { setFilterName, setFilterGender, setFilterStatus } from '../../redux/slices/filter/filterSlice';

import styles from './index.module.scss';

interface InfoData {
    count: number;
    next: null | string;
    pages: number;
    prev: null | string
}

interface CharacterData {
    created: string | Date;
    episode: string | string[];
    gender: string;
    id: string;
    image: string;
    location: {name: string, url: string};
    name: string;
    origin: {name: string, url: string};
    species: string;
    status: string;
    type: string;
    url: string;
}

interface ResponseData {
    info: InfoData | null;
    results: CharacterData[];
}

const Home: React.FC = () => {
    // const count = useSelector((state: RootState) => state.filter.value);
    // const dispatch = useDispatch();
    const dispatch = useDispatch();
    const filterName = useSelector((state:RootState) => state.filter.filterName);

    const onClickCategory = (id: string) => {
        dispatch(setFilterName(id))
    }

    const [data, setData] = useState<ResponseData>({info: null, results: []})
    // Items - cards
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20; // не работает
    const totalItems = data.info?.count;
    // Pagination (Index)
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;

    async function getData(status: string, gender: string) {
        await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}&gender=${gender}&status=${status}&name=${name}`)
          .then((res) => {
              return res.json()
          })
          .then((obj) => {
              setData(obj)
          }).catch(error => {
            throw new Error(error)
        })
    }

    useEffect(() => {
        // Сделать проверки
        if (status === 'All' || gender === 'All') {
            getData('', '')
        } else {
            getData(status, gender)
        }

    }, [status, gender, name, currentPage]);



    return (
        <div className={styles.wrapper}>
            <Filter setGender={setGender}
                    setStatus={setStatus}
                    setName={setName}
            />
            <div className={styles.cards}>
                {
                    (data.results || []).map((obj, index) => (
                        <Card
                            key={index}
                            image={obj.image}
                            name={obj.name}
                            status={obj.status}
                            gender={obj.gender}
                        />
                    ))
                }
            </div>
            <Pagination
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
            />
        </div>
    )
}
export default Home;
