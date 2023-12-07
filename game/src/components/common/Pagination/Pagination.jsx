import { useState, useCallback } from 'react';

import styles from './Pagination.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

import { useGameContext } from '../../../contexts/gameContext';


const Pagination = ({pageCount}) => {
    const { page, setPage } = useGameContext();

    const nextPage = useCallback(() => {
        setPage(previous => previous + 1);
    }, []);

    const previousPage = useCallback(() => {
        if (page > 1) {
            setPage(previous => previous - 1);
        }
    }, [page]);

    return (
        <div className={styles.buttons_pagination}>
            <p className={styles.pagination_red} onClick={previousPage} disabled={page <= 1 ? true : false}><FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon></p>
            <p className={styles.pagination_blue}>{page} / {pageCount}</p>
            <p className={styles.pagination_red} onClick={nextPage} disabled={page >= pageCount ? true : false}><FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon></p>
        </div>
    );
}

export default Pagination;