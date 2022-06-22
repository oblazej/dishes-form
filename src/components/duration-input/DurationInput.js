import { useEffect } from 'react';
import styles from '../../styles/DurationInput.module.css';

export default function DurationInput() {


    return (
        <>
<input type="text" pattern="^[0-9]{1,9}:[0-5][0-9]:[0-5][0-9]$" />
    </>
    );

}