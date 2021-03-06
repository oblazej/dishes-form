import Head from 'next/head';
import { useState } from 'react';
import Form from '../components/form/Form';
import Notification from '../components/Notification';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function Home() {

  const [message, setMessage] = useState("");

  const submit = values => {
    const body = {"name": values.name, "preparation_time": `${values.hours}:${values.minutes}:${values.seconds}`,
                  "type": values.type};
    switch(values.type) {
      case "pizza":
        body.diameter = parseInt(values.diameter);
        body.no_of_slices = parseInt(values.noOfSlices);
        break;
      case "soup":
        body.spiciness_scale = parseInt(values.spicinessScale);
        break;
      case "sandwich":
        body.slices_of_bread = parseInt(values.slicesOfBread);
        break;
      default:
        return;
    }

    axios.post("https://frosty-wood-6558.getsandbox.com:443/dishes", body).then(response => {
      console.log(response.data)
      setMessage("Success!");
    })        .catch((err) => {

      setMessage(`Error: ${JSON.stringify(err.response.data)}`);
  })
  }
  return (
    <div>
      <Head>
        <title>Dishes Form</title>
        <meta name="description" content="Dishes Form"/>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.header}>dish form</h1>
        <Form onSubmit={submit}>
        <Notification message={message}/>
        </Form>
      </main>

    </div>
  )
}
